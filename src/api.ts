import { Hono } from "hono";
import { cors } from "hono/cors";
import { prisma } from "./lib/prisma";

const app = new Hono().basePath("/api");

app.use("*", cors());

// Health check
app.get("/hello", (c) => {
  return c.json({
    message: "Loyalkh API Live",
    version: "1.1.0",
    prisma: "v7",
  });
});

// Admin: Get Dashboard Stats
app.get("/stats", async (c) => {
  try {
    const totalCustomers = await prisma.customer.count();
    const totalVisits = await prisma.visit.count();

    // Simple mock for today's active count for now
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeToday = await prisma.visit.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    return c.json({
      totalCustomers,
      activeToday,
      totalVisits,
      revenueGrowth: "+15%", // Placeholder for now
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch stats" }, 500);
  }
});

// Admin: List all customers
app.get("/customers", async (c) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        businesses: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return c.json(customers);
  } catch (error) {
    return c.json({ error: "Failed to fetch customers" }, 500);
  }
});

// Public: Get customer by phone
app.get("/customer/:phone", async (c) => {
  const phone = c.req.param("phone");
  try {
    const customer = await prisma.customer.findUnique({
      where: { phone },
      include: {
        businesses: {
          include: {
            business: true,
          },
        },
      },
    });

    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }
    return c.json(customer);
  } catch (error) {
    return c.json({ error: "Database error" }, 500);
  }
});

// Admin/Public: Check-in (Add Stamp)
app.post("/checkin", async (c) => {
  const { phone, businessId } = await c.req.json();

  if (!phone || !businessId) {
    return c.json({ error: "Missing phone or businessId" }, 400);
  }

  try {
    // 1. Find or create customer
    const customer = await prisma.customer.upsert({
      where: { phone },
      update: {},
      create: { phone, name: "New Customer" },
    });

    // 2. Log the visit
    await prisma.visit.create({
      data: {
        customerId: customer.id,
        businessId,
        stampsEarned: 1,
      },
    });

    // 3. Update stamp count for this business
    const connection = await prisma.customerBusiness.upsert({
      where: {
        customerId_businessId: {
          customerId: customer.id,
          businessId,
        },
      },
      update: {
        stamps: { increment: 1 },
        totalVisits: { increment: 1 },
      },
      create: {
        customerId: customer.id,
        businessId,
        stamps: 1,
        totalVisits: 1,
      },
    });

    return c.json({
      success: true,
      stamps: connection.stamps,
      customerName: customer.name,
    });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Check-in failed" }, 500);
  }
});

export default app;
