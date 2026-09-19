import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sandesh · Agent service",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui",
          margin: 0,
          background: "#f7f9fc",
          color: "#17263c",
        }}
      >
        {children}
      </body>
    </html>
  );
}
