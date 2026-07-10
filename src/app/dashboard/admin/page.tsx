// src/app/dashboard/admin/page.tsx
import { requireRole } from "@/lib/auth-guard";

export default async function AdminPage() {
  const session = await requireRole(["admin"]);

  return <div>Welcome, {session.user.name}</div>;
}
