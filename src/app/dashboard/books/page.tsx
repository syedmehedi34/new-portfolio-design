// src/app/(dashboard)/dashboard/books/page.tsx
"use client";

import { useState } from "react";
import { BookOpen, FolderOpen } from "lucide-react";
import { useBookLibrary } from "@/hooks/use-book-library";
import { BookToolbar } from "@/components/books/book-toolbar";
import { BreadcrumbNav } from "@/components/books/breadcrumb-nav";
import { FolderCard } from "@/components/books/folder-card";
import { BookCard } from "@/components/books/book-card";
import { BookFormDialog } from "@/components/books/book-form-dialog";
import { FolderFormDialog } from "@/components/books/folder-form-dialog";
import { MoveBookDialog } from "@/components/books/move-book-dialog";
import { NotesModal } from "@/components/books/notes-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { BookDTO, FolderDTO, NoteDTO } from "@/types/book";

type DeleteTarget = {
  type: "book" | "folder";
  id: string;
  name: string;
} | null;

export default function BooksPage() {
  const lib = useBookLibrary();

  const [bookDialog, setBookDialog] = useState<{
    open: boolean;
    book: BookDTO | null;
  }>({
    open: false,
    book: null,
  });
  const [folderDialog, setFolderDialog] = useState<{
    open: boolean;
    folder: FolderDTO | null;
  }>({
    open: false,
    folder: null,
  });
  const [moveDialog, setMoveDialog] = useState<{
    open: boolean;
    book: BookDTO | null;
  }>({
    open: false,
    book: null,
  });
  const [notesDialog, setNotesDialog] = useState<{
    open: boolean;
    book: BookDTO | null;
  }>({
    open: false,
    book: null,
  });
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const gridClass = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5";
  const listClass = "flex flex-col gap-2";
  const folderGridClass =
    "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";
  const folderListClass = "flex flex-col gap-2";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Library</h2>
        <p className="mt-1 text-sm text-muted">
          Keep all your books and notes organized in one place
        </p>
      </div>

      <BookToolbar
        viewMode={lib.viewMode}
        onViewModeChange={lib.switchViewMode}
        displayMode={lib.displayMode}
        onDisplayModeChange={lib.switchDisplayMode}
        search={lib.search}
        onSearchChange={lib.setSearch}
        statusFilter={lib.statusFilter}
        onStatusFilterChange={lib.setStatusFilter}
        onAddBook={() => setBookDialog({ open: true, book: null })}
        onAddFolder={() => setFolderDialog({ open: true, folder: null })}
      />

      {lib.viewMode === "folder" && (
        <BreadcrumbNav items={lib.breadcrumb} onNavigate={lib.goToBreadcrumb} />
      )}

      {lib.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {lib.error}
        </div>
      )}

      {lib.isLoading ? (
        <div className={lib.displayMode === "grid" ? gridClass : listClass}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={
                lib.displayMode === "grid"
                  ? "aspect-[3/4] animate-pulse rounded-xl bg-surface"
                  : "h-20 animate-pulse rounded-xl bg-surface"
              }
            />
          ))}
        </div>
      ) : (
        <>
          {lib.viewMode === "folder" && lib.folders.length > 0 && (
            <div
              className={
                lib.displayMode === "grid" ? folderGridClass : folderListClass
              }
            >
              {lib.folders.map((folder) => (
                <FolderCard
                  key={folder._id}
                  folder={folder}
                  onOpen={() => lib.enterFolder(folder)}
                  onEdit={() => setFolderDialog({ open: true, folder })}
                  onDelete={() =>
                    setDeleteTarget({
                      type: "folder",
                      id: folder._id,
                      name: folder.name,
                    })
                  }
                />
              ))}
            </div>
          )}

          {lib.books.length > 0 ? (
            <div className={lib.displayMode === "grid" ? gridClass : listClass}>
              {lib.books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  view={lib.displayMode}
                  onEdit={() => setBookDialog({ open: true, book })}
                  onDelete={() =>
                    setDeleteTarget({
                      type: "book",
                      id: book._id,
                      name: book.bookName,
                    })
                  }
                  onMove={() => setMoveDialog({ open: true, book })}
                  onNotes={() => setNotesDialog({ open: true, book })}
                  onToggleFavorite={() =>
                    lib.updateBook(book._id, { isFavorite: !book.isFavorite })
                  }
                />
              ))}
            </div>
          ) : (
            lib.folders.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
                {lib.viewMode === "folder" ? (
                  <FolderOpen size={32} className="text-muted/40" />
                ) : (
                  <BookOpen size={32} className="text-muted/40" />
                )}
                <p className="text-sm text-muted">
                  Nothing here yet. Add a new book or folder.
                </p>
              </div>
            )
          )}
        </>
      )}

      <BookFormDialog
        isOpen={bookDialog.open}
        onClose={() => setBookDialog({ open: false, book: null })}
        book={bookDialog.book}
        onSubmit={async (data) => {
          if (bookDialog.book) await lib.updateBook(bookDialog.book._id, data);
          else await lib.createBook(data);
        }}
      />

      <FolderFormDialog
        isOpen={folderDialog.open}
        onClose={() => setFolderDialog({ open: false, folder: null })}
        folder={folderDialog.folder}
        onSubmit={async (data) => {
          if (folderDialog.folder)
            await lib.updateFolder(folderDialog.folder._id, data);
          else await lib.createFolder(data);
        }}
      />

      <MoveBookDialog
        isOpen={moveDialog.open}
        onClose={() => setMoveDialog({ open: false, book: null })}
        book={moveDialog.book}
        folders={lib.allFolders}
        onMove={(folderId) =>
          moveDialog.book && lib.moveBook(moveDialog.book._id, folderId)
        }
      />

      <NotesModal
        isOpen={notesDialog.open}
        onClose={() => setNotesDialog({ open: false, book: null })}
        book={notesDialog.book}
        onSave={async (notes: Partial<NoteDTO>[]) => {
          if (notesDialog.book)
            await lib.updateBook(notesDialog.book._id, { notes });
        }}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title={
          deleteTarget?.type === "folder"
            ? "Delete this folder?"
            : "Delete this book?"
        }
        confirmLabel="Delete"
        description={
          deleteTarget?.type === "folder"
            ? `"${deleteTarget?.name}" will be removed. Its books and sub-folders will move to the parent folder.`
            : `"${deleteTarget?.name}" will be permanently deleted.`
        }
        onConfirm={() => {
          if (!deleteTarget) return;
          if (deleteTarget.type === "folder") lib.deleteFolder(deleteTarget.id);
          else lib.deleteBook(deleteTarget.id);
        }}
      />
    </div>
  );
}
