import type { CSSProperties, ReactNode } from "react";

/**
 * The feature-card pictures: small SVG scenes of the notch doing each thing,
 * ported from the design export.
 *
 * They are Server Components with no script at all. Every loop is a CSS
 * keyframe (see home.css) and each animated element reads `--play`, which
 * <PageEffects> flips to `paused` while the card is off screen, so a page of
 * thirteen live illustrations costs almost nothing while it is being read.
 *
 * The scenes are drawn in a fixed viewBox and scaled by the card, which is why
 * coordinates are literal numbers rather than layout.
 */
const T2 = "#8a8a96";
const S2 = "#16161d";
const LINE = "rgba(255,255,255,0.1)";
const TI = "#5b4dff";
const TL = "#8c82ff";
const BRAND = "#1800ad";
const INK = "#f5f5f7";

type AnimOpts = {
  ease?: string;
  delay?: string;
  origin?: string;
  box?: "fill-box" | "view-box";
  base?: string;
  op?: number;
};

/** One looping animation, paused/resumed through the `--play` custom property. */
function anim(name: string, dur: string, o: AnimOpts = {}): CSSProperties {
  return {
    animation: `${name} ${dur} ${o.ease ?? "cubic-bezier(.45,0,.2,1)"} ${o.delay ?? "0s"} infinite both`,
    animationPlayState: "var(--play, running)",
    transformBox: o.box ?? "fill-box",
    transformOrigin: o.origin ?? "center",
    ...(o.base ? { transform: o.base } : {}),
    ...(o.op != null ? { opacity: o.op } : {}),
  };
}

function Scene({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      {children}
    </svg>
  );
}

type TextOpts = {
  size?: number;
  w?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  mono?: boolean;
  disp?: boolean;
  ls?: string;
};

function Tx({ x, y, children, ...o }: { x: number; y: number; children: ReactNode } & TextOpts) {
  const family = o.mono
    ? "var(--font-martian), monospace"
    : o.disp
      ? "var(--font-familjen), sans-serif"
      : "var(--font-instrument), sans-serif";
  return (
    <text
      x={x}
      y={y}
      fill={o.fill ?? INK}
      textAnchor={o.anchor}
      style={{
        font: `${o.w ?? 500} ${o.size ?? 12}px ${family}`,
        letterSpacing: o.ls,
      }}
    >
      {children}
    </text>
  );
}

type RectOpts = { rx?: number; fill?: string; stroke?: string; sw?: number; style?: CSSProperties };

function R({ x, y, w, h, ...o }: { x: number; y: number; w: number; h: number } & RectOpts) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={o.rx ?? 0}
      fill={o.fill ?? "none"}
      stroke={o.stroke}
      strokeWidth={o.stroke ? (o.sw ?? 1) : undefined}
      style={o.style}
    />
  );
}

function Pill({ x, y, w, h, style }: { x: number; y: number; w: number; h: number; style?: CSSProperties }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={Math.min(h / 2, 30)}
      fill="#000"
      stroke="rgba(255,255,255,0.14)"
      strokeWidth={1}
      style={style}
    />
  );
}

