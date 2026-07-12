/* eslint-disable react-hooks/set-state-in-effect */
// src/components/books/book-form-dialog.tsx
"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { TagInput } from "@/components/ui/tag-input";
import { READING_STATUS, type ReadingStatus } from "@/lib/constants/book";
import type { BookDTO } from "@/types/book";
import { cn } from "@/lib/utils";

interface BookFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  book: BookDTO | null;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
}

interface FormState {
  bookName: string;
  authorName: string[];
  translatorName: string[];
  prokashoni: string;
  pages: string;
  price: string;
  category: string[];
  edition: string;
  pdfUrl: string;
  coverImageUrl: string;
  fileSizeInMB: string;
  onlineBuyingLinks: string[];
  tags: string[];
  isFavorite: boolean;
  hasBought: boolean;
  readingStatus: ReadingStatus;
  currentPage: string;
  totalReadingTimes: string;
  startDate: string;
  endDate: string;
  lastReadDate: string;
  rating: string;
  importantNotes: string[];
  review: string;
}

const EMPTY_FORM: FormState = {
  bookName: "",
  authorName: [],
  translatorName: [],
  prokashoni: "",
  pages: "",
  price: "",
  category: [],
  edition: "",
  pdfUrl: "",
  coverImageUrl: "",
  fileSizeInMB: "",
  onlineBuyingLinks: [],
  tags: [],
  isFavorite: false,
  hasBought: false,
  readingStatus: "To Read" as ReadingStatus,
  currentPage: "0",
  totalReadingTimes: "0",
  startDate: "",
  endDate: "",
  lastReadDate: "",
  rating: "1",
  importantNotes: [],
  review: "",
};

const TABS = ["মূল তথ্য", "লিংক ও ফাইল", "ট্র্যাকিং", "নোট ও রিভিউ"] as const;

function toDateInput(value?: string) {
  return value ? value.slice(0, 10) : "";
}

