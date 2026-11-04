import type { Metadata } from "next";
import { type ReactNode, Suspense } from "react";
import "@fontsource-variable/nunito";
import "@fontsource-variable/quicksand";
import "@fontsource/galada";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WelcomeToast } from "@/components/layout/WelcomeToast";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: { default: "Pashe | Community service events near you", template: "%s | Pashe" },
  description: "Create, join and track community service events in your neighbourhood.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Suspense>
            <WelcomeToast />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