function P({
  d,
  fill,
  stroke,
  sw = 1.5,
  style,
}: {
  d: string;
  fill?: string;
  stroke?: string;
  sw?: number;
  style?: CSSProperties;
}) {
  return (
    <path
      d={d}
      fill={fill ?? "none"}
      stroke={stroke ?? "none"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    />
  );
}

function C({
  cx,
  cy,
  r,
  fill,
  stroke,
  sw,
  style,
}: {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke?: string;
  sw?: number;
  style?: CSSProperties;
}) {
  return <circle cx={cx} cy={cy} r={r} fill={fill ?? "none"} stroke={stroke} strokeWidth={sw} style={style} />;
}

/* ── the scenes ──────────────────────────────────────────────────────────── */

export function NotificationScene() {
  return (
    <Scene viewBox="0 0 480 220">
      <g style={anim("cr-bump", "4.2s", { origin: "50% 0%" })}>
        <Pill x={186} y={14} w={108} h={30} />
      </g>
      <C cx={276} cy={29} r={3.5} fill={TL} style={anim("cr-dot", "4.2s", { op: 1 })} />
      <g style={anim("cr-toast", "4.2s")}>
        <R x={110} y={124} w={260} h={64} rx={22} fill={S2} stroke={LINE} />
        <R x={124} y={136} w={40} h={40} rx={12} fill={BRAND} />
        <P d="M137 147h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-7l-3.5 3v-3H137a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z" stroke={INK} sw={1.3} />
        <Tx x={176} y={151} size={13} w={600}>Riya</Tx>
        <Tx x={176} y={170} size={12} fill={T2} w={400}>Pushed the build. v0.7.2 is live.</Tx>
        <Tx x={356} y={151} size={9} mono fill={T2} anchor="end">now</Tx>
      </g>
    </Scene>
  );
}

export function MediaScene() {
  return (
    <Scene viewBox="0 0 360 220">
      <Pill x={28} y={14} w={304} h={92} />
      <R x={44} y={28} w={64} h={64} rx={16} fill={BRAND} />
      <C cx={76} cy={60} r={20} stroke="rgba(140,130,255,0.55)" sw={1} />
      <C cx={76} cy={60} r={11} stroke="rgba(140,130,255,0.55)" sw={1} />
      <C cx={76} cy={60} r={3} fill={TL} />
      <Tx x={122} y={54} size={14} w={600}>Low Tide</Tx>
      <Tx x={122} y={73} size={12} fill={T2} w={400}>Halden</Tx>
      {Array.from({ length: 10 }, (_, i) => (
        <R
          key={i}
          x={240 + i * 7}
          y={60 - 15}
          w={3}
          h={30}
          rx={1.5}
          fill={TL}
          style={anim("cr-bar", `${(0.9 + ((i * 37) % 7) / 10).toFixed(1)}s`, {
            delay: `${-(i * 0.13).toFixed(2)}s`,
            base: "scaleY(0.55)",
          })}
        />
      ))}
      <R x={44} y={136} w={272} h={3} rx={1.5} fill="rgba(255,255,255,0.12)" />
      <R x={44} y={136} w={272} h={3} rx={1.5} fill={TL} style={anim("cr-scrub", "9s", { ease: "linear", origin: "0% 50%", base: "scaleX(0.42)" })} />
      <C cx={44} cy={137.5} r={5} fill={INK} style={anim("cr-knob", "9s", { ease: "linear", base: "translateX(114px)" })} />
      <Tx x={44} y={162} size={9} mono fill={T2}>1:12</Tx>
      <Tx x={316} y={162} size={9} mono fill={T2} anchor="end">3:40</Tx>
      <P d="M146 186l-9 6 9 6zM136 186v12" fill={T2} stroke={T2} />
      <C cx={180} cy={192} r={17} fill={INK} />
      <R x={174} y={185} w={3.5} h={14} rx={1} fill="#07070a" />
      <R x={182.5} y={185} w={3.5} h={14} rx={1} fill="#07070a" />
      <P d="M214 186l9 6-9 6zM224 186v12" fill={T2} stroke={T2} />
    </Scene>
  );
}

function ShelfFile({ x, ext, front, delay }: { x: number; ext: string; front: boolean; delay: string }) {
  return (
    <g style={anim("cr-file", "5s", { delay })}>
      <P
        d={`M${x + 4} 34h19l9 9v29a4 4 0 0 1-4 4h-24a4 4 0 0 1-4-4v-34a4 4 0 0 1 4-4z`}
        fill={front ? "#1a1840" : "#1b1b24"}
        stroke={front ? "rgba(140,130,255,0.6)" : "rgba(255,255,255,0.18)"}
        sw={1}
      />
      <Tx x={x + 16} y={66} size={7} mono fill={front ? INK : T2} anchor="middle">{ext}</Tx>
    </g>
  );
}

export function ShelfScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <Pill x={40} y={14} w={240} h={80} />
      <ShelfFile x={92} ext="PDF" front={false} delay="0s" />
      <ShelfFile x={144} ext="PNG" front={false} delay=".45s" />
      <ShelfFile x={196} ext="ZIP" front delay=".9s" />
      <Tx x={160} y={128} size={8} mono fill={T2} anchor="middle" ls="0.06em">FILE SHELF · 3</Tx>
    </Scene>
  );
}

function ClipCard({ rot, front, children }: { rot: number; front?: boolean; children: ReactNode }) {
  return (
    <g
      style={
        rot
          ? anim(rot < 0 ? "cr-fanL" : "cr-fanR", "5s", {
              box: "view-box",
              origin: "160px 250px",
              base: `rotate(${rot}deg)`,
            })
          : undefined
      }
    >
      <R x={96} y={46} w={128} h={96} rx={16} fill={front ? "#1b1b24" : S2} stroke={front ? "rgba(140,130,255,0.45)" : LINE} />
      {children}
    </g>
  );
}

