// src/components/books/breadcrumb-nav.tsx
"use client";

import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbNavProps {
  items: { _id: string; name: string }[];
  onNavigate: (index: number) => void;
}

export function BreadcrumbNav({ items, onNavigate }: BreadcrumbNavProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto text-sm text-muted">
      <button
        onClick={() => onNavigate(-1)}
        className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 hover:bg-accent/10 hover:text-accent transition-colors"
      >
        <Home size={14} /> All Folders
      </button>
      {items.map((item, index) => (
        <div key={item._id} className="flex shrink-0 items-center gap-1.5">
          <ChevronRight size={14} className="text-muted/50" />
          <button
            onClick={() => onNavigate(index)}
            className={`rounded-md px-2 py-1 transition-colors hover:bg-accent/10 hover:text-accent ${
              index === items.length - 1 ? "font-medium text-foreground" : ""
            }`}
          >
            {item.name}
          </button>
        </div>
      ))}
    </div>
  );
}
