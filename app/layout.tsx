import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import { SiteChrome } from "@/components/layout/site-chrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://raimqulovmaktabi.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Raxmatulla Rayimqulov nomidagi umumiy o'rta ta'lim maktabi",
    template: "%s | R. Rayimqulov nomidagi maktab",
  },
  description:
    "Raxmatulla Rayimqulov nomidagi umumiy o'rta ta'lim maktabining rasmiy veb-sayti. Bilim, tarbiya va kelajak uchun ishonchli maskan. Yangiliklar, qabul, o'qituvchilar va dars jadvali.",
  keywords: [
    "Raxmatulla Rayimqulov maktabi",
    "raimqulovmaktabi",
    "maktab",
    "umumiy o'rta ta'lim",
    "O'zbekiston maktabi",
    "qabul",
    "o'quvchilar",
  ],
  authors: [{ name: "R. Rayimqulov nomidagi maktab" }],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: siteUrl,
    siteName: "Raxmatulla Rayimqulov nomidagi maktab",
    title: "Raxmatulla Rayimqulov nomidagi umumiy o'rta ta'lim maktabi",
    description:
      "Bilim, tarbiya va kelajak uchun ishonchli maskan. Maktabimizning rasmiy veb-sayti.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raxmatulla Rayimqulov nomidagi maktab",
    description: "Bilim, tarbiya va kelajak uchun ishonchli maskan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen font-sans">
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
