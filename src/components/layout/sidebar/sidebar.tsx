// src/components/layout/sidebar/sidebar.tsx
"use client";

import { navItems } from "@/config/nav-items";
import { SidebarNavItem } from "./sidebar-nav-item";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Sidebar() {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-surface fixed left-0 top-0 z-20",
        "transition-all duration-200 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-border px-4",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight truncate">
              Mehedi<span className="text-accent">.</span>
            </span>
          </Link>
        )}
        <SidebarToggle />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="border-t border-border p-4">
        {!isCollapsed && (
          <p className="text-xs text-muted truncate">© 2026 Acme Inc.</p>
        )}
      </div>
    </aside>
  );
}
