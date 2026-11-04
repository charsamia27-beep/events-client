import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/nunito";
import "@fontsource-variable/quicksand";
import "@fontsource/galada";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Pashe | Community service events near you", template: "%s | Pashe" },
  description: "Create, join and track community service events in your neighbourhood.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
