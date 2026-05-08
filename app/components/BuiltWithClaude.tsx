export function BuiltWithClaude() {
  return (
    <div className="px-4 sm:px-8 lg:px-12 pt-6 pb-12 text-center font-mono text-xs text-text-muted">
      Built with{" "}
      <a
        href="https://claude.com/claude-code"
        target="_blank"
        rel="noreferrer"
        className="text-accent hover:underline"
      >
        Claude
      </a>
      {" "}<span className="text-red-500">♥</span>
    </div>
  );
}
