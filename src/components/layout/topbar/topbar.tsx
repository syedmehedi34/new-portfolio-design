// src/components/layout/topbar/topbar.tsx
import { ThemeToggle } from "./theme-toggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur px-6">
      <div>
        <h1 className="text-sm font-medium text-muted">Overview</h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {/* এখানে পরে User Avatar / Notification icon যোগ হবে */}
        <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center text-sm font-medium text-accent">
          A
        </div>
      </div>
    </header>
  );
}
