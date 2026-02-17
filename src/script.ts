import { prisma } from "./lib/prisma";

async function main() {
  // Create a new business
  const business = await prisma.business.create({
    data: {
      name: "Star Coffee",
      ownerName: "Sokha",
      email: "sokha@starcoffee.com",
    },
  });
  console.log("Created business:", business);

  // Create a new customer
  const customer = await prisma.customer.create({
    data: {
      phone: "012345678",
      name: "Dara",
    },
  });
  console.log("Created customer:", customer);

  // Record a visit (Check-in)
  const visit = await prisma.visit.create({
    data: {
      customerId: customer.id,
      businessId: business.id,
      stampsEarned: 1,
    },
  });
  console.log("Recorded visit:", visit);

  // Fetch all customers for the business
  const allCustomers = await prisma.customer.findMany({
    include: {
      businesses: true,
    },
  });
  console.dir(allCustomers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
