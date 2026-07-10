// src/config/nav-items.ts
import {
  LayoutDashboard,
  Settings,
  NotebookPen,
  BookOpen,
  StarCheck,
  PencilLine,
  ShieldAlert,
  AlarmClock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/models/user.model";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRole[];
}

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Islamic Books", href: "/dashboard/islamic-books", icon: BookOpen },
  { title: "Book Reviews", href: "/dashboard/book-reviews", icon: StarCheck },
  {
    title: "Islamic Content",
    href: "/dashboard/islamic-content",
    icon: PencilLine,
  },
  {
    title: "Islamic Notes",
    href: "/dashboard/islamic-notes",
    icon: NotebookPen,
  },
  {
    title: "Important Notes",
    href: "/dashboard/important-notes",
    icon: ShieldAlert,
  },
  { title: "My Schedules", href: "/dashboard/my-schedules", icon: AlarmClock },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  {
    title: "Admin Panel",
    href: "/dashboard/admin",
    icon: Users,
    roles: ["admin"],
  },
];
