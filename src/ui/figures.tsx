import type { ReactNode } from "react";

export type FigureName =
  | "fraction"
  | "compare-fractions"
  | "number-line"
  | "sign-grid"
  | "negative-power"
  | "a-plus-b"
  | "balance"
  | "rectangle"
  | "circle"
  | "cuboid"
  | "triangle-180"
  | "pythagoras"
  | "axes"
  | "pie"
  | "polygon"
  | "cells"
  | "pressure"
  | "echo"
  | "reflection"
  | "litmus"
  | "fire"
  | "seasons"
  | "tenses"
  | "voice"
  | "parliament"
  | "dates"
  | "upma";

const FIGURE_AT: Record<string, { index: number; name: FigureName }[]> = {
  "m-rational": [
    { index: 0, name: "fraction" },
    { index: 7, name: "compare-fractions" },
  ],
  "m-integers": [
    { index: 0, name: "number-line" },
    { index: 2, name: "sign-grid" },
  ],
  "m-exponents": [{ index: 3, name: "negative-power" }],
  "m-algebra": [{ index: 0, name: "a-plus-b" }],
  "m-equations": [{ index: 0, name: "balance" }],
  "m-mensuration": [
    { index: 0, name: "rectangle" },
    { index: 3, name: "circle" },
    { index: 4, name: "cuboid" },
  ],
  "m-triangles": [
    { index: 0, name: "triangle-180" },
    { index: 2, name: "pythagoras" },
  ],
  "m-quads": [{ index: 4, name: "polygon" }],
  "m-data": [{ index: 3, name: "pie" }],
  "m-graphs": [{ index: 0, name: "axes" }],
  "s-cell": [{ index: 2, name: "cells" }],
  "s-crop": [{ index: 0, name: "seasons" }],
  "s-force": [{ index: 2, name: "pressure" }],
  "s-sound": [{ index: 4, name: "echo" }],
  "s-light": [{ index: 1, name: "reflection" }],
  "s-acids": [{ index: 0, name: "litmus" }],
  "s-combustion": [{ index: 0, name: "fire" }],
  "e-tenses": [{ index: 0, name: "tenses" }],
  "e-voice": [{ index: 0, name: "voice" }],
  "h-alankar": [{ index: 3, name: "upma" }],
  "t-constitution": [{ index: 0, name: "dates" }],
  "t-parliament": [{ index: 0, name: "parliament" }],
};

export function figureFor(topicId: string | undefined, index: number) {
  if (!topicId) return undefined;
  return FIGURE_AT[topicId]?.find((item) => item.index === index)?.name;
}

const ink = "#243044";
const muted = "#5c6b80";
const teal = "#0e9f8f";
const coral = "#e07a5f";
const font = "Noto Sans, Noto Sans Devanagari, sans-serif";

function T({
  x,
  y,
  children,
  fill = ink,
  size = 14,
  anchor = "middle",
  weight = 500,
}: {
  x: number;
  y: number;
  children: ReactNode;
  fill?: string;
  size?: number;
  anchor?: "middle" | "start" | "end";
  weight?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight={weight} fontFamily={font}>
      {children}
    </text>
  );
}

