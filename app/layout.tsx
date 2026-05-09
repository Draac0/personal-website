import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { RepoShell } from "./components/RepoShell";
import { fetchContributions, PRIMARY_USERNAME } from "./lib/github";
import { profile } from "./data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://abhisriram.com";
const SITE_TITLE = "abhinav/me";
const SITE_DESCRIPTION =
  "Fullstack engineer — GenAI tooling, backend systems, and the occasional side quest. Hyderabad → Remote.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s · abhinav/me" },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Abhinav Sriram", url: SITE_URL }],
  keywords: [
    "Abhinav Sriram",
    "fullstack engineer",
    "GenAI",
    "LangGraph",
    "LangChain",
    "backend systems",
    "Boston Bioprocess",
    "Whitecarrot",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contribs = await fetchContributions(PRIMARY_USERNAME);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.current,
    description: SITE_DESCRIPTION,
    sameAs: [profile.links.github, profile.links.linkedin],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="me" href={profile.links.github} />
        <link rel="me" href={profile.links.linkedin} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        <SmoothScroll>
          <RepoShell contribTotal={contribs.total}>{children}</RepoShell>
        </SmoothScroll>
      </body>
    </html>
  );
}
