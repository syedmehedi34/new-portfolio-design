// src/components/layout/sidebar/sidebar-nav-item.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/nav-items";

export function SidebarNavItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent/10 hover:text-accent",
        isActive ? "bg-accent/10 text-accent" : "text-muted",
      )}
    >
      <Icon size={18} strokeWidth={2} />
      <span>{item.title}</span>
    </Link>
  );
}
