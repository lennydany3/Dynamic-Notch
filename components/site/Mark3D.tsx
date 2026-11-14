import type { CSSProperties } from "react";
import { useId } from "react";
import MarkTilt from "./MarkTilt";
import { CREST_GLYPH } from "./CrestMark";

/**
 * The hero object: Crest's mark as a lit, living solid.
 *
 * Server-rendered end to end; <MarkTilt> only drives the pointer tilt. What
 * makes it read as an object rather than a flat tile:
 *
 *  - **Body.** Twenty tile copies pushed back along Z (front three are bevel
 *    layers, the rest fall toward black) plus six lifted glyph copies, so both
 *    the plate and the "C" have thickness.
 *  - **Orbit.** Two elliptical rings circle the mark. Each is drawn twice, a
 *    back half *behind* the body and a front half *in front* of the glyph, with
 *    a light travelling the path via SMIL, so the mark appears to sit inside
 *    its own orbit. (Done as two flat layers rather than one tilted ring
 *    because a plane that intersects the tile would z-sort badly.)
 *  - **Light.** A slow conic aura behind it, a gloss sweep across the face on
 *    a loop, and a bloom on the front glyph layer.
 *  - **Atmosphere.** Drifting sparks, a ripple on the floor, and a small notch
 *    pill above that stretches the way the product does: the logo and the
 *    thing it's named for in one frame.
 */
const LAYERS = 20;
const GLYPH_STEPS = ["#2a1bc4", "#3d2edb", "#5547ee", "#7468fa", "#9a91ff", "#f5f5f7"];
const SPARKS = 12;

const channel = (hex: string, i: number) => parseInt(hex.slice(i, i + 2), 16);

function mix(a: string, b: string, t: number) {
  return (
    "#" +
    [1, 3, 5]
      .map((i) => Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * t))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

function layerStyle(k: number): CSSProperties {
  const t = (k - 1) / (LAYERS - 1);
  const bevel = k <= 3;
  const bg = bevel
    ? "linear-gradient(135deg, #d6d1ff 0%, #7a6cff 34%, #1c0bb0 100%)"
    : `linear-gradient(135deg, ${mix("#5a4cf4", "#160a78", t)} 0%, ${mix("#1c08bc", "#06003a", t)} 46%, ${mix("#0a0068", "#010010", t)} 100%)`;
  return {
    "--k": k,
    "--bg": bg,
    "--inset": bevel ? `${((4 - k) * 0.6).toFixed(1)}%` : "0%",
  } as CSSProperties;
}

const ELLIPSE = (rx: number, ry: number) =>
  `M${200 - rx} 200A${rx} ${ry} 0 1 1 ${200 + rx} 200A${rx} ${ry} 0 1 1 ${200 - rx} 200`;

/** One orbit: full ellipse clipped to the back or front half, with a travelling light. */
function Orbit({
  uid,
  half,
  rx,
  ry,
  tilt,
  dur,
  phase,
}: {
  uid: string;
  half: "back" | "front";
  rx: number;
  ry: number;
  tilt: number;
  dur: number;
  phase: number;
}) {
  const path = ELLIPSE(rx, ry);
  const clip = `url(#${uid}-${half})`;
  return (
    <g transform={`rotate(${tilt} 200 200)`}>
      <g clipPath={clip}>
        <path d={path} fill="none" stroke={`url(#${uid}-ring)`} strokeWidth={half === "front" ? 1.6 : 1} opacity={half === "front" ? 0.95 : 0.55} />
        <g className="mark3d__dot">
          <circle r="11" fill="rgba(140,130,255,0.38)" />
          <circle r="3.6" fill="#fff" />
          <animateMotion dur={`${dur}s`} begin={`${phase}s`} repeatCount="indefinite" path={path} />
        </g>
      </g>
    </g>
  );
}

function Rings({ half }: { half: "back" | "front" }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg className={`mark3d__orbit mark3d__orbit--${half}`} viewBox="0 0 400 400" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-ring`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8c82ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#b5aeff" />
          <stop offset="1" stopColor="#8c82ff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-back`}>
          <rect x="-50" y="-100" width="500" height="300" />
        </clipPath>
        <clipPath id={`${uid}-front`}>
          <rect x="-50" y="200" width="500" height="300" />
        </clipPath>
      </defs>
      <Orbit uid={uid} half={half} rx={192} ry={58} tilt={-13} dur={7} phase={0} />
      <Orbit uid={uid} half={half} rx={150} ry={44} tilt={9} dur={5.2} phase={-2.6} />
    </svg>
  );
}

export default function Mark3D({ small = false }: { small?: boolean }) {
  return (
    <MarkTilt className={`mark3d ${small ? "mark3d--sm" : ""}`}>
      <div className="mark3d__aura" />
      <div className="mark3d__halo" />
      <div className="mark3d__glow" />
      <div className="mark3d__shadow" />
      <div className="mark3d__ripple" />
      <div className="mark3d__ripple mark3d__ripple--b" />

      {Array.from({ length: SPARKS }, (_, i) => (
        <span
          key={i}
          className="mark3d__spark"
          style={
            {
              "--x": (i * 37 + 11) % 100,
              "--z": `${2 + (i % 3)}px`,
              "--t": `${6 + (i % 4) * 1.3}s`,
              "--d": `${-(i * 0.83).toFixed(2)}s`,
            } as CSSProperties
          }
        />
      ))}

      <div className="mark3d__float">
        <div className="mark3d__pill">
          <span className="mark3d__pill-bars">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="mark3d__pill-dot" />
        </div>

        <div className="mark3d__scene">
          <div className="mark3d__rot">
            <Rings half="back" />
            {Array.from({ length: LAYERS }, (_, i) => LAYERS - i).map((k) => (
              <div key={k} className="mark3d__layer" style={layerStyle(k)} />
            ))}
            <div className="mark3d__face">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 46%)",
                }}
              />
              <div className="mark3d__spec" />
              <div className="mark3d__shine" />
            </div>
            <div
              className="absolute inset-0 rounded-[23%] border border-[#8c82ff]/50"
              style={{ transform: "translateZ(1px)" }}
            />
            {GLYPH_STEPS.map((color, i) => (
              <svg
                key={color}
                className={`mark3d__glyph ${i === GLYPH_STEPS.length - 1 ? "mark3d__glyph--front" : ""}`}
                viewBox="6 4 88 88"
                style={{ "--k": i + 1 } as CSSProperties}
              >
                <path
                  d={CREST_GLYPH}
                  fill="none"
                  stroke={color}
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
            <Rings half="front" />
          </div>
        </div>
      </div>
    </MarkTilt>
  );
}
