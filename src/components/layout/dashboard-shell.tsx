// src/components/layout/dashboard-shell.tsx
import { Sidebar } from "./sidebar/sidebar";
import { Topbar } from "./topbar/topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
