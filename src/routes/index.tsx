import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/Button";
import {
  Smartphone,
  ShieldCheck,
  Zap,
  Star,
  Coffee,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black font-normal">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <h1 className="text-xl font-bold tracking-tight">Loyalkh</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium hover:text-neutral-600 transition-colors"
          >
            Log in
          </Link>
          <Button
            onClick={() => navigate({ to: "/admin" })}
            variant="primary"
            size="sm"
          >
            For Business
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-neutral-100 px-3 py-1 rounded-full text-sm font-medium mb-8">
          <Star size={14} className="text-black" />
          <span>Simple loyalty for Cambodia</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          Modern loyalty for <br /> local businesses.
        </h1>
        <p className="text-lg md:text-xl text-neutral-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          The easiest way to reward your loyal customers. No cards, no apps,
          just simple digital stamps.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-black text-white px-10"
            onClick={() => navigate({ to: "/admin" })}
          >
            Start your shop
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="px-10"
            onClick={() => navigate({ to: "/login" })}
          >
            Try as customer
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureBlock
            icon={<Zap size={24} />}
            title="Instant Setup"
            description="Go digital in minutes. Create your loyalty program and start rewarding."
          />
          <FeatureBlock
            icon={<ShieldCheck size={24} />}
            title="Secure & Fair"
            description="Built-in fraud protection with individual customer QR codes."
          />
          <FeatureBlock
            icon={<Smartphone size={24} />}
            title="App-less Flow"
            description="Works directly in the browser. No app download required for customers."
          />
        </div>
      </section>

      {/* Partners Marquee - Simplified */}
      <section className="py-12 border-y border-neutral-100 overflow-hidden">
        <div className="flex justify-center items-center gap-12 opacity-30 grayscale whitespace-nowrap px-6">
          <div className="flex items-center gap-2 text-lg font-semibold uppercase tracking-widest leading-none">
            <Coffee size={20} /> Coffee World
          </div>
          <div className="flex items-center gap-2 text-lg font-semibold uppercase tracking-widest leading-none">
            <Star size={20} /> Bistro KH
          </div>
          <div className="flex items-center gap-2 text-lg font-semibold uppercase tracking-widest leading-none">
            <Coffee size={20} /> The Cup
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-20 px-6 text-center border-t border-neutral-100">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          Ready to grow your business?
        </h2>
        <Button
          size="lg"
          onClick={() => navigate({ to: "/admin" })}
          className="rounded-full px-12"
        >
          Join Loyalkh now
        </Button>
        <div className="mt-16 text-sm text-neutral-400 font-medium">
          Loyalkh Digital Loyalty System © 2024
        </div>
      </footer>
    </div>
  );
}

function FeatureBlock({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
      <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-500 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}
