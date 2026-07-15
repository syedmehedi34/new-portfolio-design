// src/components/layout/sidebar/sidebar.tsx
"use client";

import { navItems } from "@/config/nav-items";
import { SidebarNavItem } from "./sidebar-nav-item";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebar } from "./sidebar-context";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import Image from "next/image";
import Logo from "@/components/ui/logo";
// import Logo from "/logo.png";

export function Sidebar() {
  const { isCollapsed } = useSidebar();
  const { data: session } = useSession();
  const userRole = session?.user.role;

  const visibleItems = navItems.filter(
    (item) => !item.roles || (userRole && item.roles.includes(userRole)),
  );

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
          <div className="flex items-center gap-2">
            {/* <span className="text-lg font-semibold tracking-tight truncate">
              Mehedi<span className="text-accent">.</span>
            </span> */}
            {/* <Image src="/Mehedi_logo.svg" alt="Logo" width={135} height={135} /> */}
            <Logo variant="light" />
          </div>
        )}
        <SidebarToggle />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {visibleItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="border-t border-border p-4">
        {!isCollapsed && (
          <p className="text-xs text-muted truncate">© Syed Mehedi Hasan.</p>
        )}
      </div>
    </aside>
  );
}
