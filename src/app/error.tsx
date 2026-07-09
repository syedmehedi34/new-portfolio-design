// src/app/error.tsx
"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Production e ekhane Sentry/LogRocket er moto error tracking service e pathiye dite hobe
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <AlertTriangle size={40} className="text-red-500" />
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted max-w-sm">
          An unexpected error occurred. Please try again, or contact support if
          the problem persists.
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
