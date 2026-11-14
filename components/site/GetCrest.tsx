import DownloadButtons from "./DownloadButtons";
import Mark3D from "./Mark3D";
import { site } from "@/lib/site";

/** The closing call to action: the mark again, smaller, over the same two buttons as the hero. */
export default function GetCrest() {
  return (
    <section
      id="download"
      className="flex flex-col items-center px-6 pt-[clamp(48px,6vw,80px)] pb-[clamp(96px,12vw,160px)] text-center"
    >
      <div className="relative flex h-[260px] w-full max-w-[420px] items-center justify-center">
        <Mark3D small />
      </div>
      <h2
        data-reveal
        className="m-0 font-display text-[clamp(38px,5.4vw,72px)] leading-none font-semibold tracking-[-0.045em]"
      >
        Get Crest. It&apos;s free.
      </h2>
      <DownloadButtons className="mt-9" />
      <p className="mt-[22px] font-mono text-[11px] tracking-[0.02em] text-[var(--text-secondary)]">
        Free · Windows 11 · v{site.version}
      </p>
    </section>
  );
}
