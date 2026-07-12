// src/components/ui/confirm-dialog.tsx
"use client";

import { Modal } from "./modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "নিশ্চিত করুন",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <AlertTriangle size={22} />
        </div>
        <p className="text-sm text-muted">{description}</p>
        <div className="mt-2 flex w-full gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
          >
            বাতিল
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
