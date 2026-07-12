// src/models/book.model.ts
import { Schema, models, model, Types } from "mongoose";
import { READING_STATUS, type ReadingStatus } from "@/lib/constants/book";

export { READING_STATUS };
export type { ReadingStatus };

export interface IBook {
  _id: Types.ObjectId;

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

  folderId: Types.ObjectId | null;
  tags: string[];
  isFavorite: boolean;

  hasBought: boolean;
  readingStatus: ReadingStatus;

  currentPage: number;
  totalReadingTimes: number;
  startDate?: Date;
  endDate?: Date;
  lastReadDate?: Date;

  rating: number;
  importantNotes: string[];
  review: string;

  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    bookName: { type: String, required: true, trim: true },
    authorName: {
      type: [{ type: String, trim: true }],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one author is required",
      },
    },
    translatorName: { type: [{ type: String, trim: true }], default: [] },
    prokashoni: { type: String, default: "" },
    pages: { type: Number, required: true },
    price: { type: Number, default: 0 },
    category: [{ type: String }],
    edition: { type: String, default: "" },

    pdfUrl: { type: String, required: true },
    coverImageUrl: { type: String, default: "" },
    fileSizeInMB: { type: Number },
    onlineBuyingLinks: [{ type: String }],

    folderId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
    tags: [{ type: String }],
    isFavorite: { type: Boolean, default: false },

    hasBought: { type: Boolean, default: false },
    readingStatus: { type: String, enum: READING_STATUS, default: "To Read" },

    currentPage: { type: Number, default: 0 },
    totalReadingTimes: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    lastReadDate: { type: Date },

    rating: { type: Number, min: 1, max: 10, default: 1 },
    importantNotes: [{ type: String }],
    review: { type: String, default: "" },
  },
  { timestamps: true },
);

BookSchema.index({ folderId: 1 });
BookSchema.index({ readingStatus: 1 });
BookSchema.index({ isFavorite: 1 });
BookSchema.index({ bookName: "text", authorName: "text" });

const Book = models.Book || model<IBook>("Book", BookSchema);
export default Book;
