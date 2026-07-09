// src/app/unauthorized/page.tsx
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <ShieldAlert size={40} className="mx-auto text-red-500" />
        <h1 className="text-xl font-semibold">Access Denied</h1>
        <p className="text-sm text-muted">
          You don&apos;t have permission to view this page.
        </p>
        <Link
          href="/dashboard"
          className="text-accent text-sm font-medium hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
