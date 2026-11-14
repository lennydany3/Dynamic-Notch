import { useId } from "react";

/**
 * The flat Crest mark, drawn as vector so it is razor sharp from the 24px nav
 * tile to a 400px poster, and so the server ships it as markup rather than a
 * network request.
 *
 * Built in layers, back to front:
 *   1. the tile, a diagonal indigo gradient (lighter top-left, near-black
 *      bottom-right) so the plate reads as a lit object rather than a flat swatch
 *   2. a top sheen, a white-to-clear wash over the upper half
 *   3. a specular bloom pinned top-left, the same highlight the 3D mark's
 *      face carries, so the two marks are visibly the same object
 *   4. an inset hairline whose stroke fades from lit (top) to nothing (bottom),
 *      which is what makes the edge look machined instead of outlined
 *   5. the "C", stroked with a vertical white-to-lavender gradient and lifted
 *      off the tile by a soft contact shadow
 *
 * Gradient ids come from `useId` because this renders many times per page (nav,
 * footer, hero, CTA) and duplicate ids resolve to the *first* definition in the
 * document, so a second copy at another size would borrow the first's
 * user-space coordinates.
 */
const GLYPH =
  "M68.5 36.5C69 27 60 22.5 50.5 25.5C38 29.5 30 45 30.5 57C31 69 41 76 54 72.5C59 71 63 68 66 64.5";

export default function CrestMark({
  size = 28,
  className,
  title,
}: {
  size?: number;
  className?: string;
  /** Omit for a decorative mark (next to a wordmark); set it when the mark stands alone. */
  title?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${uid}-${name}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: "block", flex: "none" }}
    >
      <defs>
        <linearGradient
          id={id("tile")}
          x1="14"
          y1="0"
          x2="86"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4a3bf0" />
          <stop offset="0.5" stopColor="#1800ad" />
          <stop offset="1" stopColor="#070046" />
        </linearGradient>
        <linearGradient id={id("sheen")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("spec")} cx="0.22" cy="0.12" r="0.62">
          <stop offset="0" stopColor="#b0a8ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#b0a8ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.42" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#8c82ff" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={id("glyph")} x1="0" y1="20" x2="0" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d4cfff" />
        </linearGradient>
        <filter id={id("lift")} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="2.4" stdDeviation="2.2" floodColor="#05002e" floodOpacity="0.6" />
        </filter>
        <clipPath id={id("clip")}>
          <rect width="100" height="100" rx="23" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id("clip")})`}>
        <rect width="100" height="100" fill={`url(#${id("tile")})`} />
        <rect width="100" height="100" fill={`url(#${id("sheen")})`} />
        <rect width="100" height="100" fill={`url(#${id("spec")})`} />
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        rx="22.5"
        fill="none"
        stroke={`url(#${id("rim")})`}
        strokeWidth="1"
      />

      <g filter={`url(#${id("lift")})`}>
        <path
          d={GLYPH}
          transform="translate(50 50) scale(1.1) translate(-50 -48.5)"
          fill="none"
          stroke={`url(#${id("glyph")})`}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export { GLYPH as CREST_GLYPH };
