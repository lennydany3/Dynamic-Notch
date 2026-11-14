import type { CSSProperties, ReactNode } from "react";
import { MiniWeather, Waveform } from "./illustrations";

/**
 * The six states of the live notch demo, as plain presentational markup.
 *
 * No hooks and no "use client", so these render on the server inside the demo's
 * HTML and the client island only decides *which one is on*. Everything here is
 * positioned in the demo's own 760×440 canvas, the same coordinate space the
 * pill morphs in, which is why the numbers are literal.
 */
export type Stage = {
  title: string;
  text: string;
  /** Pill target size for this stage: [width, height, radius]. */
  pill: [number, number, number];
};

export const STAGES: Stage[] = [
  { title: "Idle", text: "A small black pill at the top edge. It stays clear of your taskbar, Alt-Tab and every window.", pill: [132, 34, 17] },
  { title: "A notification arrives", text: "The pill stretches, the app icon slides in and the message plays out inside the notch. Then it settles back.", pill: [404, 76, 30] },
  { title: "Media playing", text: "Album art, a live waveform and play/pause. Skip a track without finding the window.", pill: [432, 104, 32] },
  { title: "Weather", text: "Temperature and conditions from Open-Meteo, for a place you typed in yourself.", pill: [300, 60, 30] },
  { title: "Your next event", text: "A countdown to what's next, so a reminder never arrives as a surprise.", pill: [372, 68, 30] },
  { title: "File Shelf", text: "Drag a file up and the pill takes it. Drag it out again when you know where it goes.", pill: [220, 48, 24] },
];

/** After the dragged file lands, the pill opens from "drop here" into the shelf. */
export const SHELF_PILL: [number, number, number] = [392, 112, 32];

const MONO = "font-mono";
const MUTED = "text-[#8a8a96]";

