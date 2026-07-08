// src/components/layout/dashboard-shell.tsx
"use client";

import { Sidebar } from "./sidebar/sidebar";
import { Topbar } from "./topbar/topbar";
import { SidebarProvider, useSidebar } from "./sidebar/sidebar-context";
import { cn } from "@/lib/utils";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "transition-all duration-200 ease-in-out",
        isCollapsed ? "pl-20" : "pl-64",
      )}
    >
      <Topbar />
      <main className="p-6">{children}</main>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  );
}
