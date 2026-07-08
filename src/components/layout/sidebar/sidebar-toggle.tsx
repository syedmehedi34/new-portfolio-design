// src/components/layout/sidebar/sidebar-toggle.tsx
"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

export function SidebarToggle() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted",
        "hover:bg-accent/10 hover:text-accent transition-colors",
      )}
    >
      {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
    </button>
  );
}
