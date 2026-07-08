// src/config/nav-items.ts
import { LayoutDashboard, Users, Settings, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Users", href: "/users", icon: Users },
  { title: "Documents", href: "/documents", icon: FileText },
  { title: "Settings", href: "/settings", icon: Settings },
];
