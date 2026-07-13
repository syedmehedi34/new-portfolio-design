/* eslint-disable react-hooks/set-state-in-effect */
// src/components/books/notes-modal.tsx
"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ArrowLeft, Plus, Pencil, Trash2, StickyNote } from "lucide-react";
import type { BookDTO, NoteDTO } from "@/types/book";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: BookDTO | null;
  onSave: (notes: Partial<NoteDTO>[]) => Promise<void>;
}

export function NotesModal({ isOpen, onClose, book, onSave }: NotesModalProps) {
  const [notes, setNotes] = useState<Partial<NoteDTO>[]>([]);
  const [screen, setScreen] = useState<"list" | "editor">("list");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && book) {
      setNotes(book.notes ?? []);
      setScreen("list");
    }
  }, [isOpen, book]);

  if (!book) return null;

  const openEditor = (index: number | null) => {
    setEditingIndex(index);
    setDraftTitle(index !== null ? (notes[index].title ?? "") : "");
    setDraftContent(index !== null ? (notes[index].content ?? "") : "");
    setScreen("editor");
  };

  const persist = async (nextNotes: Partial<NoteDTO>[]) => {
    setIsSaving(true);
    try {
      await onSave(nextNotes);
      setNotes(nextNotes);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNote = async () => {
    if (!draftTitle.trim() && !draftContent.trim()) return;

    const payload: Partial<NoteDTO> = {
      ...(editingIndex !== null ? notes[editingIndex] : {}),
      title: draftTitle.trim() || "Untitled Note",
      content: draftContent,
    };

    const next = [...notes];
    if (editingIndex !== null) next[editingIndex] = payload;
    else next.push(payload);

    await persist(next);
    setScreen("list");
  };

  const handleDelete = async () => {
    if (deleteIndex === null) return;
    await persist(notes.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          screen === "list"
            ? `Notes — ${book.bookName}`
            : draftTitle || "New Note"
        }
        maxWidth="max-w-xl"
      >
        {screen === "list" ? (
          <div className="space-y-3">
            <button
              onClick={() => openEditor(null)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Plus size={15} /> New Note
            </button>

            {notes.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <StickyNote size={28} className="text-muted/40" />
                <p className="text-sm text-muted">
                  No notes yet for this book.
                </p>
              </div>
            ) : (
              <div className="max-h-96 space-y-2 overflow-y-auto">
                {notes.map((note, index) => (
                  <div
                    key={note._id ?? index}
                    className="group flex items-start justify-between gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent/40"
                  >
                    <button
                      onClick={() => openEditor(index)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="truncate text-sm font-medium">
                        {note.title || "Untitled Note"}
                      </p>
                      <div
                        className="mt-1 line-clamp-2 text-xs text-muted **:inline"
                        dangerouslySetInnerHTML={{ __html: note.content || "" }}
                      />
                    </button>
                    <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => openEditor(index)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteIndex(index)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-red-500/10 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setScreen("list")}
              className="flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={13} /> Back to notes
            </button>

            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="Note title"
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium outline-none focus:border-accent transition-colors"
            />

            <RichTextEditor
              value={draftContent}
              onChange={setDraftContent}
              placeholder="Write your note..."
            />

            <div className="flex gap-2 border-t border-border pt-4">
              <button
                onClick={() => setScreen("list")}
                className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                disabled={isSaving}
                className="flex-1 rounded-lg bg-accent py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {isSaving ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        title="Delete this note?"
        description="This note will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </>
  );
}