/** A stage's content, fading and scaling in over the pill with a short stagger. */
export function Layer({
  on,
  box,
  className = "",
  children,
}: {
  on: boolean;
  /** left / width / height in canvas px; every layer hangs 10px from the top. */
  box: { left: number; width: number; height: number };
  className?: string;
  children: ReactNode;
}) {
  const delay = on ? "120ms" : "0ms";
  const style: CSSProperties = {
    top: 10,
    left: box.left,
    width: box.width,
    height: box.height,
    opacity: on ? 1 : 0,
    transform: on ? "scale(1)" : "scale(0.94)",
    transition: `opacity 260ms cubic-bezier(.2,.8,.2,1) ${delay}, transform 560ms cubic-bezier(.34,1.45,.64,1) ${delay}`,
  };
  return (
    <div aria-hidden className={`pointer-events-none absolute z-[4] box-border ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Icon slides in from the left, text rises from below, each a beat behind the pill. */
export function slideIcon(on: boolean): CSSProperties {
  return {
    transform: on ? "translateX(0)" : "translateX(-16px)",
    transition: `transform 620ms cubic-bezier(.34,1.45,.64,1) ${on ? "190ms" : "0ms"}`,
  };
}

export function slideText(on: boolean): CSSProperties {
  return {
    transform: on ? "translateY(0)" : "translateY(8px)",
    transition: `transform 620ms cubic-bezier(.34,1.45,.64,1) ${on ? "190ms" : "0ms"}`,
  };
}

const FILE_PATH = "M3 1h8l5 5v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM11 1v5h5";

export function NotificationStage({ on }: { on: boolean }) {
  return (
    <Layer on={on} box={{ left: 178, width: 404, height: 76 }} className="flex items-center gap-3 pr-[22px] pl-3.5">
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-[15px] bg-[#1800ad]" style={slideIcon(on)}>
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-4 3.5V16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" fill="none" stroke="#f5f5f7" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]" style={slideText(on)}>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[14px] font-semibold">Riya</span>
          <span className={`${MONO} text-[9px] ${MUTED}`}>Messages · now</span>
        </div>
        <div className="text-[14px] whitespace-nowrap text-[#c9c9d1]">Pushed the build. v0.7.2 is live.</div>
      </div>
    </Layer>
  );
}

export function MediaStage({ on }: { on: boolean }) {
  return (
    <Layer on={on} box={{ left: 164, width: 432, height: 104 }} className="flex items-center gap-3.5 py-4 pr-[18px] pl-4">
      <div className="flex h-[72px] w-[72px] flex-none items-center justify-center rounded-[18px] bg-[#1800ad]" style={slideIcon(on)}>
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="22" fill="none" stroke="rgba(140,130,255,0.5)" strokeWidth="1" />
          <circle cx="36" cy="36" r="13" fill="none" stroke="rgba(140,130,255,0.5)" strokeWidth="1" />
          <circle cx="36" cy="36" r="3.5" fill="#8c82ff" />
        </svg>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5" style={slideText(on)}>
        <span className="text-[15px] font-semibold">Low Tide</span>
        <span className={`text-[12px] ${MUTED}`}>Halden</span>
        <div className="relative mt-2.5 h-[3px] overflow-hidden rounded-[2px] bg-white/[0.14]">
          <div className="absolute inset-0 origin-left bg-[#8c82ff]" style={{ transform: "scaleX(0.42)" }} />
        </div>
        <div className={`mt-[5px] flex justify-between ${MONO} text-[9px] ${MUTED}`}>
          <span>1:12</span>
          <span>3:40</span>
        </div>
      </div>
      <div className="flex flex-none items-center gap-3">
        <Waveform />
        <div className="flex h-[34px] w-[34px] items-center justify-center gap-1 rounded-full bg-[#f5f5f7]">
          <span className="h-3 w-[3px] rounded-[1px] bg-[#07070a]" />
          <span className="h-3 w-[3px] rounded-[1px] bg-[#07070a]" />
        </div>
      </div>
    </Layer>
  );
}

export function WeatherStage({ on }: { on: boolean }) {
  return (
    <Layer on={on} box={{ left: 230, width: 300, height: 60 }} className="flex items-center gap-3 pr-[22px] pl-3">
      <div className="flex-none" style={slideIcon(on)}>
        <MiniWeather />
      </div>
      <span className="font-display text-[28px] font-semibold tracking-[-0.03em]">18°</span>
      <div className="flex flex-col gap-[3px]" style={slideText(on)}>
        <span className="text-[13px] font-semibold">Partly cloudy</span>
        <span className={`${MONO} text-[9px] whitespace-nowrap ${MUTED}`}>Bengaluru · H 24° L 17°</span>
      </div>
    </Layer>
  );
}

export function EventStage({ on, countdown }: { on: boolean; countdown: ReactNode }) {
  return (
    <Layer on={on} box={{ left: 194, width: 372, height: 68 }} className="flex items-center gap-3 pr-[22px] pl-[11px]">
      <div className="flex h-[46px] w-[46px] flex-none flex-col items-center justify-center gap-px rounded-[14px] bg-[#1b1b24]" style={slideIcon(on)}>
        <span className={`${MONO} text-[8px] text-[#8c82ff]`}>NOV</span>
        <span className="font-display text-[18px] leading-none font-semibold">14</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]" style={slideText(on)}>
        <span className="text-[14px] font-semibold">Design review</span>
        <span className={`text-[12px] ${MUTED}`}>Room 2 · 30 min</span>
      </div>
      <div className="flex flex-none flex-col items-end gap-[3px]">
        <span className={`${MONO} text-[8px] tracking-[0.06em] ${MUTED}`}>STARTS IN</span>
        {countdown}
      </div>
    </Layer>
  );
}

export function DropStage({ on }: { on: boolean }) {
  return (
    <Layer on={on} box={{ left: 270, width: 220, height: 48 }} className="flex items-center justify-center gap-2.5">
      <svg width="16" height="16" viewBox="0 0 20 20">
        <path d="M10 3v12m0 0l-4.5-4.5M10 15l4.5-4.5" fill="none" stroke="#8c82ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[13px] font-medium">Drop to File Shelf</span>
    </Layer>
  );
}

function ShelfItem({ name, fresh }: { name: string; fresh?: boolean }) {
  return (
    <div
      className="flex flex-1 items-center gap-2 rounded-[14px] px-2.5"
      style={{
        background: fresh ? "#1a1840" : "#16161d",
        boxShadow: `inset 0 0 0 1px ${fresh ? "rgba(140,130,255,0.55)" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      <svg width="14" height="16" viewBox="0 0 18 20">
        <path d={FILE_PATH} fill="none" stroke={fresh ? "#f5f5f7" : "#8a8a96"} strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span className={`${MONO} text-[9.5px] ${fresh ? "text-[#f5f5f7]" : "text-[#c9c9d1]"}`}>{name}</span>
    </div>
  );
}

export function ShelfStage({ on }: { on: boolean }) {
  return (
    <Layer on={on} box={{ left: 184, width: 392, height: 112 }} className="flex flex-col gap-2.5 px-4 py-3.5">
      <div className={`flex justify-between px-1 ${MONO} text-[9px] tracking-[0.06em] ${MUTED}`}>
        <span>FILE SHELF</span>
        <span>3 ITEMS</span>
      </div>
      <div className="flex flex-1 gap-2">
        <ShelfItem name="brief.pdf" />
        <ShelfItem name="notch.png" />
        <ShelfItem name="build.zip" fresh />
      </div>
    </Layer>
  );
}

/** The fake desktop the notch lives on: two windows and a hairline. */
export function MockDesktop() {
  const bar = (w: number, strong = false) => (
    <span
      className="block h-1.5 rounded-[3px]"
      style={{ width: w, background: strong ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.06)" }}
    />
  );
  const controls = (
    <svg width="64" height="10" viewBox="0 0 64 10">
      <path d="M2 5h8M28 1h8v8h-8zM54 1l8 8M62 1l-8 8" fill="none" stroke="#8a8a96" strokeWidth="1" />
    </svg>
  );
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.14]" />
      <div
        className="absolute z-[1] h-[330px] w-[400px] rounded-xl bg-[#1b1b24]"
        style={{ left: 40, top: 96, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 24px 40px -20px rgba(0,0,0,0.7)" }}
      >
        <div className="flex h-[38px] items-center justify-between border-b border-white/5 px-3.5">
          <span className={`text-[12px] ${MUTED}`}>Documents</span>
          {controls}
        </div>
        <div className="flex flex-col gap-3.5 p-4">
          {[140, 100, 170].map((w) => (
            <div key={w} className="flex items-center gap-2.5">
              <span className="h-4 w-4 rounded bg-white/[0.08]" />
              <span className="h-1.5 rounded-[3px] bg-white/[0.08]" style={{ width: w }} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute z-[1] h-[300px] w-[392px] rounded-xl bg-[#1e1e28]"
        style={{ left: 330, top: 150, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), 0 24px 40px -20px rgba(0,0,0,0.8)" }}
      >
        <div className="flex h-[38px] items-center justify-between border-b border-white/5 px-3.5">
          <span className={`text-[12px] ${MUTED}`}>notes.md</span>
          {controls}
        </div>
        <div className="flex flex-col gap-3 p-[18px]">
          {bar(180, true)}
          {bar(260)}
          {bar(220)}
        </div>
      </div>
    </>
  );
}

/** The file being dragged up to the notch in the last stage. */
export function DraggedFile() {
  return (
    <div
      className="absolute z-[2] box-border flex h-11 w-[150px] items-center gap-2.5 rounded-[14px] bg-[#262632] px-3"
      style={{
        left: 305,
        top: 300,
        opacity: 0,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.16), 0 16px 30px -12px rgba(0,0,0,0.8)",
        animation: "cr-dropfile 1250ms cubic-bezier(.55,0,.35,1) forwards",
      }}
    >
      <svg width="18" height="20" viewBox="0 0 18 20">
        <path d={FILE_PATH} fill="none" stroke="#f5f5f7" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
      <span className={`${MONO} text-[11px] text-[#f5f5f7]`}>build.zip</span>
      <svg width="16" height="20" viewBox="0 0 16 20" className="absolute -right-2 -bottom-3.5">
        <path d="M1 1l13 9-6 1.2L5 17z" fill="#f5f5f7" stroke="#07070a" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
