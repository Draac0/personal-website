import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { posts, categoryLabels } from "../../data/posts";
import { photoBySlug } from "../../data/photos";

const SHA_CHARS = "abcdef0123456789";
function makeSha(seed: string) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  let out = "";
  for (let i = 0; i < 7; i++) {
    s = (s * 9301 + 49297) >>> 0;
    out += SHA_CHARS[s % SHA_CHARS.length];
  }
  return out;
}

const CATEGORY_EXT: Record<string, string> = {
  engineering: "ts",
  build: "ts",
  career: "md",
  hackathon: "md",
  books: "md",
  personal: "md",
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — abhinav/me`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;
  const ext = CATEGORY_EXT[post.category];
  const sha = makeSha(post.slug);
  const lineCount = post.body.split("\n").length;
  const byteCount = new Blob([post.body]).size;
  const cover = photoBySlug.get(post.slug);

  return (
    <main className="relative z-10 pt-6 sm:pt-10">
      <article className="px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto pb-20">
        <nav className="flex items-center gap-2.5 mb-6 font-mono text-xs text-text-muted overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-accent transition-colors">
            abhinav/me
          </Link>
          <span className="text-text-faint">/</span>
          <Link href="/writing" className="hover:text-accent transition-colors">
            posts
          </Link>
          <span className="text-text-faint">/</span>
          <span className="text-text">
            {post.slug}.{ext}
          </span>
        </nav>

        <div className="glass overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-white/5 bg-bg-elevated/40 flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-sm text-[9px] ${
                ext === "ts"
                  ? "bg-accent-cool/15 text-accent-cool border border-accent-cool/30"
                  : "bg-accent/15 text-accent border border-accent/30"
              }`}
            >
              {ext}
            </span>
            <span className="text-text-muted">{post.slug}.{ext}</span>
            <span className="text-text-faint">·</span>
            <span className="sha">{sha}</span>
            <span className="text-text-faint">·</span>
            <span className="text-text-faint">
              {lineCount} lines · {byteCount} bytes
            </span>
            <span className="flex-1" />
            <a
              href={post.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-text-muted hover:text-accent transition-colors uppercase tracking-[0.15em]"
            >
              raw on linkedin →
            </a>
          </div>

          {cover && (
            <div className="relative w-full aspect-[2/1] sm:aspect-[2.4/1] bg-bg-elevated overflow-hidden border-b border-white/5">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 px-4 py-2 bg-linear-to-t from-bg/95 via-bg/60 to-transparent font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {cover.caption}
              </div>
            </div>
          )}

          <header className="px-7 sm:px-10 pt-9 pb-7 border-b border-white/5">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] mb-4">
              <span className="px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30">
                {categoryLabels[post.category]}
              </span>
              <span className="text-text-faint">{post.year}</span>
              <span className="text-text-faint">·</span>
              <span className="text-text-muted">{post.likes} ❤</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight gradient-text leading-[1.05] mb-4">
              {post.title}
            </h1>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-3xl">
              {post.summary}
            </p>
          </header>

          <div className="px-7 sm:px-10 py-9 md-content text-text leading-[1.75] text-[17px] space-y-5 whitespace-pre-line max-w-3xl">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {post.hashtags.length > 0 && (
            <div className="px-7 sm:px-10 pb-9 flex flex-wrap gap-1.5">
              {post.hashtags.map((h) => (
                <span
                  key={h}
                  className="font-mono text-[11px] text-text-faint border border-line px-2 py-1 rounded"
                >
                  #{h}
                </span>
              ))}
            </div>
          )}
        </div>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/writing/${prev.slug}`}
              className="glass group p-5 hover:border-accent/40 transition-colors"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint mb-1.5">
                ← previous
              </div>
              <div className="text-text group-hover:text-accent transition-colors text-sm">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/writing/${next.slug}`}
              className="glass group p-5 hover:border-accent/40 transition-colors text-right"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint mb-1.5">
                next →
              </div>
              <div className="text-text group-hover:text-accent transition-colors text-sm">
                {next.title}
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </nav>
      </article>
    </main>
  );
}
