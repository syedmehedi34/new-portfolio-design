// src/lib/auth-guard.ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { UserRole } from "@/models/user.model";

export async function requireRole(allowedRoles: UserRole[]) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/unauthorized");
  }

  return session;
}

/*
  src/auth.config.ts
  src/app/dashboard/reports/page.tsx
*/
