// src/app/(auth)/login/page.tsx
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import { AuthDivider } from "@/components/auth/auth-divider";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted">
          Sign in to your account to continue
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 space-y-5">
        <LoginForm />
        <AuthDivider />
        <GoogleSignInButton />
      </div>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-accent font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
