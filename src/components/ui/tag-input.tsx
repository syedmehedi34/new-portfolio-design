// src/components/ui/tag-input.tsx
"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function TagInput({
  label,
  values,
  onChange,
  placeholder,
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const trimmed = draft.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setDraft("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-2 focus-within:border-accent transition-colors">
        {values.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(values.filter((v) => v !== tag))}
            >
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={values.length ? "" : placeholder}
          className="min-w-[100px] flex-1 bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}
