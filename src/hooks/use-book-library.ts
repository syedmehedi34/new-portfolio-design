/* eslint-disable react-hooks/set-state-in-effect */
// src/hooks/use-book-library.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import type { BookDTO, FolderDTO } from "@/types/book";
import type { ReadingStatus } from "@/lib/constants/book";

export type ViewMode = "folder" | "raw";
export type DisplayMode = "grid" | "list";

interface BreadcrumbItem {
  _id: string;
  name: string;
}

const PREFS_KEY = "books-view-prefs";

export function useBookLibrary() {
  const [viewMode, setViewModeState] = useState<ViewMode>("folder");
  const [displayMode, setDisplayModeState] = useState<DisplayMode>("grid");
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReadingStatus | "all">(
    "all",
  );

  const [folders, setFolders] = useState<FolderDTO[]>([]);
  const [allFolders, setAllFolders] = useState<FolderDTO[]>([]);
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // localStorage থেকে view preferences লোড (mount হওয়ার পর, hydration mismatch এড়াতে)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREFS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as {
          viewMode?: ViewMode;
          displayMode?: DisplayMode;
        };
        if (parsed.viewMode) setViewModeState(parsed.viewMode);
        if (parsed.displayMode) setDisplayModeState(parsed.displayMode);
      }
    } catch {
      // ignore malformed localStorage data
    }
  }, []);

  const persistPrefs = (
    next: Partial<{ viewMode: ViewMode; displayMode: DisplayMode }>,
  ) => {
    try {
      const stored = localStorage.getItem(PREFS_KEY);
      const current = stored ? JSON.parse(stored) : {};
      localStorage.setItem(PREFS_KEY, JSON.stringify({ ...current, ...next }));
    } catch {
      // ignore
    }
  };

  const fetchAllFolders = useCallback(async () => {
    const res = await fetch("/api/folders");
    const data = await res.json();
    setAllFolders(data.folders ?? []);
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("view", viewMode);
      if (viewMode === "folder") {
        params.set("folderId", currentFolderId ?? "null");
      }
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);

      const requests: Promise<Response>[] = [
        fetch(`/api/books?${params.toString()}`),
      ];
      if (viewMode === "folder") {
        requests.push(
          fetch(`/api/folders?parentId=${currentFolderId ?? "null"}`),
        );
      }

      const [booksRes, foldersRes] = await Promise.all(requests);
      const booksData = await booksRes.json();
      setBooks(booksData.books ?? []);

      if (viewMode === "folder" && foldersRes) {
        const foldersData = await foldersRes.json();
        setFolders(foldersData.folders ?? []);
      } else {
        setFolders([]);
      }
    } catch {
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [viewMode, currentFolderId, search, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchAllFolders();
  }, [fetchAllFolders]);

  const enterFolder = (folder: FolderDTO) => {
    setBreadcrumb((prev) => [...prev, { _id: folder._id, name: folder.name }]);
    setCurrentFolderId(folder._id);
  };

  const goToBreadcrumb = (index: number) => {
    if (index === -1) {
      setBreadcrumb([]);
      setCurrentFolderId(null);
      return;
    }
    setBreadcrumb((prev) => {
      const next = prev.slice(0, index + 1);
      setCurrentFolderId(next[next.length - 1]._id);
      return next;
    });
  };

  const switchViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    persistPrefs({ viewMode: mode });
    if (mode === "raw") {
      setBreadcrumb([]);
      setCurrentFolderId(null);
    }
  };

  const switchDisplayMode = (mode: DisplayMode) => {
    setDisplayModeState(mode);
    persistPrefs({ displayMode: mode });
  };

  // ---- Book mutations ----
  const createBook = async (payload: Record<string, unknown>) => {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        folderId: viewMode === "folder" ? currentFolderId : null,
      }),
    });
    if (!res.ok)
      throw new Error((await res.json()).error ?? "Failed to create");
    await fetchData();
  };

  const updateBook = async (id: string, payload: Record<string, unknown>) => {
    const res = await fetch(`/api/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok)
      throw new Error((await res.json()).error ?? "Failed to update");
    await fetchData();
  };

  const deleteBook = async (id: string) => {
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    if (!res.ok)
      throw new Error((await res.json()).error ?? "Failed to delete");
    await fetchData();
  };

  const moveBook = async (id: string, folderId: string | null) => {
    await updateBook(id, { folderId });
  };

  // ---- Folder mutations ----
  const createFolder = async (payload: { name: string; color?: string }) => {
    const res = await fetch("/api/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, parentId: currentFolderId }),
    });
    if (!res.ok)
      throw new Error((await res.json()).error ?? "Failed to create folder");
    await Promise.all([fetchData(), fetchAllFolders()]);
  };

  const updateFolder = async (
    id: string,
    payload: { name?: string; color?: string },
  ) => {
    const res = await fetch(`/api/folders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok)
      throw new Error((await res.json()).error ?? "Failed to update folder");
    await Promise.all([fetchData(), fetchAllFolders()]);
  };

  const deleteFolder = async (id: string) => {
    const res = await fetch(`/api/folders/${id}`, { method: "DELETE" });
    if (!res.ok)
      throw new Error((await res.json()).error ?? "Failed to delete folder");
    await Promise.all([fetchData(), fetchAllFolders()]);
  };

  return {
    viewMode,
    switchViewMode,
    displayMode,
    switchDisplayMode,
    currentFolderId,
    breadcrumb,
    enterFolder,
    goToBreadcrumb,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    folders,
    allFolders,
    books,
    isLoading,
    error,
    createBook,
    updateBook,
    deleteBook,
    moveBook,
    createFolder,
    updateFolder,
    deleteFolder,
  };
}
