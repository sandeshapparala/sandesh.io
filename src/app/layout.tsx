import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { PortfolioAnalytics } from "@/components/portfolio/portfolio-analytics";
import { siteConfig } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
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
  themeColor: "#F7F5F1",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <PortfolioAnalytics />
      </body>
    </html>
  );
}
