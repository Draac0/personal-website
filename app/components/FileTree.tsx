"use client";

import Link from "next/link";
import { useState } from "react";
import { tree, type FileNode } from "../data/site-tree";

const ICONS: Record<string, string> = {
  md: "M",
  ts: "T",
  cpp: "C",
  yaml: "Y",
};

function FileIcon({ ext }: { ext?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 rounded-sm font-mono text-[8px] ${
        ext === "md"
          ? "bg-accent/15 text-accent border border-accent/30"
          : ext === "ts"
            ? "bg-accent-cool/15 text-accent-cool border border-accent-cool/30"
            : ext === "cpp"
              ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
              : "bg-text-faint/15 text-text-faint border border-text-faint/30"
      }`}
    >
      {ext ? ICONS[ext] ?? ext[0].toUpperCase() : "F"}
    </span>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={`text-text-muted transition-transform ${open ? "" : "rotate-0"}`}
    >
      <path
        d={
          open
            ? "M2 3h4l1 1h7v9H2zm.5 1.5v7h11V5H6.5L5.5 4h-3z"
            : "M2 3h4l1 1h7v9H2z"
        }
      />
    </svg>
  );
}

function Node({
  node,
  depth = 0,
  onNavigate,
}: {
  node: FileNode;
  depth?: number;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(true);
  const indent = depth * 12;

  if (node.type === "folder") {
    const hasChildren = !!node.children && node.children.length > 0;
    const folderInner = (
      <>
        <FolderIcon open={open} />
        <span className="font-mono text-[12px] text-text">{node.name}/</span>
        {node.meta && (
          <span className="ml-auto font-mono text-[10px] text-text-faint">
            {node.meta}
          </span>
        )}
      </>
    );

    // No children → behave as a nav link (e.g. posts/, photos/).
    if (!hasChildren && node.href) {
      return (
        <Link
          href={node.href}
          onClick={onNavigate}
          className="group w-full flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5 transition-colors text-left"
          style={{ paddingLeft: 8 + indent }}
        >
          {folderInner}
        </Link>
      );
    }

    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="group w-full flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5 transition-colors text-left"
          style={{ paddingLeft: 8 + indent }}
        >
          {folderInner}
        </button>
        {open && hasChildren && (
          <div>
            {node.children!.map((c, i) => (
              <Node key={i} node={c} depth={depth + 1} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const label = `${node.name}${node.ext ? `.${node.ext}` : ""}`;
  const inner = (
    <>
      <FileIcon ext={node.ext} />
      <span className="font-mono text-[12px] text-text-muted group-hover:text-accent transition-colors truncate">
        {label}
      </span>
      {node.meta && (
        <span className="ml-auto font-mono text-[10px] text-text-faint">
          {node.meta}
        </span>
      )}
    </>
  );

  return node.href ? (
    <Link
      href={node.href}
      onClick={onNavigate}
      className="group flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5 transition-colors"
      style={{ paddingLeft: 8 + indent }}
    >
      {inner}
    </Link>
  ) : (
    <div
      className="group flex items-center gap-2 py-1 px-2 opacity-60"
      style={{ paddingLeft: 8 + indent }}
    >
      {inner}
    </div>
  );
}

export function FileTree({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        />
      )}
      <aside
        className={`fixed md:sticky top-12 left-0 z-40 md:z-auto h-[calc(100vh-3rem)] w-64 md:w-56 lg:w-64 shrink-0 transition-transform md:transition-none ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:translate-x-0 border-r border-line bg-bg/85 backdrop-blur-xl`}
      >
        <div className="px-3 py-3 border-b border-line">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
            tree · main
          </div>
        </div>
        <nav className="overflow-y-auto h-[calc(100%-44px)] py-2">
          {tree.map((n, i) => (
            <Node key={i} node={n} onNavigate={onClose} />
          ))}
        </nav>
      </aside>
    </>
  );
}
