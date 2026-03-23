import type { Metadata } from "next";
import { DM_Serif_Display, Nunito } from "next/font/google";
import type { ReactNode } from "react";

import { getLocale } from "@/lib/i18n/server";
import "./globals.css";

const headingFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading"
});

const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Baby Life Album",
  description: "A private family album for milestones, memories, and growth tracking."
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${headingFont.variable} ${bodyFont.variable} font-[family-name:var(--font-body)]`}>
        {children}
      </body>
    </html>
  );
}
