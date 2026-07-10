// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Route → allowed roles mapping. Notun admin route add korte shudhu ekhane entry দাও।
const roleProtectedRoutes: { path: string; roles: string[] }[] = [
  { path: "/dashboard/admin", roles: ["admin"] },
];

export default {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");
      const isAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      if (isProtectedRoute && !isLoggedIn) {
        const redirectUrl = new URL("/login", nextUrl);
        redirectUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(redirectUrl);
      }

      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Role-based check
      if (isLoggedIn) {
        const matchedRule = roleProtectedRoutes.find((rule) =>
          nextUrl.pathname.startsWith(rule.path),
        );

        if (matchedRule && !matchedRule.roles.includes(auth.user.role)) {
          return Response.redirect(new URL("/unauthorized", nextUrl));
        }
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
