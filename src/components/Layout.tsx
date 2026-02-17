import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Gift,
  Settings,
  UserCircle,
  Menu,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
} from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-neutral-50 overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-100 flex items-center justify-between px-6 z-50">
        <h1 className="text-lg font-bold">Admin</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-600"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          isCollapsed ? "lg:w-20" : "lg:w-72"
        } fixed lg:relative z-[60] w-full sm:w-80 h-screen border-r border-neutral-100 flex flex-col bg-white transition-all duration-300 ease-in-out`}
      >
        {/* Toggle Button (Desktop Only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-neutral-200 rounded-full items-center justify-center shadow-sm hover:bg-neutral-50 transition-colors z-70"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <Link
          to="/"
          className={`p-6 md:p-8 pb-4 block hover:opacity-80 active:scale-95 transition-all ${isCollapsed ? "px-4" : "px-8"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold shrink-0">
              L
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight truncate">
                  Loyalkh
                </h1>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mt-1">
                  Merchant
                </p>
              </div>
            )}
          </div>
        </Link>

        <nav
          className={`flex-1 space-y-2 p-4 transition-all ${isCollapsed ? "px-3" : "px-6"}`}
        >
          <SidebarLink
            to="/admin"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isCollapsed={isCollapsed}
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/admin/customers"
            icon={<Users size={20} />}
            label="Customers"
            isCollapsed={isCollapsed}
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/admin/rewards"
            icon={<Gift size={20} />}
            label="Reward Rules"
            isCollapsed={isCollapsed}
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/admin/settings"
            icon={<Settings size={20} />}
            label="Settings"
            isCollapsed={isCollapsed}
            onClick={() => setIsSidebarOpen(false)}
          />
        </nav>

        <div
          className={`p-4 border-t border-neutral-100 transition-all ${isCollapsed ? "px-3" : "px-6"}`}
        >
          <div
            className={`bg-neutral-50 rounded-2xl p-3 flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
          >
            <div className="w-10 h-10 bg-neutral-200 text-neutral-600 rounded-xl flex items-center justify-center font-bold shrink-0">
              S
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">Star Coffee</p>
                <p className="text-xs text-neutral-400 font-medium truncate">
                  Owner
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0 overflow-auto h-screen">
        {children}
      </main>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/5 z-[50] lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function SidebarLink({
  to,
  icon,
  label,
  isCollapsed,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link to={to} onClick={onClick} activeOptions={{ exact: true }}>
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group relative cursor-pointer ${
            isActive
              ? "bg-black text-white shadow-lg shadow-black/10 font-bold"
              : "text-neutral-600 hover:bg-neutral-50"
          } ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="shrink-0">{icon}</div>
          {!isCollapsed ? (
            <span className="text-sm truncate">{label}</span>
          ) : (
            <div className="absolute left-full ml-4 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] uppercase tracking-widest shadow-xl">
              {label}
            </div>
          )}
        </div>
      )}
    </Link>
  );
}

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="px-6 py-6 bg-white border-b border-neutral-100 sticky top-0 z-40 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-all"
        >
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">
            L
          </div>
          <h1 className="text-lg font-bold tracking-tight">Loyalkh</h1>
        </Link>
        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
          <UserCircle size={24} className="text-neutral-400" />
        </div>
      </header>

      <main className="flex-1 overflow-auto">{children}</main>

      {/* Bottom Nav - Clean & Floating */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-xl border border-neutral-200/50 rounded-[40px] px-4 py-3 shadow-xl shadow-black/5 z-50 flex items-center justify-between">
        <BottomNavLink
          to="/dashboard"
          icon={<LayoutDashboard size={22} />}
          label="Home"
        />
        <BottomNavLink to="/rewards" icon={<Gift size={22} />} label="Gifts" />
        <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg shadow-black/20 active:scale-90 transition-transform">
          <Plus size={24} />
        </button>
        <BottomNavLink
          to="/profile"
          icon={<UserCircle size={22} />}
          label="Profile"
        />
        <BottomNavLink
          to="/settings"
          icon={<Settings size={22} />}
          label="More"
        />
      </div>
    </div>
  );
}

function BottomNavLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      activeProps={{ className: "text-black scale-110" }}
      className="flex flex-col items-center justify-center gap-1 text-neutral-400 transition-all active:scale-95 flex-1"
    >
      <div className="p-1">{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-tighter">
        {label}
      </span>
    </Link>
  );
}
