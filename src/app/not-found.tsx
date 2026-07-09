// src/app/not-found.tsx
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <FileQuestion size={40} className="text-muted" />
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Page not found</h1>
        <p className="text-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

/*

import { notFound } from "next/navigation";

export default async function SomePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getData(id);

  if (!data) {
    notFound(); // ei call ta korle nikotstho not-found.tsx render hobe
  }

  return <div>{/* ... *./}</div>;
}

*/