export function BookFormDialog({
  isOpen,
  onClose,
  book,
  onSubmit,
}: BookFormDialogProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setTab(TABS[0]);
    setError(null);
    if (book) {
      setForm({
        bookName: book.bookName,
        authorName: book.authorName,
        translatorName: book.translatorName,
        prokashoni: book.prokashoni,
        pages: String(book.pages),
        price: String(book.price),
        category: book.category,
        edition: book.edition,
        pdfUrl: book.pdfUrl,
        coverImageUrl: book.coverImageUrl,
        fileSizeInMB: book.fileSizeInMB ? String(book.fileSizeInMB) : "",
        onlineBuyingLinks: book.onlineBuyingLinks,
        tags: book.tags,
        isFavorite: book.isFavorite,
        hasBought: book.hasBought,
        readingStatus: book.readingStatus,
        currentPage: String(book.currentPage),
        totalReadingTimes: String(book.totalReadingTimes),
        startDate: toDateInput(book.startDate),
        endDate: toDateInput(book.endDate),
        lastReadDate: toDateInput(book.lastReadDate),
        rating: String(book.rating),
        importantNotes: book.importantNotes,
        review: book.review,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [isOpen, book]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.bookName.trim()) {
      setTab(TABS[0]);
      setError("বইয়ের নাম আবশ্যক");
      return;
    }
    if (form.authorName.length === 0) {
      setTab(TABS[0]);
      setError("অন্তত একজন লেখক দিন");
      return;
    }
    if (!form.pdfUrl.trim()) {
      setTab(TABS[1]);
      setError("Google Drive লিংক আবশ্যক");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        bookName: form.bookName.trim(),
        authorName: form.authorName,
        translatorName: form.translatorName,
        prokashoni: form.prokashoni,
        pages: Number(form.pages) || 0,
        price: Number(form.price) || 0,
        category: form.category,
        edition: form.edition,
        pdfUrl: form.pdfUrl.trim(),
        coverImageUrl: form.coverImageUrl.trim(),
        fileSizeInMB: form.fileSizeInMB ? Number(form.fileSizeInMB) : undefined,
        onlineBuyingLinks: form.onlineBuyingLinks,
        tags: form.tags,
        isFavorite: form.isFavorite,
        hasBought: form.hasBought,
        readingStatus: form.readingStatus,
        currentPage: Number(form.currentPage) || 0,
        totalReadingTimes: Number(form.totalReadingTimes) || 0,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
        lastReadDate: form.lastReadDate || undefined,
        rating: Number(form.rating) || 1,
        importantNotes: form.importantNotes,
        review: form.review,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent transition-colors";
  const labelClass = "mb-1.5 block text-xs font-medium text-muted";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={book ? "বই এডিট করুন" : "নতুন বই যোগ করুন"}
      maxWidth="max-w-2xl"
    >
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              tab === t
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-500">
            {error}
          </div>
        )}

        {tab === "মূল তথ্য" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>বইয়ের নাম *</label>
              <input
                value={form.bookName}
                onChange={(e) => update("bookName", e.target.value)}
                className={inputClass}
                autoFocus
              />
            </div>
            <div className="sm:col-span-2">
              <TagInput
                label="লেখক(গণ) *"
                values={form.authorName}
                onChange={(v) => update("authorName", v)}
                placeholder="নাম লিখে Enter চাপুন"
              />
            </div>
            <div className="sm:col-span-2">
              <TagInput
                label="অনুবাদক"
                values={form.translatorName}
                onChange={(v) => update("translatorName", v)}
                placeholder="নাম লিখে Enter চাপুন"
              />
            </div>
            <div>
              <label className={labelClass}>প্রকাশনী</label>
              <input
                value={form.prokashoni}
                onChange={(e) => update("prokashoni", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>সংস্করণ (Edition)</label>
              <input
                value={form.edition}
                onChange={(e) => update("edition", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>মোট পৃষ্ঠা</label>
              <input
                type="number"
                min={0}
                value={form.pages}
                onChange={(e) => update("pages", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>মূল্য (৳)</label>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <TagInput
                label="ক্যাটাগরি"
                values={form.category}
                onChange={(v) => update("category", v)}
                placeholder="যেমন: তাফসীর, ফিকহ..."
              />
            </div>
          </div>
        )}

        {tab === "লিংক ও ফাইল" && (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>Google Drive PDF লিংক *</label>
              <input
                value={form.pdfUrl}
                onChange={(e) => update("pdfUrl", e.target.value)}
                className={inputClass}
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div>
              <label className={labelClass}>কভার ইমেজ লিংক</label>
              <input
                value={form.coverImageUrl}
                onChange={(e) => update("coverImageUrl", e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className={labelClass}>ফাইল সাইজ (MB)</label>
              <input
                type="number"
                min={0}
                value={form.fileSizeInMB}
                onChange={(e) => update("fileSizeInMB", e.target.value)}
                className={inputClass}
              />
            </div>
            <TagInput
              label="অনলাইন কেনার লিংক"
              values={form.onlineBuyingLinks}
              onChange={(v) => update("onlineBuyingLinks", v)}
              placeholder="লিংক দিয়ে Enter চাপুন"
            />
          </div>
        )}

        {tab === "ট্র্যাকিং" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Reading Status</label>
              <select
                value={form.readingStatus}
                onChange={(e) =>
                  update("readingStatus", e.target.value as ReadingStatus)
                }
                className={inputClass}
              >
                {READING_STATUS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>রেটিং (১-১০)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={form.rating}
                onChange={(e) => update("rating", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>বর্তমানে যে পৃষ্ঠায় আছি</label>
              <input
                type="number"
                min={0}
                value={form.currentPage}
                onChange={(e) => update("currentPage", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>মোট কতবার পড়া হয়েছে</label>
              <input
                type="number"
                min={0}
                value={form.totalReadingTimes}
                onChange={(e) => update("totalReadingTimes", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>শুরুর তারিখ</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>শেষ করার তারিখ</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>সর্বশেষ পড়া তারিখ</label>
              <input
                type="date"
                value={form.lastReadDate}
                onChange={(e) => update("lastReadDate", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.hasBought}
                  onChange={(e) => update("hasBought", e.target.checked)}
                  className="accent-accent"
                />
                কিনেছি
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFavorite}
                  onChange={(e) => update("isFavorite", e.target.checked)}
                  className="accent-accent"
                />
                ফেভারিট
              </label>
            </div>
          </div>
        )}

        {tab === "নোট ও রিভিউ" && (
          <div className="space-y-4">
            <TagInput
              label="গুরুত্বপূর্ণ নোট"
              values={form.importantNotes}
              onChange={(v) => update("importantNotes", v)}
              placeholder="নোট লিখে Enter চাপুন"
            />
            <div>
              <label className={labelClass}>রিভিউ</label>
              <textarea
                value={form.review}
                onChange={(e) => update("review", e.target.value)}
                rows={5}
                className={inputClass}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2 border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
          >
            বাতিল
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-accent py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isSubmitting ? "সেভ হচ্ছে..." : book ? "আপডেট করুন" : "যোগ করুন"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
