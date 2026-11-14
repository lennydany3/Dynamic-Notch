import DownloadButtons from "./DownloadButtons";
import Mark3D from "./Mark3D";
import { site } from "@/lib/site";

/**
 * The first screen: the mark as an object, one line, one sentence, two ways to
 * install. Server-rendered in full, including the extruded mark, whose only
 * script is the pointer-follow inside <Mark3D>.
 *
 * The h1 is plain text in the document (the 3D mark is decorative and hidden
 * from assistive tech), which is what a crawler and a screen reader get first.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center"
    >
      {/* Ambient light: an indigo pool behind the mark and a faint vignette,
          so the dark ground has depth without a single image request. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(91,77,255,0.16), rgba(91,77,255,0) 70%), radial-gradient(90% 60% at 50% 110%, rgba(24,0,173,0.22), rgba(24,0,173,0) 70%)",
        }}
      />

      <div className="relative flex h-[clamp(290px,44vh,430px)] w-full max-w-[640px] items-center justify-center">
        <Mark3D />
      </div>

      <h1 className="rise relative mt-2 max-w-[12ch] font-display text-[clamp(46px,8vw,108px)] leading-[0.96] font-semibold tracking-[-0.045em] text-balance">
        Everything, one notch away.
      </h1>

      <p
        className="rise relative mt-6 max-w-[560px] text-[clamp(17px,1.6vw,20px)] leading-[1.5] text-pretty text-[var(--text-secondary)]"
        style={{ animationDelay: "90ms" }}
      >
        Crest turns the top of your Windows 11 screen into a living notch for
        notifications, media, files and quick tools. Free.
      </p>

      <DownloadButtons className="rise relative mt-9" />

      <p className="relative mt-[22px] font-mono text-[11px] tracking-[0.02em] text-[var(--text-secondary)]">
        Free · Windows 11 · v{site.version}
      </p>
    </section>
  );
}
