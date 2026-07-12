/* eslint-disable react-hooks/set-state-in-effect */
// src/components/books/folder-form-dialog.tsx
"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import type { FolderDTO } from "@/types/book";

interface FolderFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  folder: FolderDTO | null;
  onSubmit: (data: { name: string; color: string }) => Promise<void>;
}

const COLOR_OPTIONS = [
  "#5B6BF5",
  "#F5A65B",
  "#5BF5A6",
  "#F55B8A",
  "#8A5BF5",
  "#5BC9F5",
];

export function FolderFormDialog({
  isOpen,
  onClose,
  folder,
  onSubmit,
}: FolderFormDialogProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(folder?.name ?? "");
      setColor(folder?.color ?? COLOR_OPTIONS[0]);
    }
  }, [isOpen, folder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), color });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={folder ? "ফোল্ডার এডিট করুন" : "নতুন ফোল্ডার"}
      maxWidth="max-w-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            ফোল্ডারের নাম
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
            placeholder="যেমন: তাফসীর সিরিজ"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            রং
          </label>
          <div className="flex gap-2">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className="h-8 w-8 rounded-full transition-all"
                style={{
                  backgroundColor: c,
                  boxShadow: color === c ? `0 0 0 2px ${c}` : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
          >
            বাতিল
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="flex-1 rounded-lg bg-accent py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isSubmitting ? "সেভ হচ্ছে..." : "সেভ করুন"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
