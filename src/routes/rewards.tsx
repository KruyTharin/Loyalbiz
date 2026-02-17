import { createFileRoute } from "@tanstack/react-router";
import { CustomerLayout } from "../components/Layout";
import { Card } from "../components/ui/Card";
import { Gift, Lock, CheckCircle2, Star, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";

export const Route = createFileRoute("/rewards")({
  component: CustomerRewardsPage,
});

function CustomerRewardsPage() {
  const points = 7;

  return (
    <CustomerLayout>
      <div className="p-6 space-y-8 bg-neutral-50 min-h-full pb-32">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gifts & Deals</h2>
          <p className="text-neutral-500 font-medium mt-1">
            Redeem your hard-earned stamps.
          </p>
        </div>

        {/* Current Balance Summary */}
        <div className="bg-black rounded-[2rem] p-6 text-white flex items-center justify-between shadow-lg shadow-black/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Star size={24} className="text-white fill-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Your Balance
              </p>
              <p className="text-2xl font-bold tracking-tight">
                {points} Stamps
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/5"
          >
            History
          </Button>
        </div>

        {/* Rewards List */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 px-1">
              Available to Redeem
            </h3>
            <div className="grid gap-4">
              <RewardItem
                title="20% Off Entire Order"
                cost={5}
                isAvailable={points >= 5}
                category="Discount"
              />
              <RewardItem
                title="Free Small Coffee"
                cost={10}
                isAvailable={points >= 10}
                category="Freebie"
              />
            </div>
          </section>

          <section className="space-y-4 pt-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 px-1">
              Locked Rewards
            </h3>
            <div className="grid gap-4 opacity-70">
              <RewardItem
                title="Free Pastry of Choice"
                cost={15}
                isAvailable={points >= 15}
                category="Freebie"
              />
              <RewardItem
                title="Buy 1 Get 1 Free (Large)"
                cost={20}
                isAvailable={points >= 20}
                category="Promo"
              />
            </div>
          </section>
        </div>
      </div>
    </CustomerLayout>
  );
}

function RewardItem({
  title,
  cost,
  isAvailable,
  category,
}: {
  title: string;
  cost: number;
  isAvailable: boolean;
  category: string;
}) {
  return (
    <Card
      className={`p-5 flex items-center justify-between border-neutral-100 shadow-sm transition-all active:scale-[0.98] ${!isAvailable ? "bg-neutral-50/50" : "bg-white"}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isAvailable ? "bg-neutral-100 text-black" : "bg-neutral-100 text-neutral-300"}`}
        >
          {isAvailable ? <Gift size={22} /> : <Lock size={20} />}
        </div>
        <div>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight">
            {category}
          </p>
          <h4 className="font-bold text-neutral-800 tracking-tight leading-none mt-1">
            {title}
          </h4>
          <p className="text-xs font-bold text-neutral-500 mt-1">
            {cost} Stamps Required
          </p>
        </div>
      </div>

      {isAvailable ? (
        <Button
          size="sm"
          variant="primary"
          className="rounded-xl px-4 py-2 text-xs font-bold shrink-0"
        >
          Redeem
        </Button>
      ) : (
        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-300 shrink-0">
          <ChevronRight size={16} />
        </div>
      )}
    </Card>
  );
}
