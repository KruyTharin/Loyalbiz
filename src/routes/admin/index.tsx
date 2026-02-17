import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../../components/Layout";
import { Card } from "../../components/ui/Card";
import {
  Users,
  UserCheck,
  Calendar,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/Button";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-neutral-500 font-medium mt-1">
              Welcome back to your business overview.
            </p>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Last 30 days
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Total Customers"
            value="342"
            change="+12%"
            icon={<Users size={20} />}
          />
          <StatCard
            title="Active Today"
            value="24"
            change="+5"
            icon={<UserCheck size={20} />}
          />
          <StatCard
            title="Check-ins"
            value="89"
            change="+18%"
            icon={<Calendar size={20} />}
          />
          <StatCard
            title="Revenue Est."
            value="$1,240"
            change="+15%"
            icon={<TrendingUp size={20} />}
          />
        </div>

        {/* Main Insights Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Scans */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold tracking-tight">
                Recent Activity
              </h3>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>
            <Card className="p-0 overflow-hidden divide-y divide-neutral-50 border-neutral-100 shadow-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center font-bold text-neutral-600">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div>
                      <p className="font-bold text-neutral-800">
                        Customer #{i + 100}
                      </p>
                      <p className="text-xs text-neutral-400 font-medium">
                        Just now at Main Counter
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">+1 Stamp</p>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight">
                      Success
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Reward Status */}
          <div className="space-y-4 text-black">
            <h3 className="text-xl font-bold tracking-tight">
              Reward Performance
            </h3>
            <Card className="space-y-8 p-8 border-neutral-100 shadow-sm">
              <RewardProgress
                label="Free Coffee"
                value={75}
                count="128 redeemed"
              />
              <RewardProgress
                label="20% Discount"
                value={45}
                count="42 redeemed"
              />
              <RewardProgress
                label="BOGO Pastry"
                value={30}
                count="15 redeemed"
              />
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-6 border-neutral-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-neutral-50 rounded-xl text-neutral-600">
          {icon}
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          {change}
        </span>
      </div>
      <div>
        <p className="text-neutral-500 font-medium text-sm">{title}</p>
        <h2 className="text-2xl font-bold tracking-tight mt-1">{value}</h2>
      </div>
    </Card>
  );
}

function RewardProgress({
  label,
  value,
  count,
}: {
  label: string;
  value: number;
  count: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <p className="font-bold">{label}</p>
        <p className="text-neutral-400 font-bold tracking-tight">{count}</p>
      </div>
      <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
