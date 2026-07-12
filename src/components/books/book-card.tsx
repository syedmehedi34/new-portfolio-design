// src/components/books/book-card.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  MoreVertical,
  Pencil,
  Trash2,
  FolderInput,
  Star,
  ExternalLink,
} from "lucide-react";
import type { BookDTO } from "@/types/book";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: BookDTO;
  onEdit: () => void;
  onDelete: () => void;
  onMove: () => void;
  onToggleFavorite: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  "To Read": "bg-slate-500/10 text-slate-500",
  Reading: "bg-blue-500/10 text-blue-500",
  Completed: "bg-green-500/10 text-green-500",
  "On Hold": "bg-yellow-500/10 text-yellow-500",
  Dropped: "bg-red-500/10 text-red-500",
};

export function BookCard({
  book,
  onEdit,
  onDelete,
  onMove,
  onToggleFavorite,
}: BookCardProps) {
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
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent/40 hover:shadow-md">
      <div className="relative aspect-[3/4] w-full bg-accent/5">
        {book.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.coverImageUrl}
            alt={book.bookName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen size={32} className="text-muted/40" />
          </div>
        )}

        <button
          onClick={onToggleFavorite}
          className={cn(
            "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur transition-colors",
            book.isFavorite
              ? "bg-yellow-400 text-white"
              : "bg-black/30 text-white hover:bg-black/50",
          )}
        >
          <Star size={13} fill={book.isFavorite ? "currentColor" : "none"} />
        </button>

        <div ref={menuRef} className="absolute left-2 top-2">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur transition-all hover:bg-black/50 group-hover:opacity-100"
          >
            <MoreVertical size={14} />
          </button>
          {menuOpen && (
            <div className="absolute left-0 top-9 z-10 w-36 rounded-lg border border-border bg-background p-1 shadow-lg">
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
                  onMove();
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs hover:bg-accent/10 hover:text-accent transition-colors"
              >
                <FolderInput size={13} /> মুভ করুন
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

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div>
          <h4 className="line-clamp-2 text-sm font-semibold leading-snug">
            {book.bookName}
          </h4>
          <p className="mt-0.5 truncate text-xs text-muted">
            {book.authorName.join(", ")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium",
              STATUS_STYLES[book.readingStatus],
            )}
          >
            {book.readingStatus}
          </span>
          {book.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="text-[11px] text-muted">
          {book.currentPage} / {book.pages} পৃষ্ঠা পড়া হয়েছে
        </div>

        <a
          href={book.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-accent/10 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-white"
        >
          <ExternalLink size={13} /> পড়ুন
        </a>
      </div>
    </div>
  );
}
