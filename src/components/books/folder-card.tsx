// src/components/books/folder-card.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Folder as FolderIcon,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import type { FolderDTO } from "@/types/book";

interface FolderCardProps {
  folder: FolderDTO;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function FolderCard({
  folder,
  onOpen,
  onEdit,
  onDelete,
}: FolderCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div
      onClick={onOpen}
      className="group relative flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/40 hover:shadow-sm"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${folder.color}20`, color: folder.color }}
      >
        <FolderIcon size={20} fill={folder.color} strokeWidth={1.5} />
      </div>
      <p className="flex-1 truncate text-sm font-medium">{folder.name}</p>

      <div
        ref={menuRef}
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted opacity-0 transition-all hover:bg-accent/10 hover:text-accent group-hover:opacity-100"
        >
          <MoreVertical size={15} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-8 z-10 w-36 rounded-lg border border-border bg-background p-1 shadow-lg">
            <button
              onClick={() => {
                setMenuOpen(false);
                onEdit();
              }}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <Pencil size={13} /> এডিট
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onDelete();
              }}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={13} /> ডিলিট
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
