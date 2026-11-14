import CrestMark from "./CrestMark";
import { site } from "@/lib/site";

/**
 * The mark plus, optionally, the wordmark. Both are server-rendered vector:
 * the mark is `CrestMark`, the wordmark is live text in the display face, so
 * neither costs an image request and both are crisp at any density.
 */
export default function Logo({
  size = 28,
  withWordmark = true,
  className = "",
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <CrestMark
        size={size}
        title={withWordmark ? undefined : `${site.name} logo`}
        className="drop-shadow-[0_2px_10px_rgba(24,0,173,0.7)]"
      />
      {withWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-[-0.02em]">
          {site.name}
        </span>
      )}
    </span>
  );
}
