/** A hairline that pinches round a tiny pill, the notch as a section break. */
export default function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto flex w-full max-w-[1200px] items-center px-6"
    >
      <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09))]" />
      <div className="h-[14px] w-14 rounded-[var(--r-pill)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.09),transparent)]" />
    </div>
  );
}
