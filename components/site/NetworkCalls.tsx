import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { Packet } from "./illustrations";

/**
 * The privacy claim as evidence: the complete list of everything Crest talks
 * to, one row each, with a packet travelling the wire. The long-form policy
 * lives at /privacy; this is the headline of it.
 *
 * Server-rendered. The packets are CSS loops paused off screen by
 * <PageEffects>.
 */
const calls: { host: string; what: string; note?: string }[] = [
  { host: "api.open-meteo.com", what: "weather forecast" },
  { host: "geocoding-api.open-meteo.com", what: "location search" },
  { host: "GitHub latest.json", what: "update check", note: "off entirely in the Store version" },
];

export default function NetworkCalls() {
  return (
    <section id="privacy" className="px-6 py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading eyebrow="Privacy" size="xl" className="mb-14">
          Three network calls. That&apos;s all.
        </SectionHeading>

        <div className="border-b border-[var(--hairline)]">
          {calls.map((call, i) => (
            <div
              key={call.host}
              data-play
              data-reveal
              className="flex flex-wrap items-center gap-x-8 gap-y-3.5 border-t border-[var(--hairline)] py-7"
            >
              <code className="min-w-0 flex-[0_1_340px] font-mono text-[14px] text-[var(--text)]">
                {call.host}
              </code>
              <div className="relative h-3 min-w-[140px] flex-[1_1_140px] overflow-hidden" aria-hidden>
                <div
                  className="absolute inset-x-0 top-1.5 h-px"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0 3px, rgba(255,255,255,0) 3px 8px)",
                  }}
                />
                <Packet delay={-0.9 * i} />
              </div>
              <div className="flex flex-[0_1_320px] flex-wrap items-center gap-x-3 gap-y-2 text-[17px] text-[var(--text-secondary)]">
                <span>{call.what}</span>
                {call.note && (
                  <span className="rounded-[var(--r-pill)] px-2.5 py-[5px] font-mono text-[10px] text-[var(--text-body)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                    {call.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-14 flex flex-wrap items-end justify-between gap-6">
          <p className="m-0 max-w-[620px] font-display text-[clamp(24px,2.6vw,34px)] leading-[1.2] tracking-[-0.025em] text-balance">
            No accounts. No analytics. Clipboard never leaves memory.
          </p>
          <Link
            href="/privacy"
            className="flex items-center gap-2 text-[16px] font-medium text-[var(--accent-bright)] no-underline transition-colors duration-200 hover:text-[#b5aeff]"
          >
            Read the full Privacy Policy
            <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M4 10h12m0 0l-5-5m5 5l-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
