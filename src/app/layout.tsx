import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sandesh Apparala - Full Stack Web Developer",
  description:
      "Sandesh is a Full Stack Web Developer with a passion for building web applications and AI Solutions.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
            name="keywords"
            content="Sandesh Apparala, Full Stack Developer, Web Developer, AI Solutions, Next.js Developer"
        />
        <meta name="author" content="Sandesh Apparala" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Sandesh Apparala - Full Stack Web Developer" />
        <meta
            property="og:description"
            content="Sandesh is a Full Stack Web Developer with a passion for building web applications and AI Solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sandesh.io" />
        <meta property="og:image" content="https://sandesh.io/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sandesh Apparala - Full Stack Web Developer" />
        <meta
            name="twitter:description"
            content="Sandesh is a Full Stack Web Developer with a passion for building web applications and AI Solutions."
        />
        <meta name="twitter:image" content="https://sandesh.io/images/og-image.png" />
        <link rel="canonical" href="https://sandesh.io" />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "http://schema.org",
                "@type": "WebSite",
                url: "https://sandesh.io",
                name: "Sandesh Apparala - Full Stack Web Developer",
                description:
                    "Sandesh is a Full Stack Web Developer with a passion for building web applications and AI Solutions.",
                author: {
                  "@type": "Person",
                  name: "Sandesh Apparala",
                },
              }),
            }}
        />
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
        <Analytics />
      </body>
      </html>
  );
}
