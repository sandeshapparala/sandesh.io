import type { Metadata, Viewport } from "next";
import {
  Geist_Mono,
  Manrope,
  Syne,
} from "next/font/google";
import "./globals.css";
import { PortfolioAnalytics } from "@/components/portfolio/portfolio-analytics";
import { siteConfig } from "@/content/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sandesh — WhatsApp AI sales agents for real estate developers",
    template: "%s | Sandesh",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.company,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Sandesh — WhatsApp AI sales agents for real estate developers",
    description: siteConfig.description,
    images: [
      {
        url: "/api/og/home",
        width: 1200,
        height: 630,
        alt: "Sandesh builds WhatsApp AI sales agents for real estate developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandesh — WhatsApp AI sales agents for real estate developers",
    description: siteConfig.description,
    images: ["/api/og/home"],
    creator: "@SandeshApparala",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F5F9" },
    { media: "(prefers-color-scheme: dark)", color: "#060A11" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${geistMono.variable} ${syne.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <PortfolioAnalytics enabled={Boolean(process.env.VERCEL)} />
      </body>
    </html>
  );
}
