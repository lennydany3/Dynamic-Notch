import type { ReactNode } from "react";

/**
 * The eyebrow + display heading pair every section opens with. One component
 * so the mono label, the tracking and the reveal stay identical down the page.
 */
export default function SectionHeading({
  eyebrow,
  children,
  lede,
  size = "md",
  className = "",
}: {
  eyebrow: string;
  children: ReactNode;
  lede?: ReactNode;
  size?: "md" | "xl";
  className?: string;
}) {
  const scale =
    size === "xl"
      ? "text-[clamp(44px,7.4vw,104px)] leading-[0.95] max-w-[11ch]"
      : "text-[clamp(34px,4.6vw,60px)] leading-none";

  return (
    <div data-reveal className={`flex flex-col gap-3.5 ${className}`}>
      <span className="font-mono text-[11px] tracking-[0.08em] text-[var(--accent-bright)] uppercase">
        {eyebrow}
      </span>
      <h2
        className={`m-0 font-display font-semibold tracking-[-0.04em] text-balance ${scale}`}
      >
        {children}
      </h2>
      {lede && (
        <p className="mt-1.5 max-w-[520px] text-[18px] leading-[1.55] text-pretty text-[var(--text-secondary)]">
          {lede}
        </p>
      )}
    </div>
  );
}
