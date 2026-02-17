import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../../components/Layout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  QrCode,
  Phone,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Loader2,
  Camera,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export const Route = createFileRoute("/admin/checkin")({
  component: AdminCheckin,
});

function AdminCheckin() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [lastCheckin, setLastCheckin] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handleCheckin = async (phoneNumber: string) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          businessId: "default-biz", // In a real app, this would come from auth context
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setLastCheckin(data);
        setStatus("success");
        setPhone("");
        // Reset status after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  useEffect(() => {
    if (isScanning) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false,
      );

      scannerRef.current.render(onScanSuccess, onScanFailure);
    } else {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [isScanning]);

  function onScanSuccess(decodedText: string) {
    // Assuming the QR contains the phone number
    setIsScanning(false);
    handleCheckin(decodedText);
  }

  function onScanFailure(error: any) {
    // We can ignore failures, they happen constantly during scanning
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Check-in Terminal
            </h1>
            <p className="text-neutral-500 font-medium">
              Scan QR or enter phone to award stamps.
            </p>
          </div>
        </div>

        {/* Status Feedback Overlay */}
        {status === "success" && (
          <div className="bg-green-500 text-white p-6 rounded-[2rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-bold text-lg">Check-in Successful!</p>
              <p className="text-white/80 text-sm">
                {lastCheckin?.customerName} now has {lastCheckin?.stamps}{" "}
                stamps.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-500 text-white p-6 rounded-[2rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <XCircle size={24} />
            </div>
            <div>
              <p className="font-bold text-lg">Check-in Failed</p>
              <p className="text-white/80 text-sm">
                Please verify the phone number and try again.
              </p>
            </div>
          </div>
        )}

        {/* Main Interface */}
        <div className="grid gap-6">
          {/* QR Scanner Section */}
          <Card className="p-8 flex flex-col items-center justify-center space-y-6 overflow-hidden relative">
            {!isScanning ? (
              <>
                <div className="w-32 h-32 bg-neutral-50 rounded-[2.5rem] flex items-center justify-center text-neutral-300">
                  <QrCode size={64} strokeWidth={1.5} />
                </div>
                <Button
                  onClick={() => setIsScanning(true)}
                  className="w-full max-w-xs h-16 rounded-2xl text-lg font-bold gap-3"
                >
                  <Camera size={24} />
                  Start Scanning
                </Button>
              </>
            ) : (
              <div className="w-full">
                <div
                  id="reader"
                  className="w-full rounded-2xl overflow-hidden border-0"
                ></div>
                <Button
                  variant="ghost"
                  onClick={() => setIsScanning(false)}
                  className="w-full mt-4"
                >
                  Cancel Scanning
                </Button>
              </div>
            )}
          </Card>

          {/* Manual Entry Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-neutral-100"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">
              or manually
            </span>
            <div className="flex-grow border-t border-neutral-100"></div>
          </div>

          {/* Manual Phone Entry */}
          <Card className="p-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-500 uppercase tracking-tight">
                  Customer Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={20}
                  />
                  <Input
                    placeholder="Enter phone number..."
                    className="pl-12 h-16 rounded-2xl text-lg font-medium border-neutral-100 focus:ring-black/5"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                  />
                </div>
              </div>
              <Button
                disabled={!phone || status === "loading"}
                onClick={() => handleCheckin(phone)}
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-lg shadow-black/5"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  "Award Stamp"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
