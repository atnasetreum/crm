import type { Metadata } from "next";
import Script from "next/script";

import { Provider } from "./components/providers";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "CRM",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>
          <Provider>{children}</Provider>
        </main>
        <Script src="/service-worker.js" />
      </body>
    </html>
  );
}
