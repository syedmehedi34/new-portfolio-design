// src/providers/index.tsx
"use client";

import { ThemeProvider } from "./theme-provider";

// ভবিষ্যতে SessionProvider (Auth.js), QueryClientProvider ইত্যাদি
// এখানে এসে যোগ হবে - app/layout.tsx touch করা লাগবে না
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
