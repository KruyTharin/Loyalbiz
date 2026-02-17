import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { prisma } from "./prisma";

// Simple middleware to protect admin routes
// In a real app, use a proper session store (Redis) or JWT
export const adminAuth = async (c: Context, next: Next) => {
  // 1. Check for API Key (for external tools or initial setup)
  const apiKey = c.req.header("x-admin-key");
  if (process.env.ADMIN_KEY && apiKey === process.env.ADMIN_KEY) {
    await next();
    return;
  }

  // 2. Check for Session Cookie (for browser)
  const sessionToken = getCookie(c, "admin_session");

  if (sessionToken) {
    try {
      // Verify session (simply checking existence in DB for MVP)
      const business = await prisma.business.findUnique({
        where: { id: sessionToken },
      });

      if (business) {
        c.set("business", business);
        await next();
        return;
      }
    } catch (e) {
      console.error("Auth middleware error:", e);
    }
  }

  return c.json({ error: "Unauthorized" }, 401);
};

export const loginValue = async (passcode: string) => {
  const business = await prisma.business.findFirst({
    where: { passcode },
  });
  return business;
};
