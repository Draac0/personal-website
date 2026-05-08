import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { RepoShell } from "./components/RepoShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "abhinav/me",
  description:
    "Engineer / builder. Backend systems, GenAI tooling, side projects. Hyderabad → Remote.",
  metadataBase: new URL("https://abhinavsriram.dev"),
  openGraph: {
    title: "abhinav/me",
    description:
      "Engineer / builder. Backend systems, GenAI tooling, side projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <SmoothScroll>
          <RepoShell>{children}</RepoShell>
        </SmoothScroll>
      </body>
    </html>
  );
}
