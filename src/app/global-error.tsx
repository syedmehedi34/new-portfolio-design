// src/app/global-error.tsx
"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Critical Error</h1>
            <p className="text-sm text-gray-500 max-w-sm">
              The application encountered a critical error. Please refresh the
              page.
            </p>
          </div>
          <button
            onClick={reset}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