function Frame({
  label,
  caption,
  children,
  h = 168,
}: {
  label: string;
  caption: string;
  children: ReactNode;
  h?: number;
}) {
  return (
    <figure className="note-figure">
      <svg viewBox={`0 0 360 ${h}`} role="img" aria-label={label}>
        {children}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Card({ caption, label, children }: { caption: string; label: string; children: ReactNode }) {
  return (
    <figure className="note-figure" aria-label={label}>
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function Figure({ name }: { name: FigureName }) {
  switch (name) {
    case "fraction":
      return (
        <Frame label="A fraction p over q. q is never zero." caption="p is the top. q is the bottom, and q is never 0." h={150}>
          <T x={180} y={48} size={28}>p</T>
          <line x1={150} y1={62} x2={210} y2={62} stroke={ink} strokeWidth={2} />
          <T x={180} y={96} size={28}>q</T>
          <T x={250} y={78} fill={coral} anchor="start" size={16}>q ≠ 0</T>
        </Frame>
      );
    case "compare-fractions":
      return (
        <Card label="Cross-multiply 3/5 and 5/8" caption="25 is bigger than 24, so 5/8 is the larger fraction.">
          <div className="pair">
            <div>
              <strong>3/5</strong>
              <span>3 × 8 = 24</span>
            </div>
            <div>
              <strong>5/8</strong>
              <span>5 × 5 = 25</span>
            </div>
          </div>
        </Card>
      );
    case "number-line":
      return (
        <Frame label="Number line from negative two to positive two" caption="Left of 0 is negative. Right of 0 is positive." h={90}>
          <line x1={30} y1={40} x2={330} y2={40} stroke={ink} strokeWidth={2} />
          <polygon points="330,40 318,34 318,46" fill={ink} />
          {[0, 1, 2, 3, 4].map((step) => (
            <g key={step}>
              <line x1={50 + step * 60} y1={32} x2={50 + step * 60} y2={48} stroke={ink} strokeWidth={2} />
              <T x={50 + step * 60} y={70} fill={step < 2 ? coral : teal}>{step - 2}</T>
            </g>
          ))}
        </Frame>
      );
    case "sign-grid":
      return (
        <Card label="Sign rules for multiplication" caption="Same signs give a positive answer. Different signs give a negative answer.">
          <table className="mini-table">
            <thead>
              <tr><th>×</th><th>+</th><th>−</th></tr>
            </thead>
            <tbody>
              <tr><th>+</th><td>+</td><td>−</td></tr>
              <tr><th>−</th><td>−</td><td>+</td></tr>
            </tbody>
          </table>
        </Card>
      );
    case "negative-power":
      return (
        <Frame label="Five to the power minus 2 equals 1 over 25" caption="A negative power means 1 over the positive power." h={140}>
          <T x={90} y={78} size={26}>5⁻²</T>
          <T x={150} y={78} size={26}>=</T>
          <T x={230} y={52} size={26}>1</T>
          <line x1={200} y1={66} x2={260} y2={66} stroke={ink} strokeWidth={2} />
          <T x={230} y={100} size={26}>25</T>
        </Frame>
      );
    case "a-plus-b":
      return (
        <Frame label="Square split into a squared, two rectangles ab, and b squared" caption="(a + b)² = a² + ab + ab + b² = a² + 2ab + b²." h={230}>
          <rect x={70} y={34} width={120} height={120} fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <rect x={190} y={34} width={70} height={120} fill="#fff4ee" stroke={coral} strokeWidth={2} />
          <rect x={70} y={154} width={120} height={70} fill="#fff4ee" stroke={coral} strokeWidth={2} />
          <rect x={190} y={154} width={70} height={70} fill="#f4f7fb" stroke={ink} strokeWidth={2} />
          <T x={130} y={100}>a²</T>
          <T x={225} y={100}>ab</T>
          <T x={130} y={194}>ab</T>
          <T x={225} y={194}>b²</T>
          <T x={130} y={22} fill={teal}>a</T>
          <T x={225} y={22} fill={coral}>b</T>
        </Frame>
      );
    case "balance":
      return (
        <Frame label="A balance with 2x + 1 on the left and 5 on the right" caption="Do the same thing to both sides, and the equation stays true." h={150}>
          <line x1={40} y1={48} x2={320} y2={48} stroke={ink} strokeWidth={3} />
          <polygon points="180,48 166,78 194,78" fill={teal} />
          <line x1={180} y1={78} x2={180} y2={118} stroke={ink} strokeWidth={3} />
          <line x1={140} y1={118} x2={220} y2={118} stroke={ink} strokeWidth={3} />
          <T x={80} y={36} size={16}>2x + 1</T>
          <T x={280} y={36} size={16}>5</T>
        </Frame>
      );
    case "rectangle":
      return (
        <Frame label="A rectangle of length and breadth" caption="Area = length × breadth. Perimeter = 2 × (length + breadth)." h={150}>
          <rect x={80} y={36} width={200} height={80} fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <T x={180} y={82}>area</T>
          <T x={180} y={28} fill={muted} size={13}>length</T>
          <T x={60} y={82} fill={muted} size={13} anchor="end">breadth</T>
        </Frame>
      );
    case "circle":
      return (
        <Frame label="A circle with radius r" caption="Area = πr². The distance around is 2πr." h={170}>
          <circle cx={160} cy={88} r={58} fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <line x1={160} y1={88} x2={218} y2={88} stroke={coral} strokeWidth={2} />
          <T x={190} y={80} fill={coral} size={13}>r</T>
          <T x={300} y={80} anchor="start" size={13}>area πr²</T>
          <T x={300} y={104} anchor="start" size={13}>around 2πr</T>
        </Frame>
      );
    case "cuboid":
      return (
        <Frame label="A cuboid with length, breadth and height" caption="Volume = length × breadth × height." h={170}>
          <polygon points="90,70 210,70 250,40 130,40" fill="#fff4ee" stroke={coral} strokeWidth={2} />
          <polygon points="90,70 90,130 210,130 210,70" fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <polygon points="210,70 250,40 250,100 210,130" fill="#f4f7fb" stroke={ink} strokeWidth={2} />
          <T x={150} y={150} size={13}>length</T>
          <T x={268} y={78} anchor="start" size={13}>breadth</T>
          <T x={70} y={104} anchor="end" size={13}>height</T>
        </Frame>
      );
    case "triangle-180":
      return (
        <Frame label="A triangle whose three angles add to 180 degrees" caption="Add the three inside angles. The total is always 180°." h={160}>
          <polygon points="180,28 70,130 290,130" fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <T x={180} y={58} size={13}>A</T>
          <T x={96} y={122} size={13}>B</T>
          <T x={264} y={122} size={13}>C</T>
          <T x={180} y={152} size={13}>A + B + C = 180°</T>
        </Frame>
      );
    case "pythagoras":
      return (
        <Frame label="A right triangle with sides 3, 4 and 5" caption="Only for a right triangle: 3² + 4² = 5²." h={160}>
          <polygon points="90,140 90,60 210,140" fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <polyline points="90,122 108,122 108,140" fill="none" stroke={coral} strokeWidth={2} />
          <T x={74} y={104} anchor="end" size={13}>3</T>
          <T x={150} y={156} size={13}>4</T>
          <T x={162} y={92} size={13}>5</T>
        </Frame>
      );
    case "axes":
      return (
        <Frame label="Coordinate axes with a point in the first quadrant" caption="(x, y): x is across, y is up. (2, 3) is 2 right and 3 up." h={180}>
          <line x1={30} y1={90} x2={330} y2={90} stroke={ink} strokeWidth={2} />
          <line x1={180} y1={20} x2={180} y2={164} stroke={ink} strokeWidth={2} />
          <circle cx={240} cy={48} r={5} fill={coral} />
          <T x={258} y={44} anchor="start" fill={coral} size={13}>(2, 3)</T>
          <T x={344} y={94} anchor="end" size={12}>x</T>
          <T x={188} y={18} anchor="start" size={12}>y</T>
          <T x={168} y={106} anchor="end" size={12}>0</T>
        </Frame>
      );
    case "pie":
      return (
        <Frame label="A pie chart with a quarter slice of 90 degrees" caption="Angle = (that part ÷ total) × 360°. A quarter of the circle is 90°." h={160}>
          <circle cx={150} cy={84} r={52} fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <path d="M150 84 L150 32 A52 52 0 0 1 202 84 Z" fill={coral} />
          <T x={280} y={88} anchor="start" size={14}>90°</T>
        </Frame>
      );
    case "polygon":
      return (
        <Frame label="A polygon with one exterior angle marked" caption="Walk around the outside. All the exterior angles add to 360°." h={150}>
          <polygon points="180,24 280,70 246,140 114,140 80,70" fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <line x1={280} y1={70} x2={336} y2={48} stroke={coral} strokeWidth={2} />
          <T x={328} y={40} fill={coral} size={13}>exterior</T>
        </Frame>
      );
    case "cells":
      return (
        <Card label="A plant cell beside an animal cell" caption="A plant cell has a wall, chloroplasts and a large vacuole. An animal cell does not.">
          <div className="pair">
            <div>
              <strong>Plant cell</strong>
              <span>wall + membrane</span>
              <span>chloroplasts</span>
              <span>large vacuole</span>
            </div>
            <div>
              <strong>Animal cell</strong>
              <span>membrane only</span>
              <span>no chloroplast</span>
              <span>small vacuoles</span>
            </div>
          </div>
        </Card>
      );
    case "pressure":
      return (
        <Frame label="The same force on a narrow base and a wide base" caption="Same force, smaller area, more pressure. A wide foot sinks less." h={160}>
          <line x1={70} y1={36} x2={70} y2={78} stroke={coral} strokeWidth={3} />
          <polygon points="70,28 62,40 78,40" fill={coral} />
          <rect x={52} y={78} width={36} height={48} fill="#fff4ee" stroke={coral} strokeWidth={2} />
          <T x={70} y={148} size={12}>more pressure</T>
          <line x1={250} y1={36} x2={250} y2={78} stroke={teal} strokeWidth={3} />
          <polygon points="250,28 242,40 258,40" fill={teal} />
          <rect x={190} y={78} width={120} height={48} fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <T x={250} y={148} size={12}>less pressure</T>
          <T x={180} y={24} size={12}>same force</T>
        </Frame>
      );
    case "echo":
      return (
        <Frame label="Sound going to a wall and coming back" caption="The sound travels twice the distance, so divide speed × time by 2." h={130}>
          <circle cx={58} cy={70} r={16} fill="#e7f7f4" stroke={teal} strokeWidth={2} />
          <T x={58} y={74} size={11}>you</T>
          <rect x={300} y={28} width={18} height={90} fill="#243044" />
          <path d="M80 52 Q180 20 292 52" fill="none" stroke={coral} strokeWidth={2} />
          <path d="M292 90 Q180 122 80 90" fill="none" stroke={teal} strokeWidth={2} />
          <T x={180} y={18} size={12} fill={coral}>going</T>
          <T x={180} y={124} size={12} fill={teal}>coming back</T>
        </Frame>
      );
    case "reflection":
      return (
        <Frame label="A ray hitting a mirror and bouncing off at the same angle" caption="The incoming angle equals the outgoing angle. Both are measured from the normal." h={160}>
          <line x1={250} y1={16} x2={250} y2={148} stroke={ink} strokeWidth={3} />
          <line x1={90} y1={80} x2={250} y2={80} stroke={muted} strokeWidth={1.5} strokeDasharray="4 4" />
          <line x1={70} y1={30} x2={250} y2={80} stroke={coral} strokeWidth={2} />
          <line x1={250} y1={80} x2={70} y2={130} stroke={teal} strokeWidth={2} />
          <T x={100} y={48} fill={coral} size={12}>in</T>
          <T x={100} y={128} fill={teal} size={12}>out</T>
          <T x={150} y={74} fill={muted} size={12}>normal</T>
          <T x={268} y={84} anchor="start" size={12}>mirror</T>
        </Frame>
      );
    case "litmus":
      return (
        <Card label="What acids and bases do to litmus" caption="Acid turns blue litmus red. Base turns red litmus blue. Do not taste the chemical.">
          <div className="pair">
            <div>
              <strong>Acid</strong>
              <span>sour</span>
              <span>blue litmus → red</span>
            </div>
            <div>
              <strong>Base</strong>
              <span>bitter, soapy</span>
              <span>red litmus → blue</span>
            </div>
          </div>
        </Card>
      );
    case "fire":
      return (
        <Frame label="The fire triangle: fuel, oxygen and heat" caption="Take away any one side and the fire stops." h={170}>
          <polygon points="180,28 70,140 290,140" fill="none" stroke={coral} strokeWidth={2} />
          <T x={180} y={24} fill={coral} size={13}>heat</T>
          <T x={58} y={156} anchor="start" size={13}>fuel</T>
          <T x={302} y={156} anchor="end" size={13}>oxygen</T>
        </Frame>
      );
    case "seasons":
      return (
        <Card label="Kharif and rabi sowing months" caption="Kharif rides the rain. Rabi is sown when winter starts.">
          <div className="pair">
            <div>
              <strong>Kharif</strong>
              <span>June–July</span>
              <span>rice, maize, cotton</span>
            </div>
            <div>
              <strong>Rabi</strong>
              <span>October–November</span>
              <span>wheat, gram, pea</span>
            </div>
          </div>
        </Card>
      );
    case "tenses":
      return (
        <Card label="Past, present and future on one line" caption="Name the time first. Then pick the verb that matches that time.">
          <div className="trio">
            <div><strong>Past</strong><span>I met him yesterday.</span></div>
            <div><strong>Now</strong><span>I am reading.</span></div>
            <div><strong>Future</strong><span>She will help me.</span></div>
          </div>
        </Card>
      );
    case "voice":
      return (
        <Card label="The same event in active and passive voice" caption="Active starts with the doer. Passive starts with the receiver.">
          <div className="stack-bits">
            <p><b>Active.</b> The cat chased the rat.</p>
            <p><b>Passive.</b> The rat was chased by the cat.</p>
          </div>
        </Card>
      );
    case "parliament":
      return (
        <Card label="The two houses of Parliament" caption="Money bills start in the Lok Sabha. A bill becomes an Act after the President agrees.">
          <div className="pair">
            <div>
              <strong>Lok Sabha</strong>
              <span>elected by the people</span>
              <span>money bills start here</span>
            </div>
            <div>
              <strong>Rajya Sabha</strong>
              <span>elected by states</span>
              <span>cannot be dissolved</span>
            </div>
          </div>
        </Card>
      );
    case "dates":
      return (
        <Card label="Three dates that are easy to mix" caption="Independence, adoption, and the day the Constitution came into force are three different dates.">
          <div className="trio">
            <div><strong>15 Aug 1947</strong><span>Independence</span></div>
            <div><strong>26 Nov 1949</strong><span>adopted</span></div>
            <div><strong>26 Jan 1950</strong><span>came into force</span></div>
          </div>
        </Card>
      );
    case "upma":
      return (
        <Card label="The three parts of an उपमा" caption="हाथ is what we describe. कमल is what we compare it with. समान is the comparing word.">
          <div className="trio">
            <div><strong>हाथ</strong><span>उपमेय</span></div>
            <div><strong>समान</strong><span>वाचक</span></div>
            <div><strong>कमल</strong><span>उपमान</span></div>
          </div>
        </Card>
      );
    default:
      return null;
  }
}
