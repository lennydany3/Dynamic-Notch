"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DraggedFile,
  DropStage,
  EventStage,
  MediaStage,
  MockDesktop,
  NotificationStage,
  SHELF_PILL,
  STAGES,
  ShelfStage,
  WeatherStage,
} from "./NotchStages";

/**
 * "The notch, live": a pinned stage that scrolls through six states of one
 * pill (idle, notification, media, weather, event, file shelf).
 *
 * The one genuinely interactive section on the page, so it is the one place
 * that needs client state, and it keeps that state to three numbers: which
 * stage is on, whether the dragged file has landed, and how far to scale the
 * fixed 760×440 canvas down to fit. Everything it shows is server-rendered
 * markup (see NotchStages), so the first paint is a finished idle notch with
 * its caption, and hydration only wires the scroll.
 *
 * The pill's morph is a CSS transition on width/height/radius with an
 * overshooting curve, rather than a per-frame spring in JS, so the browser
 * runs it on its own timeline and the page's main thread stays free.
 *
 * Below the `md` breakpoint the pinned scroll is dropped (sticky inside a 5x
 * viewport track is a bad fit for a phone) and prev/next buttons step instead.
 */
const COUNT = STAGES.length;
const CANVAS = { w: 760, h: 440 };
const DESKTOP = "(min-width: 768px)";

function Countdown() {
  const [left, setLeft] = useState(702);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 0 ? 702 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[17px] text-[#f5f5f7] tabular-nums">
      {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
    </span>
  );
}

export default function NotchLive() {
  const track = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [scale, setScale] = useState<number | null>(null);

  /* Scroll → stage, desktop only. */
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mq = window.matchMedia(DESKTOP);
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!mq.matches) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setStage(Math.min(COUNT - 1, Math.floor(p * COUNT)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* The file-shelf stage plays a drag, then opens into the shelf. */
  useEffect(() => {
    if (stage !== COUNT - 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setDropped(true), reduced ? 0 : 1250);
    return () => {
      clearTimeout(id);
      setDropped(false);
    };
  }, [stage]);

  /* Fit the fixed canvas to whatever width the layout gives it. */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / CANVAS.w);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el || !window.matchMedia(DESKTOP).matches) {
      setStage(i);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: top + (total * (i + 0.5)) / COUNT,
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  const [w, h, r] = stage === COUNT - 1 && dropped ? SHELF_PILL : STAGES[stage].pill;

  return (
    <section
      id="live"
      ref={track}
      aria-label="The notch, live"
      className="relative md:h-[560vh]"
    >
      <div className="flex flex-col justify-center px-6 pt-24 pb-10 md:sticky md:top-0 md:h-svh md:pt-[88px]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[clamp(28px,4vh,48px)]">
          <div className="flex flex-col gap-3.5">
            <span className="font-mono text-[11px] tracking-[0.08em] text-[var(--accent-bright)]">
              THE NOTCH, LIVE
            </span>
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(34px,4.6vw,60px)] leading-none font-semibold tracking-[-0.04em] text-balance">
              It changes shape for whatever needs you.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-x-14 gap-y-8">
            {/* Captions: all six are real text in the HTML; one is shown. */}
            <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-7">
              <div className="grid">
                {STAGES.map((s, i) => (
                  <div
                    key={s.title}
                    aria-hidden={i !== stage}
                    className="flex flex-col gap-3"
                    style={{
                      gridArea: "1 / 1",
                      opacity: i === stage ? 1 : 0,
                      transform: `translateY(${i === stage ? 0 : i < stage ? -12 : 12}px)`,
                      transition:
                        "opacity 340ms cubic-bezier(.2,.8,.2,1), transform 520ms cubic-bezier(.34,1.3,.64,1)",
                    }}
                  >
                    <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                      {String(i + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                    </span>
                    <h3 className="m-0 font-display text-[30px] font-semibold tracking-[-0.03em]">
                      {s.title}
                    </h3>
                    <p className="m-0 text-[17px] leading-[1.55] text-pretty text-[var(--text-secondary)]">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1">
                {STAGES.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show: ${s.title}`}
                    aria-current={i === stage}
                    className="cursor-pointer border-0 bg-transparent px-0.5 py-2.5"
                  >
                    <span
                      className="block h-[5px] w-[26px] rounded-[3px] bg-[var(--text)] transition-opacity duration-300"
                      style={{ opacity: i === stage ? 1 : 0.2 }}
                    />
                  </button>
                ))}
              </div>

              <div className="flex gap-2.5 md:hidden">
                {(["Previous", "Next"] as const).map((label) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => setStage((s) => (s + (label === "Next" ? 1 : COUNT - 1)) % COUNT)}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--surface)] text-[var(--text)]"
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        d={label === "Next" ? "M8 5l5 5-5 5" : "M12 5l-5 5 5 5"}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* The canvas: a fixed 760×440 scene scaled to fit its column. */}
            <div className="flex min-w-0 flex-[2.4_1_520px] justify-center">
              <div
                ref={wrap}
                aria-hidden
                className="relative aspect-[760/440] w-full max-w-[760px] overflow-hidden rounded-[22px]"
              >
                <div
                  className="absolute top-0 left-0 origin-top-left overflow-hidden rounded-[22px] bg-[#14141b]"
                  style={{
                    width: CANVAS.w,
                    height: CANVAS.h,
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                    transform: `scale(${scale ?? 1})`,
                    opacity: scale === null ? 0 : 1,
                  }}
                >
                  <MockDesktop />

                  {stage === COUNT - 1 && <DraggedFile key="drag" />}

                  <div
                    className="absolute z-[3] bg-black"
                    style={{
                      top: 10,
                      left: CANVAS.w / 2,
                      width: w,
                      height: h,
                      borderRadius: r,
                      transform: "translateX(-50%)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxSizing: "border-box",
                      filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.55))",
                      transition:
                        "width 620ms cubic-bezier(.34,1.4,.64,1), height 620ms cubic-bezier(.34,1.4,.64,1), border-radius 620ms cubic-bezier(.34,1.4,.64,1)",
                    }}
                  />

                  <NotificationStage on={stage === 1} />
                  <MediaStage on={stage === 2} />
                  <WeatherStage on={stage === 3} />
                  <EventStage on={stage === 4} countdown={<Countdown />} />
                  <DropStage on={stage === 5 && !dropped} />
                  <ShelfStage on={stage === 5 && dropped} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