export function ClipboardScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <ClipCard rot={-15}>
        <R x={112} y={62} w={22} h={22} rx={6} fill={TI} />
        <Tx x={112} y={106} size={10} mono>#5B4DFF</Tx>
      </ClipCard>
      <ClipCard rot={15}>
        <Tx x={112} y={74} size={12} w={600}>Meet at 4:30</Tx>
        <Tx x={112} y={92} size={11} fill={T2} w={400}>near the café</Tx>
      </ClipCard>
      <ClipCard rot={0} front>
        <Tx x={112} y={70} size={7} mono fill={T2} ls="0.06em">COPIED</Tx>
        <Tx x={112} y={96} size={10} mono>npm run build</Tx>
      </ClipCard>
      <R x={112} y={160} w={96} h={22} rx={11} fill="#0f0f14" stroke={LINE} />
      <Tx x={160} y={174.5} size={8} mono fill={TL} anchor="middle">memory-only</Tx>
    </Scene>
  );
}

export function NotesScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <defs>
        <clipPath id="crNoteClip">
          <rect x={45} y={27} width={230} height={146} rx={19} />
        </clipPath>
      </defs>
      <R x={44} y={26} w={232} h={148} rx={20} fill={S2} stroke={LINE} />
      <Tx x={64} y={52} mono size={7.5} fill={T2} ls="0.06em">QUICK NOTE</Tx>
      <g clipPath="url(#crNoteClip)">
        <Tx x={64} y={90} size={15}>Ask Riya about the</Tx>
        <R x={62} y={74} w={142} h={22} fill={S2} style={anim("cr-type1", "6s", { ease: "steps(18)", base: "translateX(136px)" })} />
        <R x={62} y={76} w={1.6} h={18} fill={TL} style={anim("cr-car1", "6s", { ease: "steps(18)", base: "translateX(136px)", op: 0 })} />
        <Tx x={64} y={116} size={15}>launch post copy</Tx>
        <R x={62} y={100} w={126} h={22} fill={S2} style={anim("cr-type2", "6s", { ease: "steps(16)", base: "translateX(120px)" })} />
        <R x={62} y={102} w={1.6} h={18} fill={TL} style={anim("cr-car2", "6s", { ease: "steps(16)", base: "translateX(120px)", op: 1 })} />
      </g>
      <Tx x={64} y={156} mono size={7.5} fill={T2}>Saved locally</Tx>
    </Scene>
  );
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function CalendarScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <Pill x={30} y={14} w={260} h={66} />
      <R x={42} y={25} w={44} h={44} rx={13} fill={S2} />
      <Tx x={64} y={41} mono size={7} fill={TL} anchor="middle">NOV</Tx>
      <Tx x={64} y={61} size={17} w={600} anchor="middle" disp>14</Tx>
      <Tx x={98} y={43} size={13} w={600}>Design review</Tx>
      <Tx x={98} y={61} mono size={9} fill={T2}>in 12 min</Tx>
      <C cx={268} cy={47} r={4} fill={TL} style={anim("cr-pulse", "1.6s", { op: 1 })} />
      <R x={44} y={96} w={232} h={2} rx={1} fill="rgba(255,255,255,0.1)" />
      <R x={44} y={96} w={232} h={2} rx={1} fill={TL} style={anim("cr-cd", "8s", { ease: "linear", origin: "0% 50%", base: "scaleX(0.4)" })} />
      {DAYS.map((d, i) => (
        <g key={i}>
          <R x={44 + i * 34} y={116} w={28} h={54} rx={14} fill={i === 5 ? BRAND : S2} stroke={i === 5 ? undefined : LINE} />
          <Tx x={58 + i * 34} y={136} mono size={8} fill={i === 5 ? INK : T2} anchor="middle">{d}</Tx>
          <Tx x={58 + i * 34} y={157} size={12} w={600} anchor="middle" fill={i === 5 ? INK : "#c9c9d1"}>{String(9 + i)}</Tx>
        </g>
      ))}
    </Scene>
  );
}

function Shot({ x, delay, accent }: { x: number; delay: string; accent: boolean }) {
  return (
    <g style={anim("cr-shot", "5.4s", { delay })}>
      <R x={x} y={34} w={76} h={52} rx={10} fill={S2} stroke={LINE} />
      <R x={x + 8} y={42} w={60} h={4} rx={2} fill="rgba(255,255,255,0.14)" />
      <R x={x + 8} y={52} w={28} h={26} rx={5} fill={accent ? "rgba(91,77,255,0.55)" : "rgba(255,255,255,0.08)"} />
      <R x={x + 40} y={52} w={28} h={4} rx={2} fill="rgba(255,255,255,0.1)" />
      <R x={x + 40} y={60} w={20} h={4} rx={2} fill="rgba(255,255,255,0.1)" />
    </g>
  );
}

