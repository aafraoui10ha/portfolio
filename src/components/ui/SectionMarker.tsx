export function SectionMarker({ label }: { label: string }) {
  return (
    <span className="reveal inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
      <span className="h-px w-6 bg-accent" aria-hidden />
      {label}
    </span>
  );
}
