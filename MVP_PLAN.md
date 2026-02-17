# Loyalkh - Product Roadmap & MVP Blueprint

## 🎯 Vision

Modernizing Cambodian SMEs by replacing paper stamp cards with a high-impact, digital loyalty system.

## 📦 MVP Feature Set

### Customer Experience

- [x] **Dashboard**: Real-time stamp progress & member status.
- [x] **My Rewards**: Available vs. Locked gifts view.
- [x] **Check-in**: Unique personal QR code for merchant scanning.
- [x] **Profile**: Account management and visit history (placeholder).

### Merchant Operations (Admin)

- [x] **Overview Terminal**: Today's activity, total customers, and growth stats.
- [x] **Customer Management**: Powerful table view to track visits and stamps.
- [x] **Reward Config**: Dynamic rules engine (e.g., 10 stamps = Free Coffee).
- [ ] **QR Scanner**: Direct camera check-in tool (Upcoming).

---

## 🏗️ Technical Architecture (Proposed)

- **Frontend**: TanStack Start (SSR) + Tailwind CSS.
- **Backend API**: Hono.js (lightweight, fast).
- **Database**: PostgreSQL with Prisma ORM.
- **Auth**: Simple Phone + OTP (Phase 2).

---

## 💾 Database Schema (Draft)

```prisma
model Business {
  id        String   @id @default(cuid())
  name      String
  rewards   Reward[]
  customers CustomerBusiness[]
}

model Customer {
  id          String   @id @default(cuid())
  phone       String   @unique
  name        String?
  businesses  CustomerBusiness[]
}

model CustomerBusiness {
  id          String   @id @default(cuid())
  customerId  String
  businessId  String
  stamps      Int      @default(0)
  totalVisits Int      @default(0)
  lastVisit   DateTime @updatedAt

  customer    Customer @relation(fields: [customerId], references: [id])
  business    Business @relation(fields: [businessId], references: [id])
}
```

---

## 📅 Phases of Implementation

1. **Phase 1: Design (COMPLETED)** - High-fidelity mobile-first frontend.
2. **Phase 2: Database & API** - Persistence layer and core business logic.
3. **Phase 3: Real Integration** - Wiring the frontend to the real data.
4. **Phase 4: Launch & Analytics** - Deploying the MVP for the first 50 pilot shops.
