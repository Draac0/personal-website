export type FileNode = {
  type: "file" | "folder";
  name: string;
  ext?: string;
  href?: string;
  children?: FileNode[];
  meta?: string;
};

export const repo = {
  owner: "abhinav",
  name: "me",
  branch: "main",
  description: "fullstack engineer @ boston bioprocess (us)",
  topics: ["typescript", "nestjs", "postgres", "aws", "langchain", "react", "fastapi"],
};

export const tree: FileNode[] = [
  { type: "file", name: "README", ext: "md", href: "/#readme", meta: "overview" },
  { type: "file", name: "about", ext: "md", href: "/#about", meta: "bio" },
  {
    type: "folder",
    name: "experience",
    href: "/#work",
    meta: "git log",
    children: [
      { type: "file", name: "boston-bioprocess", ext: "md", href: "/#work" },
      { type: "file", name: "whitecarrot", ext: "md", href: "/#work" },
      { type: "file", name: "course-hero", ext: "md", href: "/#work" },
    ],
  },
  {
    type: "folder",
    name: "posts",
    href: "/writing",
    meta: "29 items",
    children: [],
  },
  {
    type: "folder",
    name: "photos",
    href: "/#photos",
    meta: "field notes",
    children: [],
  },
  { type: "file", name: "CONTACT", ext: "md", href: "/#contact" },
  { type: "file", name: "LICENSE", ext: "md", meta: "MIT" },
];
