import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: "Kōva AI | AI-powered Web Experiences",
  description:
    "Kōva AI builds modern websites, intelligent dashboards, and generative AI tools using Next.js, Firebase, and OpenAI for startups and creators.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Kōva AI | AI-powered Web Experiences",
    description: "Kōva AI builds modern websites, intelligent dashboards, and generative AI tools using Next.js, Firebase, and OpenAI for startups and creators.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kōva AI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kōva AI | AI-powered Web Experiences",
    description: "Kōva AI builds modern websites, intelligent dashboards, and generative AI tools using Next.js, Firebase, and OpenAI for startups and creators.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
