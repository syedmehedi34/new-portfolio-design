// src/types/book.ts
import type { ReadingStatus } from "@/lib/constants/book";

export interface FolderDTO {
  _id: string;
  name: string;
  parentId: string | null;
  color: string;
  order: number;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteDTO {
  _id: string;
  title: string;
  content: string;
}

export interface BookDTO {
  _id: string;
  bookName: string;
  authorName: string[];
  translatorName: string[];
  prokashoni: string;
  pages: number;
  price: number;
  category: string[];
  edition: string;
  pdfUrl: string;
  coverImageUrl: string;
  fileSizeInMB?: number;
  onlineBuyingLinks: string[];
  folderId: string | null;
  tags: string[];
  isFavorite: boolean;
  hasBought: boolean;
  readingStatus: ReadingStatus;
  currentPage: number;
  totalReadingTimes: number;
  startDate?: string;
  endDate?: string;
  lastReadDate?: string;
  rating: number;
  notes: NoteDTO[];
  review: string;
  createdAt: string;
  updatedAt: string;
}
