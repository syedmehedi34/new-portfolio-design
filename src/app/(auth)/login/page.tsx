// src/app/(auth)/login/page.tsx

import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import { AuthDivider } from "@/components/auth/auth-divider";
import Logo from "@/components/ui/logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center py-10">
      <div className="w-full max-w-md space-y-8 ">
        {/* Logo */}
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Logo className="w-50" />
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
          <div className="space-y-5">
            <LoginForm />

            <AuthDivider />

            <GoogleSignInButton />
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-accent transition-colors hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
