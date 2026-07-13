// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import type { UserRole } from "@/models/user.model";

// Route → allowed roles mapping.
// Notun admin/protected route add korte shudhu ekhane entry দাও।
const roleProtectedRoutes: { path: string; roles: UserRole[] }[] = [
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
    // Middleware-er route protection logic — proti request-e run hoy
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");
      const isAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      // Protected route-e login chara access korle → login page-e pathao,
      // callbackUrl save kore rakho jate login-er por original page-e ferot jay
      if (isProtectedRoute && !isLoggedIn) {
        const redirectUrl = new URL("/login", nextUrl);
        redirectUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(redirectUrl);
      }

      // Already logged in obosthay login/register page-e gele dashboard-e pathao
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Role-based access check — logged in thakle
      if (isLoggedIn) {
        const matchedRule = roleProtectedRoutes.find((rule) =>
          nextUrl.pathname.startsWith(rule.path),
        );

        // Route protected ar user-er role allowed list-e na thakle → unauthorized
        if (matchedRule && !matchedRule.roles.includes(auth.user.role)) {
          return Response.redirect(new URL("/unauthorized", nextUrl));
        }
      }

      return true;
    },

    // Edge runtime-e (middleware) ei session callback-i actually use hoy.
    // auth.ts-er session callback eikhane kaj kore na, karon middleware
    // shudhu ei auth.config.ts diye toiri kora lightweight instance use kore.
    // DB touch kora jabe na (mongodb/bcrypt edge-e import kora jay na),
    // tai shudhu already-encoded JWT token theke value copy kore
    // session.user object-e boshano hocche.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