export function ScreenshotsScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <Pill x={20} y={14} w={280} h={92} />
      <Shot x={38} delay="0s" accent={false} />
      <Shot x={122} delay=".35s" accent />
      <Shot x={206} delay=".7s" accent={false} />
      <Tx x={160} y={138} size={8} mono fill={T2} anchor="middle" ls="0.06em">3 RECENT</Tx>
    </Scene>
  );
}

export function AudioScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <Pill x={36} y={14} w={248} h={132} />
      <g style={anim("cr-switch", "4.4s", { ease: "cubic-bezier(.34,1.35,.64,1)" })}>
        <R x={48} y={28} w={224} h={46} rx={23} fill="#1b1b24" stroke="rgba(140,130,255,0.5)" />
      </g>
      <P d="M62 47h4l5-4v16l-5-4h-4zM75 46.5a6 6 0 0 1 0 9" stroke={INK} sw={1.4} />
      <Tx x={88} y={55.5} size={13} w={600}>Speakers</Tx>
      <Tx x={258} y={55} mono size={8} fill={T2} anchor="end">OUT</Tx>
      <P d="M66 98a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0v-6a3 3 0 0 1 3-3zM60 106a6 6 0 0 0 12 0M66 112v4" stroke={INK} sw={1.4} />
      <Tx x={88} y={111.5} size={13} w={600}>Headset mic</Tx>
      <Tx x={258} y={111} mono size={8} fill={T2} anchor="end">IN</Tx>
    </Scene>
  );
}

export function BluetoothScene() {
  return (
    <Scene viewBox="0 0 320 200">
      {[0, -0.8, -1.6].map((d) => (
        <C
          key={d}
          cx={160}
          cy={80}
          r={26}
          stroke={TI}
          sw={1.2}
          style={anim("cr-ring", "2.4s", { ease: "cubic-bezier(.2,.6,.3,1)", delay: `${d}s`, op: 0.25 })}
        />
      ))}
      <C cx={160} cy={80} r={26} fill={BRAND} />
      <P d="M153 74l14 12-7 6V68l7 6-14 12" stroke={INK} sw={1.6} />
      <R x={100} y={140} w={120} h={30} rx={15} fill={S2} stroke={LINE} />
      <C cx={118} cy={155} r={3.5} fill={TL} />
      <Tx x={130} y={159.5} size={12} w={500}>Headphones</Tx>
    </Scene>
  );
}

function Rays({ cx, cy, r1, r2, sw }: { cx: number; cy: number; r1: number; r2: number; sw: number }) {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <P
            key={i}
            d={`M${(cx + Math.cos(a) * r1).toFixed(2)} ${(cy + Math.sin(a) * r1).toFixed(2)}L${(cx + Math.cos(a) * r2).toFixed(2)} ${(cy + Math.sin(a) * r2).toFixed(2)}`}
            stroke={INK}
            sw={sw}
          />
        );
      })}
    </>
  );
}

export function WeatherScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <g style={anim("cr-spin", "14s", { ease: "linear" })}>
        <Rays cx={112} cy={84} r1={27} r2={34} sw={2} />
      </g>
      <C cx={112} cy={84} r={19} fill={INK} />
      <g style={anim("cr-drift", "6s")}>
        <P d="M104 124a14 14 0 0 1 2-27.8 21 21 0 0 1 40-5 17 17 0 0 1 16 32.8z" fill="#1e1e28" stroke="rgba(255,255,255,0.16)" sw={1} />
      </g>
      <Tx x={188} y={100} size={44} w={600} disp>18°</Tx>
      <Tx x={190} y={124} size={12} w={500}>Partly cloudy</Tx>
      <Tx x={190} y={142} size={7.5} mono fill={T2} ls="0.06em">BENGALURU</Tx>
    </Scene>
  );
}

/** A deterministic wobble, not random, so server and client render the same path. */
const VALS = Array.from(
  { length: 31 },
  (_, i) => 0.38 + 0.22 * Math.sin(i * 0.7) + 0.16 * Math.sin(i * 1.9 + 1) + (i % 7 === 3 ? 0.18 : 0),
);
const SPARK = "M" + Array.from({ length: 63 }, (_, i) => `${(36 + i * 8).toFixed(1)} ${(128 - VALS[i % 31] * 52).toFixed(1)}`).join("L");

