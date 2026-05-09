import type { Metadata } from "next";
import { posts, postsByCategory, categoryLabels, type PostCategory } from "../data/posts";
import { WritingArchive } from "../components/WritingArchive";

export const metadata: Metadata = {
  title: "posts",
  description:
    "Engineering stories, hackathon journals, book notes, and consumer rants — 29 entries.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "posts · abhinav/me",
    description:
      "Engineering stories, hackathon journals, book notes, and consumer rants.",
    url: "/writing",
    type: "website",
  },
};

export default function WritingPage() {
  const categories = Object.keys(postsByCategory) as PostCategory[];
  const counts = Object.fromEntries(
    categories.map((c) => [c, postsByCategory[c].length])
  ) as Record<PostCategory, number>;

  return (
    <main className="relative z-10 pt-6 sm:pt-10">
      <WritingArchive
        posts={posts}
        categories={categories}
        labels={categoryLabels}
        counts={counts}
      />
    </main>
  );
}
