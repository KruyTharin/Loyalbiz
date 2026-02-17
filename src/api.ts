import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

app.use("*", cors());

// Mock Database
const customers = [
  {
    id: "1",
    phone: "012345678",
    name: "Sokha",
    points: 7,
    visits: 7,
    lastVisit: "2024-02-15",
  },
  {
    id: "2",
    phone: "098765432",
    name: "Dara",
    points: 3,
    visits: 3,
    lastVisit: "2024-02-16",
  },
];

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.get("/stats", (c) => {
  return c.json({
    totalCustomers: customers.length,
    activeToday: 12,
    totalVisits: 450,
    revenueGrowth: "+12%",
  });
});

app.get("/customers", (c) => {
  return c.json(customers);
});

app.get("/customer/:phone", (c) => {
  const phone = c.req.param("phone");
  const customer = customers.find((cust) => cust.phone === phone);
  if (!customer) {
    return c.json({ error: "Customer not found" }, 404);
  }
  return c.json(customer);
});

export default app;
