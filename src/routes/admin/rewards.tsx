import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../../components/Layout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Plus, Gift, Edit2, Trash2, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/admin/rewards")({
  component: RewardsPage,
});

function RewardsPage() {
  return (
    <AdminLayout>
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reward Rules</h1>
            <p className="text-neutral-500 font-medium mt-1">
              Manage what your customers can redeem.
            </p>
          </div>
          <Button size="md">
            <Plus size={18} className="mr-2" />
            Create Rule
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <RewardCard
            title="Free Small Coffee"
            requirement="10 STAMPS"
            active={true}
            redeemed={128}
          />
          <RewardCard
            title="20% Off Entire Order"
            requirement="5 STAMPS"
            active={true}
            redeemed={42}
          />
          <RewardCard
            title="Free Pastry"
            requirement="15 STAMPS"
            active={false}
            redeemed={0}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

function RewardCard({
  title,
  requirement,
  active,
  redeemed,
}: {
  title: string;
  requirement: string;
  active: boolean;
  redeemed: number;
}) {
  return (
    <Card
      className={`flex flex-col gap-6 p-6 border-neutral-100 shadow-sm transition-all ${!active ? "opacity-60 grayscale" : ""}`}
    >
      <div className="flex justify-between items-start">
        <div
          className={`p-3 rounded-2xl ${active ? "bg-black text-white" : "bg-neutral-100 text-neutral-400"}`}
        >
          <Gift size={22} />
        </div>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-neutral-50 rounded-lg transition-all text-neutral-400">
            <Edit2 size={16} />
          </button>
          <button className="p-2 hover:bg-neutral-50 rounded-lg transition-all text-neutral-400">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold tracking-tight text-neutral-900">
          {title}
        </h3>
        <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
          {requirement}
        </p>
      </div>

      <div className="pt-4 border-t border-neutral-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          {active ? (
            <CheckCircle2 size={14} className="text-emerald-500" />
          ) : (
            <Circle size={14} className="text-neutral-300" />
          )}
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-tight">
            {active ? "Active" : "Paused"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-tight">
            {redeemed} REDEEMED
          </p>
          <button
            className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${active ? "bg-black" : "bg-neutral-200"}`}
          >
            <div
              className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${active ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>
    </Card>
  );
}
