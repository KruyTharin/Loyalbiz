import { createFileRoute } from "@tanstack/react-router";
import { CustomerLayout } from "../components/Layout";
import {
  Bell,
  Shield,
  Globe,
  HelpCircle,
  Info,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <CustomerLayout>
      <div className="p-6 space-y-8 bg-neutral-50 min-h-full pb-32">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-neutral-500 font-medium mt-1">
            Customize your experience & support.
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 px-1">
            App Settings
          </h3>
          <div className="grid gap-3">
            <SettingsLink
              icon={<Bell size={20} />}
              title="Notifications"
              description="Manage your push alerts"
            />
            <SettingsLink
              icon={<Globe size={20} />}
              title="Language"
              description="English (Khmer soon)"
            />
            <SettingsLink
              icon={<Shield size={20} />}
              title="Privacy & Security"
              description="Manage your data and login"
            />
          </div>
        </section>

        <section className="space-y-4 pt-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 px-1">
            Support & About
          </h3>
          <div className="grid gap-3">
            <SettingsLink icon={<HelpCircle size={20} />} title="Help Center" />
            <SettingsLink
              icon={<Info size={20} />}
              title="Version"
              description="1.0.4 (Stable)"
            />
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
}

function SettingsLink({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <button className="w-full text-left p-5 bg-white border border-neutral-100 rounded-[1.5rem] shadow-sm flex items-center justify-between hover:bg-neutral-50 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400 group-hover:text-black transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-neutral-800 tracking-tight leading-none">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-neutral-400 font-medium mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      <ChevronRight
        size={18}
        className="text-neutral-300 group-hover:text-neutral-400 transition-colors"
      />
    </button>
  );
}
