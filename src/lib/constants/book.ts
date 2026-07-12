// src/lib/constants/book.ts
export const READING_STATUS = [
  "To Read",
  "Reading",
  "Completed",
  "On Hold",
  "Dropped",
] as const;

export type ReadingStatus = (typeof READING_STATUS)[number];