export function SystemScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <defs>
        <clipPath id="crSparkClip">
          <rect x={36} y={66} width={248} height={66} />
        </clipPath>
      </defs>
      <Tx x={36} y={36} mono size={8} fill={T2} ls="0.06em">CPU</Tx>
      <Tx x={36} y={60} size={22} w={600} disp>23%</Tx>
      <Tx x={284} y={36} mono size={8} fill={TL} anchor="end" ls="0.06em">LIVE</Tx>
      <g clipPath="url(#crSparkClip)">
        <g style={anim("cr-spark", "7s", { ease: "linear" })}>
          <P d={`${SPARK}L${36 + 62 * 8} 132L36 132Z`} fill="rgba(91,77,255,0.14)" />
          <P d={SPARK} stroke={TL} sw={1.5} />
        </g>
      </g>
      <Tx x={36} y={162} mono size={8} fill={T2} ls="0.06em">RAM</Tx>
      <R x={76} y={156} w={208} h={6} rx={3} fill="rgba(255,255,255,0.1)" />
      <R x={76} y={156} w={208} h={6} rx={3} fill={TL} style={anim("cr-ram", "5s", { origin: "0% 50%", base: "scaleX(0.64)" })} />
      <Tx x={284} y={182} mono size={8} fill={T2} anchor="end">10.2 / 16 GB</Tx>
    </Scene>
  );
}

export function AutostartScene() {
  return (
    <Scene viewBox="0 0 320 200">
      <defs>
        <clipPath id="crBootClip">
          <rect x={72} y={18} width={176} height={104} rx={12} />
        </clipPath>
      </defs>
      <R x={72} y={18} w={176} h={104} rx={12} fill="#15151d" stroke={LINE} />
      <g clipPath="url(#crBootClip)">
        <R x={88} y={58} w={82} h={52} rx={6} fill="#1c1c25" />
        <R x={150} y={72} w={82} h={46} rx={6} fill="#20202a" />
        <Pill x={136} y={26} w={48} h={14} style={anim("cr-boot", "4.6s")} />
      </g>
      <R x={98} y={144} w={40} h={22} rx={11} fill="#1e1e28" stroke={LINE} />
      <R x={98} y={144} w={40} h={22} rx={11} fill={BRAND} style={anim("cr-trk", "4.6s", { op: 1 })} />
      <C cx={109} cy={155} r={7} fill={INK} style={anim("cr-knobT", "4.6s", { ease: "cubic-bezier(.34,1.4,.64,1)", base: "translateX(18px)" })} />
      <Tx x={150} y={159.5} size={12} w={500}>Start with Windows</Tx>
    </Scene>
  );
}

/* ── small pieces used by the live demo and the privacy rows ─────────────── */

export function Waveform() {
  return (
    <div className="flex h-7 items-center gap-[3px]">
      {Array.from({ length: 7 }, (_, i) => (
        <span
          key={i}
          style={{
            width: 3,
            height: 28,
            borderRadius: 2,
            background: TL,
            transform: "scaleY(0.5)",
            animation: `cr-bar ${(0.8 + ((i * 37) % 7) / 10).toFixed(1)}s cubic-bezier(.45,0,.2,1) ${-(i * 0.17).toFixed(2)}s infinite both`,
            animationPlayState: "var(--play, running)",
          }}
        />
      ))}
    </div>
  );
}

export function MiniWeather() {
  return (
    <svg viewBox="0 0 40 40" width={40} height={40} aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
      <g style={anim("cr-spin", "14s", { ease: "linear" })}>
        <Rays cx={15} cy={15} r1={10} r2={13.5} sw={1.6} />
      </g>
      <C cx={15} cy={15} r={7} fill={INK} />
      <g style={anim("cr-drift2", "5s")}>
        <P d="M12 33a6 6 0 0 1 1-11.9 8.5 8.5 0 0 1 16-1.6 7 7 0 0 1 4 13.5z" fill="#2a2a35" stroke="rgba(255,255,255,0.2)" sw={1} />
      </g>
    </svg>
  );
}

/** A glowing packet travelling a dotted line: the picture of one network call. */
export function Packet({ delay }: { delay: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        animation: `cr-packet 2.8s cubic-bezier(.45,0,.25,1) ${delay}s infinite both`,
        animationPlayState: "var(--play, running)",
      }}
    >
      <div
        className="absolute top-1/2 right-0 -mt-1 h-2 w-2 rounded-full"
        style={{ background: TL, boxShadow: "0 0 12px 2px rgba(91,77,255,0.7)" }}
      />
    </div>
  );
}
