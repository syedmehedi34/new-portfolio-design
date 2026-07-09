// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Home</h1>
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        Go to Dashboard
      </Link>
      <Link href="/login" className="text-blue-500 hover:underline">
        Login
      </Link>
      <Link href="/register" className="text-blue-500 hover:underline">
        Register
      </Link>
    </div>
  );
}
