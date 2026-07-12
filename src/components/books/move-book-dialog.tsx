// src/components/books/move-book-dialog.tsx
"use client";

import { Modal } from "@/components/ui/modal";
import { Folder as FolderIcon, Home, Check } from "lucide-react";
import type { FolderDTO, BookDTO } from "@/types/book";

interface MoveBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  book: BookDTO | null;
  folders: FolderDTO[];
  onMove: (folderId: string | null) => void;
}

export function MoveBookDialog({
  isOpen,
  onClose,
  book,
  folders,
  onMove,
}: MoveBookDialogProps) {
  if (!book) return null;

  const handleMove = (folderId: string | null) => {
    onMove(folderId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`"${book.bookName}" কোথায় নিতে চান?`}
      maxWidth="max-w-sm"
    >
      <div className="flex max-h-80 flex-col gap-1.5 overflow-y-auto">
        <button
          onClick={() => handleMove(null)}
          className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:border-accent/40 hover:bg-accent/5"
        >
          <span className="flex items-center gap-2">
            <Home size={15} className="text-muted" /> রুট (কোনো ফোল্ডার নেই)
          </span>
          {book.folderId === null && (
            <Check size={15} className="text-accent" />
          )}
        </button>

        {folders.map((folder) => (
          <button
            key={folder._id}
            onClick={() => handleMove(folder._id)}
            disabled={book.folderId === folder._id}
            className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:border-accent/40 hover:bg-accent/5 disabled:opacity-50"
          >
            <span className="flex items-center gap-2">
              <FolderIcon size={15} style={{ color: folder.color }} />
              {folder.name}
            </span>
            {book.folderId === folder._id && (
              <Check size={15} className="text-accent" />
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}
