// src/components/books/book-toolbar.tsx
"use client";

import {
  Search,
  Plus,
  FolderPlus,
  FolderTree,
  Files,
  LayoutGrid,
  List,
} from "lucide-react";
import { READING_STATUS } from "@/lib/constants/book";
import type { ReadingStatus } from "@/lib/constants/book";
import type { ViewMode, DisplayMode } from "@/hooks/use-book-library";
import { cn } from "@/lib/utils";

interface BookToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  displayMode: DisplayMode;
  onDisplayModeChange: (mode: DisplayMode) => void;
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: ReadingStatus | "all";
  onStatusFilterChange: (v: ReadingStatus | "all") => void;
  onAddBook: () => void;
  onAddFolder: () => void;
}

export function BookToolbar({
  viewMode,
  onViewModeChange,
  displayMode,
  onDisplayModeChange,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onAddBook,
  onAddFolder,
}: BookToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, author or category..."
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-surface p-1">
            <button
              onClick={() => onViewModeChange("folder")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                viewMode === "folder"
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground",
              )}
            >
              <FolderTree size={14} /> Folder View
            </button>
            <button
              onClick={() => onViewModeChange("raw")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                viewMode === "raw"
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground",
              )}
            >
              <Files size={14} /> Raw View
            </button>
          </div>

          <div className="flex items-center rounded-lg border border-border bg-surface p-1">
            <button
              onClick={() => onDisplayModeChange("grid")}
              title="Grid view"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                displayMode === "grid"
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground",
              )}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => onDisplayModeChange("list")}
              title="List view"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                displayMode === "list"
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground",
              )}
            >
              <List size={14} />
            </button>
          </div>

          {viewMode === "folder" && (
            <button
              onClick={onAddFolder}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <FolderPlus size={16} /> Folder
            </button>
          )}

          <button
            onClick={onAddBook}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Plus size={16} /> Add Book
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onStatusFilterChange("all")}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            statusFilter === "all"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted hover:text-foreground",
          )}
        >
          All
        </button>
        {READING_STATUS.map((status) => (
          <button
            key={status}
            onClick={() => onStatusFilterChange(status)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              statusFilter === status
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
