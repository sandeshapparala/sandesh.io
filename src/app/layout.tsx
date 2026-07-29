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
  title: "Sandesh Apparala | AI-Powered Advantage Partner",
  description:
      "Sandesh Apparala builds modern web platforms and AI integrations that automate workflows, streamline operations, and give your brand a decisive competitive edge.",
  icons: {
    icon: "/logow.png",
  },
    keywords: [
        "Sandesh Apparala",
        "AI-powered web development",
        "Next.js developer",
        "AI integration specialist",
        "OpenAI developer",
        "Generative AI",
        "Web development for startups",
        "AI advantage partner",
        "Full-stack AI developer",
    ],
    authors: [
        {
        name: "Sandesh Apparala",
        url: "https://sandesh.io",
        },
    ],
    creator: "Sandesh Apparala",
    publisher: "Sandesh Apparala",

  openGraph: {
    title: "Sandesh Apparala | AI-Powered Advantage Partner",
    description: "Sandesh Apparala builds modern web platforms and AI integrations that automate workflows, streamline operations, and give your brand a decisive competitive edge.",
    images: [
      {
        url: "https://kovaai.sandesh.io/og.png",
        width: 1200,
        height: 630,
        alt: "Sandesh Apparala",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandesh Apparala | AI-Powered Advantage Partner",
    description: "Sandesh Apparala builds modern web platforms and AI integrations that automate workflows, streamline operations, and give your brand a decisive competitive edge.",
    images: [
      {
        url: "https://kovaai.sandesh.io/og.png",
        width: 1200,
        height: 630,
        alt: "Sandesh Apparala",
        }
    ],
    creator: "@SandeshApparala",
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
