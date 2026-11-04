"use client";

import { ThemeProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      closeButton
      position="top-right"
      richColors
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      {children}
      <ThemedToaster />
    </ThemeProvider>
  );
}
