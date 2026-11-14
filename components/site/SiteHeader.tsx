import Link from "next/link";
import CrestMark from "./CrestMark";
import SendLink from "./SendLink";
import { WhatsNewTrigger } from "./WhatsNew";
import { site } from "@/lib/site";

/**
 * A floating pill rather than a full-width bar: it hangs over the page the way
 * the notch hangs over a desktop, and it is the first thing on the page that
 * shows what the product is.
 *
 * A Server Component. Every in-page target is root-relative (`/#features`, not
 * `#features`) because this header is drawn on `/privacy` and `/contact` too,
 * where a bare fragment resolves against *that* page and goes nowhere. Only two
 * leaves are client code, both already client components in their own right:
 * the Changelog trigger and the mobile share button.
 */
const link =
  "rounded-[var(--r-pill)] px-3 py-2 text-[14px] text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text)]";

export default function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex h-[50px] items-center gap-1 rounded-[var(--r-pill)] border border-[var(--hairline)] bg-[rgba(15,15,20,0.82)] pr-1.5 pl-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl"
      >
        <Link
          href="/#top"
          className="flex items-center gap-2.5 pr-3 text-[var(--text)] no-underline"
          aria-label={`${site.name} home`}
        >
          <CrestMark size={26} />
          <span className="font-display text-[17px] font-semibold tracking-[-0.02em]">
            {site.name}
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          <Link href="/#features" className={link}>
            Features
          </Link>
          <Link href="/privacy" className={link}>
            Privacy
          </Link>
          <WhatsNewTrigger className={`${link} cursor-pointer`}>Changelog</WhatsNewTrigger>
          <a href={site.repo} target="_blank" rel="noopener noreferrer" className={link}>
            GitHub
          </a>
          <a
            href={site.store}
            target="_blank"
            rel="noopener noreferrer"
            className="pop ml-1.5 flex h-9 items-center rounded-[var(--r-pill)] bg-[var(--text)] px-4 text-[14px] font-semibold text-[#07070a] no-underline"
          >
            Get Crest
          </a>
        </div>

        <SendLink
          url={site.url}
          className="ml-1.5 h-9 cursor-pointer rounded-[var(--r-pill)] border-0 bg-[var(--text)] px-4 text-[14px] font-semibold text-[#07070a] md:hidden"
        >
          Send link
        </SendLink>
      </nav>
    </header>
  );
}
