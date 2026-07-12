// src/components/ui/rich-text-editor.tsx
"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered, Heading2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Only sync external value in when switching notes, not on every keystroke
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-1 border-b border-border p-1.5">
        <ToolbarButton
          icon={Heading2}
          label="Heading"
          onClick={() => exec("formatBlock", "h3")}
        />
        <ToolbarButton icon={Bold} label="Bold" onClick={() => exec("bold")} />
        <ToolbarButton
          icon={Italic}
          label="Italic"
          onClick={() => exec("italic")}
        />
        <ToolbarButton
          icon={List}
          label="Bullet list"
          onClick={() => exec("insertUnorderedList")}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="Numbered list"
          onClick={() => exec("insertOrderedList")}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("formatBlock", "p")}
          className="ml-auto rounded-md px-2 py-1 text-[11px] text-muted hover:bg-accent/10 hover:text-accent transition-colors"
        >
          Clear format
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        data-placeholder={placeholder}
        className={cn(
          "min-h-[180px] px-3 py-2.5 text-sm outline-none",
          "[&_h3]:mb-1 [&_h3]:mt-1 [&_h3]:text-base [&_h3]:font-semibold",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "empty:before:text-muted empty:before:content-[attr(data-placeholder)]",
        )}
      />
    </div>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      onMouseDown={(e) => e.preventDefault()} // selection ধরে রাখার জন্য, ফোকাস হারানো থেকে বাঁচায়
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-accent/10 hover:text-accent transition-colors"
    >
      <Icon size={14} />
    </button>
  );
}
