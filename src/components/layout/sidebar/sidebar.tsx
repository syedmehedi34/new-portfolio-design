// src/components/layout/sidebar/sidebar.tsx
"use client";

import { navItems } from "@/config/nav-items";
import { SidebarNavItem } from "./sidebar-nav-item";

export function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r border-border bg-surface fixed left-0 top-0">
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="text-lg font-semibold tracking-tight">
          Acme<span className="text-accent">.</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <SidebarNavItem key={item.href} item={item} />
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-xs text-muted">© 2026 Acme Inc.</p>
      </div>
    </aside>
  );
}
