// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kōva AI | AI-powered Web Experiences",
  description:
    "Kōva AI builds modern websites, intelligent dashboards, and generative AI tools using Next.js, Firebase, and OpenAI for startups and creators.",
  icons: {
    icon: "/logow.png",
    shortcut: "/logow.png",
    apple: "/logow.png",
  },
  keywords: [
    "Kōva AI",
    "AI Web Development",
    "Next.js Development",
    "Intelligent Dashboards",
    "Generative AI Tools",
    "OpenAI Integration",
    "Firebase Development",
    "Startup Websites",
    "Creator Tools",
    "Web3 Development",
    "AI-powered Websites",
    "Modern Web Experiences",
    "Custom AI Solutions",
    "Web Development Studio",
    "AI Content Generation"
  ],
  authors: [
    {
      name: "Kōva AI",
      url: "https://kovaai.vercel.app",
    },
  ],
  creator: "Kōva AI",
  publisher: "Kōva AI",
  openGraph: {
    title: "Kōva AI | AI-powered Web Experiences",
    description: "Kōva AI builds modern websites, intelligent dashboards, and generative AI tools using Next.js, Firebase, and OpenAI for startups and creators.",
    url: "https://kovaai.vercel.app",
    siteName: "Kōva AI",
    images: [
      {
        url: "https://kovaai.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Kōva AI",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kōva AI | AI-powered Web Experiences",
    description: "Kōva AI builds modern websites, intelligent dashboards, and generative AI tools using Next.js, Firebase, and OpenAI for startups and creators.",
    images: [
      {
        url: "https://kovaai.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Kōva AI",
      },
    ],
    creator: "@kovaai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <SiteHeader />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
