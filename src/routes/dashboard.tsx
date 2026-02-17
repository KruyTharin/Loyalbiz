import { createFileRoute } from "@tanstack/react-router";
import { CustomerLayout } from "../components/Layout";
import { Card } from "../components/ui/Card";
import { QRCodeSVG } from "qrcode.react";
import { Clock, Star, Gift, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const points = 7;
  const maxPoints = 10;

  return (
    <CustomerLayout>
      <div className="p-6 space-y-8 bg-neutral-50 min-h-full">
        {/* Loyalty Card - Simple & Clean */}
        <Card className="bg-black text-white p-8 border-none overflow-hidden relative">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-1">
                  Loyalty Member
                </p>
                <h2 className="text-3xl font-bold tracking-tight">
                  Sokha Rith
                </h2>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl">
                <Star size={24} className="text-white fill-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold uppercase tracking-wider text-neutral-300 px-1">
                <span>Current Progress</span>
                <span>
                  {points} / {maxPoints} stamps
                </span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-1000 ease-out"
                  style={{ width: `${(points / maxPoints) * 100}%` }}
                />
              </div>
              <div className="pt-2 flex items-center gap-2 text-sm text-neutral-400 font-medium">
                <Gift size={14} />
                <span>3 stamps until: Free Large Coffee</span>
              </div>
            </div>
          </div>
        </Card>

        {/* QR Code Section */}
        <Card className="flex flex-col items-center gap-6 py-10 shadow-sm border-neutral-100">
          <div className="p-4 bg-neutral-50 rounded-[2.5rem] border border-neutral-100">
            <QRCodeSVG value="cust_1" size={180} fgColor="#000000" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">Your Check-in Code</h3>
            <p className="text-sm text-neutral-500 font-medium">
              Show this to the cashier at checkout
            </p>
          </div>
        </Card>

        {/* Recent History */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold">Recent Visits</h3>
            <Button variant="ghost" size="sm" className="text-neutral-500">
              View all <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
          <div className="space-y-3 pb-24">
            <HistoryItem
              icon={<Clock size={18} />}
              title="Coffee World"
              date="Today, 2:30 PM"
              points="+1 stamp"
            />
            <HistoryItem
              icon={<Star size={18} />}
              title="Reward Redeemed"
              date="Yesterday"
              points="-10 stamps"
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
