// src/app/(auth)/register/page.tsx
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import { AuthDivider } from "@/components/auth/auth-divider";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted">
          Get started, it only takes a minute
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 space-y-5">
        <RegisterForm />
        <AuthDivider />
        <GoogleSignInButton />
      </div>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-accent font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
