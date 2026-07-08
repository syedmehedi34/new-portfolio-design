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

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Islamic Books", href: "/islamic-books", icon: BookOpen },
  { title: "Book Reviews", href: "/book-reviews", icon: StarCheck },
  { title: "Islamic Content", href: "/islamic-content", icon: PencilLine },
  { title: "Islamic Notes", href: "/islamic-notes", icon: NotebookPen },
  { title: "Important Notes", href: "/important-notes", icon: ShieldAlert },
  { title: "My Schedules", href: "/my-schedules", icon: AlarmClock },
  { title: "Settings", href: "/settings", icon: Settings },
];
