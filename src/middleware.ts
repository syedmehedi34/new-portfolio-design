// src/middleware.ts
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Static file, image, api/auth route bade sob route e middleware চলবে
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|ico)$).*)",
  ],
};

// roll based control need to implement
