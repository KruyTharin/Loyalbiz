import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../../components/Layout";
import { Card } from "../../components/ui/Card";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <AdminLayout>
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-neutral-500 font-medium mt-1">
            General business and account configurations.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-0 border-neutral-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-50">
              <h3 className="font-bold">Business Profile</h3>
              <p className="text-sm text-neutral-400 font-medium">
                Public information about your coffee shop.
              </p>
            </div>
            <div className="p-8 space-y-4">
              <p className="text-sm font-bold text-neutral-300 italic uppercase tracking-widest">
                Settings loading...
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  ),
});
