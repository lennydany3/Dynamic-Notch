"use client";

import { useEffect } from "react";

/**
 * Page-wide scroll behaviour, as one renderless island so no section has to
 * be a client component just to watch the viewport.
 *
 * Three jobs, all driven by attributes the server markup already carries:
 *
 *  - `[data-reveal]`: fade-and-rise as it scrolls in. Only elements that start
 *    *below* the fold are armed, so the first screen never flashes and, with
 *    script off, nothing is ever hidden.
 *  - `[data-play]`: pause an illustration's CSS loops while it is off screen
 *    (they read `--play`), so thirteen looping SVGs don't all run at once.
 *  - `[data-timeline]`: flag it once it has scrolled into view so its line
 *    and nodes draw.
 */
export default function PageEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];

    if (!reduced) {
      const vh = window.innerHeight;
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]"),
      ).filter((el) => el.getBoundingClientRect().top > vh * 0.9);

      targets.forEach((el) => el.setAttribute("data-armed", ""));

      const reveal = new IntersectionObserver(
        (entries) => {
          entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                a.boundingClientRect.top - b.boundingClientRect.top ||
                a.boundingClientRect.left - b.boundingClientRect.left,
            )
            .forEach((entry, i) => {
              const el = entry.target as HTMLElement;
              el.style.setProperty("--d", `${Math.min(i, 6) * 70}ms`);
              el.setAttribute("data-in", "");
              reveal.unobserve(el);
            });
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      targets.forEach((el) => reveal.observe(el));
      observers.push(reveal);
    }

    const play = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          (entry.target as HTMLElement).style.setProperty(
            "--play",
            entry.isIntersecting ? "running" : "paused",
          ),
        ),
      { rootMargin: "40px" },
    );
    document.querySelectorAll("[data-play]").forEach((el) => play.observe(el));
    observers.push(play);

    const timelines = document.querySelectorAll<HTMLElement>("[data-timeline]");
    const draw = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-in", "");
          draw.unobserve(entry.target);
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    timelines.forEach((el) => {
      if (reduced) el.setAttribute("data-in", "");
      else draw.observe(el);
    });
    observers.push(draw);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
