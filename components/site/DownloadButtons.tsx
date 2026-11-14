import SendLink from "./SendLink";
import { site } from "@/lib/site";

/**
 * The two ways to get Crest, shared by the hero and the closing call to
 * action so they can never drift apart.
 *
 * Desktop and mobile are both in the server HTML and a breakpoint picks one,
 * rather than a client-side `isMobile` flag deciding after hydration, which
 * would flash the wrong button on first paint.
 */
export function StoreBadge() {
  return (
    <a
      href={site.store}
      target="_blank"
      rel="noopener noreferrer"
      className="pop flex h-[58px] items-center gap-3 rounded-[var(--r-pill)] bg-[var(--text)] pr-6 pl-[18px] text-[#07070a] no-underline shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_18px_50px_-18px_rgba(91,77,255,0.7)]"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.5 7V6a3.5 3.5 0 0 1 7 0v1" fill="none" stroke="#07070a" strokeWidth="1.6" />
        <path d="M3.5 7h17l-1.1 13.1a1 1 0 0 1-1 .9H5.6a1 1 0 0 1-1-.9z" fill="#07070a" />
        <rect x="8.4" y="10.2" width="3.3" height="3.3" fill="#f5f5f7" />
        <rect x="12.3" y="10.2" width="3.3" height="3.3" fill="#f5f5f7" />
        <rect x="8.4" y="14.1" width="3.3" height="3.3" fill="#f5f5f7" />
        <rect x="12.3" y="14.1" width="3.3" height="3.3" fill="#f5f5f7" />
      </svg>
      <span className="flex flex-col items-start text-left leading-[1.1]">
        <span className="text-[11px] font-medium">Get it from</span>
        <span className="text-[17px] font-semibold tracking-[-0.01em]">Microsoft Store</span>
      </span>
    </a>
  );
}

export function InstallerLink() {
  return (
    <a
      href={site.download}
      className="pop flex h-[58px] items-center gap-2.5 rounded-[var(--r-pill)] border border-[var(--hairline-strong)] px-6 text-[15px] font-medium text-[var(--text)] no-underline transition-[border-color] duration-200 hover:border-[rgba(140,130,255,0.6)]"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 3v10m0 0l-4-4m4 4l4-4M4 16.5h12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Download installer</span>
      <span className="font-mono text-[10px] text-[var(--text-secondary)]">GitHub · ~5 MB</span>
    </a>
  );
}

export default function DownloadButtons({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="hidden flex-wrap items-center justify-center gap-3 md:flex">
        <StoreBadge />
        <InstallerLink />
      </div>
      <SendLink
        url={site.url}
        className="mx-auto block max-w-[320px] cursor-pointer rounded-[26px] border-0 bg-[var(--text)] px-[26px] py-4 text-center text-[16px] leading-[1.35] font-semibold text-balance text-[#07070a] md:hidden"
      >
        Crest is for Windows 11 — send yourself the link
      </SendLink>
    </div>
  );
}
