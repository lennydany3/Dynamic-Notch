import SectionHeading from "./SectionHeading";
import { WhatsNewTrigger } from "./WhatsNew";
import { site } from "@/lib/site";

/**
 * "Built in public": who made it, where the source is, and a four-stop
 * timeline that draws itself as it scrolls into view.
 *
 * Server-rendered. The draw is CSS: <PageEffects> only sets `data-in` on the
 * timeline once it is visible, and each node's delay is a custom property set
 * here, so the node lights exactly as the line reaches it.
 */
const pillLink =
  "flex h-11 cursor-pointer items-center gap-2 rounded-[var(--r-pill)] px-[18px] text-[14px] font-medium text-[var(--text)] no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_rgba(140,130,255,0.6)]";

const LINE_MS = 1400;

function Node({ index, of }: { index: number; of: number }) {
  return (
    <div className="relative h-3.5 w-3.5">
      <div className="absolute inset-0 rounded-full bg-[var(--ground)] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.2)]" />
      <div
        className="tl-node absolute inset-0 rounded-full bg-[var(--accent-bright)] shadow-[0_0_14px_2px_rgba(91,77,255,0.6)]"
        style={{ "--nd": `${Math.round((index / (of - 1)) * LINE_MS * 0.85)}ms` } as React.CSSProperties}
      />
    </div>
  );
}

export default function BuiltInPublic() {
  return (
    <section id="built" className="px-6 py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <SectionHeading eyebrow="Built in public" className="max-w-[760px]">
            Made by Lenny Dany Derek D.
          </SectionHeading>
          <div className="flex flex-wrap gap-2.5">
            <a href={site.releases} target="_blank" rel="noopener noreferrer" className={pillLink}>
              GitHub releases
              <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6 14L14 6M7 6h7v7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <WhatsNewTrigger className={pillLink}>
              Changelog
              <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 10h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </WhatsNewTrigger>
          </div>
        </div>

        <div data-timeline className="relative mt-20 h-[110px]">
          <div className="absolute inset-x-[7px] top-1.5 h-0.5 rounded-[1px] bg-[var(--hairline)]" />
          <div
            className="tl-line absolute inset-x-[7px] top-1.5 h-0.5 rounded-[1px] bg-[linear-gradient(90deg,#1800ad,#8c82ff)]"
            style={{ transitionDuration: `${LINE_MS}ms` }}
          />

          <div className="absolute top-0 left-0 flex flex-col items-start gap-4">
            <Node index={0} of={4} />
            <span className="font-mono text-[13px]">v0.6</span>
          </div>
          <div className="absolute top-0 left-1/3 flex -translate-x-1/2 flex-col items-center gap-4">
            <Node index={1} of={4} />
            <span className="font-mono text-[13px]">v0.7</span>
          </div>
          <div className="absolute top-0 left-2/3 flex -translate-x-1/2 flex-col items-center gap-4">
            <Node index={2} of={4} />
            <span className="font-mono text-[13px]">v{site.version}</span>
            <span className="-mt-2.5 text-[13px] text-[var(--text-secondary)]">Current</span>
          </div>
          <div className="absolute top-0 right-0 flex flex-col items-end gap-4 text-right">
            <Node index={3} of={4} />
            <span className="max-w-24 text-[14px] leading-[1.2] font-semibold">Microsoft Store</span>
            <span className="-mt-2.5 max-w-[110px] text-[13px] text-[var(--text-secondary)]">
              Live as Crest Notch
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
