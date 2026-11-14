import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import {
  AudioScene,
  AutostartScene,
  BluetoothScene,
  CalendarScene,
  ClipboardScene,
  MediaScene,
  NotesScene,
  NotificationScene,
  ScreenshotsScene,
  ShelfScene,
  SystemScene,
  WeatherScene,
} from "./illustrations";

/**
 * "What lives in the notch": a bento of live pictures. Every card is a Server
 * Component holding an SVG scene whose loops are pure CSS, so the whole
 * section is in the HTML the server sends and animates with no script.
 *
 * The four rows differ in density, not in kind: each row is a flex-wrap line
 * whose cards carry a flex-grow ratio, so the grid reflows from a 7:5 pair
 * down to a single column without a breakpoint list.
 */
type Size = "xl" | "lg" | "md" | "sm";

const SIZES: Record<Size, { art: string; pad: string; title: string; text: string }> = {
  xl: { art: "h-[250px] px-5", pad: "px-[26px] pt-[22px] pb-[26px]", title: "text-[21px]", text: "text-[15px]" },
  lg: { art: "h-[210px] px-4", pad: "px-6 pt-5 pb-6", title: "text-[20px]", text: "text-[15px]" },
  md: { art: "h-[210px] px-4", pad: "px-6 pt-5 pb-6", title: "text-[20px]", text: "text-[15px]" },
  sm: { art: "h-[170px] px-3", pad: "px-[22px] pt-[18px] pb-[22px]", title: "text-[19px]", text: "text-[14px]" },
};

type Feature = {
  title: string;
  text: string;
  art: ReactNode;
  size: Size;
  flex: string;
};

const rows: Feature[][] = [
  [
    { title: "Notifications in the notch", text: "Windows notifications land in the pill first, then file themselves away.", art: <NotificationScene />, size: "xl", flex: "7 1 440px" },
    { title: "Media controls", text: "See what's playing, scrub and skip without finding the window.", art: <MediaScene />, size: "xl", flex: "5 1 320px" },
  ],
  [
    { title: "File Shelf", text: "Drag a file up to the notch. Drop it somewhere else later.", art: <ShelfScene />, size: "lg", flex: "1 1 300px" },
    { title: "Clipboard history", text: "Memory-only, pauses while your password manager is focused.", art: <ClipboardScene />, size: "lg", flex: "1 1 300px" },
    { title: "Quick Notes", text: "Type a thought before it's gone. No app to open first.", art: <NotesScene />, size: "lg", flex: "1 1 300px" },
  ],
  [
    { title: "Screenshots", text: "Recent shots slide into the notch as thumbnails.", art: <ScreenshotsScene />, size: "md", flex: "4 1 280px" },
    { title: "Calendar & reminders", text: "Your next event and a countdown, before the reminder interrupts you.", art: <CalendarScene />, size: "md", flex: "3 1 260px" },
    { title: "System monitor", text: "Live CPU and RAM, read from the same counters as Task Manager.", art: <SystemScene />, size: "md", flex: "5 1 300px" },
  ],
  [
    { title: "Audio Quick Access", text: "Switch speakers and mic from the top of the screen.", art: <AudioScene />, size: "sm", flex: "1 1 230px" },
    { title: "Bluetooth status", text: "See what's connected at a glance.", art: <BluetoothScene />, size: "sm", flex: "1 1 230px" },
    { title: "Weather", text: "Forecast from Open-Meteo for the town you typed in.", art: <WeatherScene />, size: "sm", flex: "1 1 230px" },
    { title: "Launches with Windows", text: "Starts with Windows, then stays out of the way.", art: <AutostartScene />, size: "sm", flex: "1 1 230px" },
  ],
];

function FeatureCard({ title, text, art, size, flex }: Feature) {
  const s = SIZES[size];
  return (
    <article
      data-play
      data-reveal
      className="feature-card flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-[var(--hairline)] bg-[var(--surface)]"
      style={{ flex }}
    >
      <div className={`border-b border-[rgba(255,255,255,0.06)] bg-[#0b0b10] ${s.art}`}>{art}</div>
      <div className={`flex flex-col gap-1.5 ${s.pad}`}>
        <h3 className={`m-0 font-display font-semibold tracking-[-0.02em] ${s.title}`}>{title}</h3>
        <p className={`m-0 leading-[1.5] text-pretty text-[var(--text-secondary)] ${s.text}`}>{text}</p>
      </div>
    </article>
  );
}

export default function Features() {
  return (
    <section id="features" className="px-6 py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
        <SectionHeading
          eyebrow="Features"
          className="mb-10"
          lede="Each one opens from the same pill. Keep the ones you use and switch off the rest."
        >
          What lives in the notch.
        </SectionHeading>

        {rows.map((row, i) => (
          <div key={i} className="flex flex-wrap gap-4">
            {row.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
