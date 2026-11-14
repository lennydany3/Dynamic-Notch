import Link from "next/link";
import CrestMark from "./CrestMark";
import { Discord, SOCIAL_ICONS } from "./icons";
import { WhatsNewTrigger } from "./WhatsNew";
import { activeSocials, site } from "@/lib/site";

/**
 * Drawn on every page, so in-page targets are root-relative (`/#features`):
 * a bare fragment on `/privacy` or `/contact` would resolve against that page
 * and go nowhere. The home page loses nothing, since a link differing only in
 * its fragment is a same-document navigation.
 *
 * Privacy and Contact are first-class links here, not tucked in a legal strip:
 * the Store listing points reviewers at them.
 */
const linkClass =
  "text-[14px] text-[var(--text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--text)]";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--hairline)] px-6 pt-9 pb-11">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <CrestMark size={26} />
          <span className="font-display text-[17px] font-semibold tracking-[-0.02em]">
            {site.name}
          </span>
          <span className="font-mono text-[10px] text-[var(--text-secondary)]">v{site.version}</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-[22px] gap-y-1">
          <Link href="/#features" className={linkClass}>
            Features
          </Link>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
          <WhatsNewTrigger className={`${linkClass} cursor-pointer`}>Changelog</WhatsNewTrigger>
          <a href={site.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          <a href={site.store} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Microsoft Store
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-7 flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="m-0 text-[13px] text-[var(--text-secondary)]">
          © {new Date().getFullYear()} {site.name}. Not affiliated with Microsoft or Apple.
        </p>

        <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
          {activeSocials.map((social) => {
            const Icon = SOCIAL_ICONS[social.id];
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${social.label}`}
                  className="grid h-11 w-11 place-items-center rounded-[var(--r-pill)] text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-raised)] hover:text-[var(--text)]"
                >
                  <Icon width={17} height={17} />
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={site.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on Discord`}
              className="grid h-11 w-11 place-items-center rounded-[var(--r-pill)] text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-raised)] hover:text-[var(--discord)]"
            >
              <Discord width={17} height={17} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
