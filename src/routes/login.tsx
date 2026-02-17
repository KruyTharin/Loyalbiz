import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Smartphone, ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      setIsLoading(true);
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 sm:p-8">
      <Link
        to="/"
        className="absolute top-8 left-8 p-3 bg-neutral-50 rounded-full hover:bg-neutral-100 transition-colors"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="w-full max-w-sm space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-neutral-500 font-medium leading-relaxed px-4">
            Enter your phone number to access your digital rewards.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-600 px-1">
              Phone Number
            </label>
            <div className="relative group">
              <Smartphone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors"
                size={18}
              />
              <Input
                type="tel"
                placeholder="012 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-11 h-14 bg-neutral-50 text-lg rounded-2xl border-transparent focus:bg-white"
                autoFocus
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-base font-bold rounded-2xl"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign in"}
          </Button>
        </form>

        <div className="pt-8 text-center">
          <p className="text-sm text-neutral-400 font-medium">
            New customer? Simply show your QR at any <br /> participating shop
            to get started.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-10 text-xs text-neutral-300 font-bold uppercase tracking-widest tracking-widest">
        Loyalkh © 2024
      </div>
    </div>
  );
}
