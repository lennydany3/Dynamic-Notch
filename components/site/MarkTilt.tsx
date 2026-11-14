"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The only script the 3D mark needs: it follows the pointer.
 *
 * Everything visual (the twenty-layer extrusion, the float, the unfold) is
 * server-rendered markup and CSS. This island just springs two numbers,
 * `--rx` and `--ry`, onto the rotating element, and CSS does the rest, so with
 * JavaScript off, or `prefers-reduced-motion` on, the mark sits at its default
 * tilt and is still a finished piece of art.
 *
 * It idles with a slow sway so the mark is alive without a cursor, and parks
 * its animation frame whenever it is off screen.
 */
const REST = { rx: -10, ry: 14 };

type Spring = { x: number; v: number };

export default function MarkTilt({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rot = el.querySelector<HTMLElement>(".mark3d__rot");
    if (!rot) return;

    const ptr = { x: 0, y: 0 };
    const rx: Spring = { x: REST.rx, v: 0 };
    const ry: Spring = { x: REST.ry, v: 0 };
    let raf = 0;
    let last = 0;
    let visible = false;

    const spring = (s: Spring, to: number, dt: number) => {
      s.v += (-38 * (s.x - to) - 9.5 * s.v) * dt;
      s.x += s.v * dt;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.034, (now - last) / 1000) : 1 / 60;
      last = now;
      const t = now / 1000;
      spring(ry, REST.ry + Math.sin(t * 0.42) * 7 + ptr.x * 16, dt);
      spring(rx, REST.rx + Math.sin(t * 0.29 + 1.3) * 3.5 - ptr.y * 11, dt);
      rot.style.setProperty("--ry", ry.x.toFixed(3));
      rot.style.setProperty("--rx", rx.x.toFixed(3));
      if (visible) raf = requestAnimationFrame(tick);
      else last = 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPointer = (event: PointerEvent) => {
      ptr.x = (event.clientX / window.innerWidth) * 2 - 1;
      ptr.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className={className} aria-hidden>
      {children}
    </div>
  );
}
