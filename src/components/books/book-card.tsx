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
  StickyNote,
} from "lucide-react";
import type { BookDTO } from "@/types/book";
import type { DisplayMode } from "@/hooks/use-book-library";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: BookDTO;
  view: DisplayMode;
  onEdit: () => void;
  onDelete: () => void;
  onMove: () => void;
  onNotes: () => void;
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
  view,
  onEdit,
  onDelete,
  onMove,
  onNotes,
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

  const menu = (
    <div
      ref={menuRef}
      className="relative shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setMenuOpen((p) => !p)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-accent/10 hover:text-accent"
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
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onMove();
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <FolderInput size={13} /> Move
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );

  const cover = book.coverImageUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={book.coverImageUrl}
      alt={book.bookName}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <BookOpen size={view === "grid" ? 32 : 18} className="text-muted/40" />
    </div>
  );

  const statusBadge = (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
        STATUS_STYLES[book.readingStatus],
      )}
    >
      {book.readingStatus}
    </span>
  );

  if (view === "list") {
    return (
      <div className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-all hover:border-accent/40 hover:shadow-sm">
        <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-accent/5">
          {cover}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-sm font-semibold">{book.bookName}</h4>
            {statusBadge}
          </div>
          <p className="mt-0.5 truncate text-xs text-muted">
            {book.authorName.join(", ")}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {book.category.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
              >
                {cat}
              </span>
            ))}
            <span className="text-[11px] text-muted">
              {book.currentPage}/{book.pages} pages
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={onToggleFavorite}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              book.isFavorite
                ? "text-yellow-400"
                : "text-muted hover:text-yellow-400",
            )}
          >
            <Star size={15} fill={book.isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            onClick={onNotes}
            title="Notes"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <StickyNote size={15} />
          </button>
          <a
            href={book.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Read"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <ExternalLink size={15} />
          </a>
          {menu}
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent/40 hover:shadow-md">
      <div className="relative aspect-[3/4] w-full bg-accent/5">
        {cover}
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
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="line-clamp-2 text-sm font-semibold leading-snug">
              {book.bookName}
            </h4>
            <p className="mt-0.5 truncate text-xs text-muted">
              {book.authorName.join(", ")}
            </p>
          </div>
          {menu}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {statusBadge}
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
          {book.currentPage} / {book.pages} pages read
        </div>

        <div className="mt-auto flex items-center gap-2">
          <a
            href={book.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent/10 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            <ExternalLink size={13} /> Read
          </a>
          <button
            onClick={onNotes}
            title="Notes"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <StickyNote size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
