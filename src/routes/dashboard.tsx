import { createFileRoute } from "@tanstack/react-router";
import { CustomerLayout } from "../components/Layout";
import { Card } from "../components/ui/Card";
import { QRCodeSVG } from "qrcode.react";
import { Clock, Star, Gift } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function DashboardPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem("customer_phone");
    if (!storedPhone) {
      navigate({ to: "/login" });
    } else {
      setPhone(storedPhone);
    }
  }, [navigate]);

  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer", phone],
    queryFn: async () => {
      if (!phone) return null;
      const res = await fetch(`/api/customer/${phone}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!phone,
  });

  if (isLoading || !phone) {
    return (
      <CustomerLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-neutral-200 border-t-black rounded-full" />
        </div>
      </CustomerLayout>
    );
  }

  // MVP: Just grab the first business's stamps or default to 0
  // In a real multi-tenant app, this dashboard would likely list all businesses
  const currentBusiness = customer?.businesses?.[0];
  const points = currentBusiness?.stamps || 0;
  const maxPoints = 10;

  return (
    <CustomerLayout>
      <div className="p-6 space-y-8 bg-neutral-50 min-h-full pb-32">
        {/* Hero: QR Code for Check-in */}
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Tap to Check-in</h2>
          <Card className="flex flex-col items-center justify-center p-10 shadow-xl shadow-black/5 border-0 bg-white/80 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-black to-transparent opacity-20" />

            <div className="p-4 bg-white rounded-[2.5rem] shadow-sm border border-neutral-100 mb-6">
              {/* Phone number is the unique identifier for MVP */}
              <QRCodeSVG value={phone} size={200} fgColor="#000000" />
            </div>

            <div className="space-y-1">
              <p className="text-lg font-bold text-neutral-900">{phone}</p>
              <p className="text-sm text-neutral-400 font-medium">
                Show to cashier to earn stamps
              </p>
            </div>
          </Card>
        </div>

        {/* Secondary: Loyalty Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold">Your Progress</h3>
            <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded-full">
              {points} / {maxPoints}
            </span>
          </div>
          <Card className="bg-neutral-900 text-white p-6 border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">
                    Coffee Lover Rewards
                  </h2>
                  <p className="text-sm text-neutral-400 font-medium">
                    Earn 10 stamps for a free coffee
                  </p>
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white">
                  {points} / {maxPoints}
                </div>
              </div>

              {/* Stamp Grid */}
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 10 }).map((_, i) => {
                  const isEarned = i < points;
                  const isNext = i === points;
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-full flex items-center justify-center text-sm font-bold transition-all relative ${
                        isEarned
                          ? "bg-white text-black scale-100"
                          : "bg-white/10 text-neutral-600 scale-95"
                      } ${isNext ? "ring-2 ring-white/50 animate-pulse" : ""}`}
                    >
                      {isEarned ? (
                        <Star size={14} className="fill-black" />
                      ) : (
                        <span className="opacity-50">{i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium pt-2 border-t border-white/10">
                <Gift size={12} />
                <span>
                  {points >= 10
                    ? "Reward unlocked! Redeem at counter."
                    : `${10 - points} more stamps to reach your goal!`}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* History */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {/* Placeholder history items for now */}
            <HistoryItem
              icon={<Clock size={18} />}
              title="Star Coffee"
              date="Today, 2:30 PM"
              points="+1 stamp"
            />
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

function HistoryItem({
  icon,
  title,
  date,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  date: string;
  points: string;
}) {
  return (
    <Card className="p-4 flex items-center justify-between border-neutral-50 rounded-2xl shadow-none">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-600">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-neutral-800 tracking-tight">{title}</h4>
          <p className="text-xs text-neutral-400 font-semibold">{date}</p>
        </div>
      </div>
      <span
        className={`text-sm font-bold ${points.startsWith("+") ? "text-black" : "text-neutral-400"}`}
      >
        {points}
      </span>
    </Card>
  );
}
