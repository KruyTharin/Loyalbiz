import { createFileRoute } from "@tanstack/react-router";
import { CustomerLayout } from "../components/Layout";
import { Card } from "../components/ui/Card";
import { Phone, Mail, Calendar, LogOut, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <CustomerLayout>
      <div className="p-6 space-y-8 bg-neutral-50 min-h-full pb-32">
        <div className="flex flex-col items-center py-6">
          <div className="w-24 h-24 bg-black text-white rounded-[2.5rem] flex items-center justify-center text-3xl font-bold mb-4 shadow-xl shadow-black/10">
            S
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Sokha Rith</h2>
          <p className="text-neutral-500 font-medium">Member since Jan 2024</p>
        </div>

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 px-1">
            Personal Info
          </h3>
          <div className="grid gap-3">
            <ProfileItem
              icon={<Phone size={18} />}
              label="Phone Number"
              value="012 345 678"
            />
            <ProfileItem
              icon={<Mail size={18} />}
              label="Email"
              value="sokha.rith@example.com"
            />
            <ProfileItem
              icon={<Calendar size={18} />}
              label="Date of Birth"
              value="12 March 1995"
            />
          </div>
        </section>

        <section className="space-y-4 pt-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 px-1">
            Account Actions
          </h3>
          <div className="grid gap-3">
            <button className="w-full text-left p-5 bg-white border border-neutral-100 rounded-[1.5rem] shadow-sm flex items-center justify-between hover:bg-neutral-50 transition-colors group">
              <div className="flex items-center gap-4 text-red-500">
                <LogOut size={20} />
                <span className="font-bold">Log out of Account</span>
              </div>
              <ChevronRight
                size={18}
                className="text-neutral-300 group-hover:text-neutral-400"
              />
            </button>
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="p-5 flex items-center gap-4 border-neutral-100 shadow-sm shadow-black/[0.02]">
      <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight">
          {label}
        </p>
        <p className="font-bold text-neutral-800 tracking-tight leading-none mt-1">
          {value}
        </p>
      </div>
    </Card>
  );
}
