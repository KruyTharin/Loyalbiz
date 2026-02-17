import { Hono } from "hono";
import { cors } from "hono/cors";
import { setCookie } from "hono/cookie";
import { prisma } from "./lib/prisma";
import { adminAuth, loginValue } from "./lib/auth";

const app = new Hono().basePath("/api");

app.use("*", cors());

// Admin Routes group
const admin = new Hono();
admin.use("*", adminAuth);

// Admin: Get Dashboard Stats
admin.get("/stats", async (c) => {
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
admin.get("/customers", async (c) => {
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

// Admin/Public: Check-in (Add Stamp)
// Note: For now, we keep checkin public-ish but in real app it should be admin-only or signed
// Moving to admin router to enforce auth for the merchant terminal
admin.post("/checkin", async (c) => {
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

// ... (existing imports)
// ... (existing imports)

// Admin Login
app.post("/admin/login", async (c) => {
  const { passcode } = await c.req.json();
  const business = await loginValue(passcode);

  if (!business) {
    return c.json({ error: "Invalid passcode" }, 401);
  }

  setCookie(c, "admin_session", business.id, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "Lax",
  });

  return c.json({ success: true, businessId: business.id });
});

export default app;
