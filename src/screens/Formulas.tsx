import { useState, type ReactNode } from "react";
import { Figure, type FigureName } from "../ui/figures.tsx";

type Sheet = "all" | "numbers" | "algebra" | "shapes" | "science" | "day";
type Tint = "lilac" | "mint" | "sun" | "peach";

const SHEETS: { id: Sheet; label: string }[] = [
  { id: "all", label: "All" },
  { id: "numbers", label: "Numbers" },
  { id: "algebra", label: "Algebra" },
  { id: "shapes", label: "Shapes" },
  { id: "science", label: "Science" },
  { id: "day", label: "Exam day" },
];

const SQUARES: [number, number][] = [
  [11, 121],
  [12, 144],
  [13, 169],
  [14, 196],
  [15, 225],
  [16, 256],
  [17, 289],
  [18, 324],
  [19, 361],
  [20, 400],
  [25, 625],
];

const CUBES: [number, number][] = [
  [1, 1],
  [2, 8],
  [3, 27],
  [4, 64],
  [5, 125],
  [6, 216],
  [7, 343],
  [8, 512],
  [9, 729],
  [10, 1000],
];

function Frac({ top, bottom }: { top: string; bottom: string }) {
  return (
    <span className="frac">
      <span>{top}</span>
      <span>{bottom}</span>
    </span>
  );
}

function Rule({
  tint,
  kicker,
  lines,
  hint,
  figure,
}: {
  tint: Tint;
  kicker: string;
  lines: ReactNode[];
  hint: string;
  figure?: FigureName;
}) {
  return (
    <article className={`formula-card ${tint}`}>
      <p className="formula-kicker">{kicker}</p>
      {lines.map((line, index) => (
        <p className="formula-line" key={index}>{line}</p>
      ))}
      {figure ? <Figure name={figure} /> : null}
      <p className="formula-hint">{hint}</p>
    </article>
  );
}

function Board({
  label,
  pairs,
  mark,
}: {
  label: string;
  pairs: [number, number][];
  mark: string;
}) {
  return (
    <div className="memory-board" aria-label={label}>
      {pairs.map(([n, value]) => (
        <div className="memory-cell" key={n} aria-label={`${n} ${mark} is ${value}`}>
          <span>{n}{mark}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export function Formulas() {
  const [sheet, setSheet] = useState<Sheet>("all");
  const show = (id: Sheet) => sheet === "all" || sheet === id;

  return (
    <div className="stack formula-sheet">
      <section className="card">
        <p className="eyebrow">10 and 11 December · read only</p>
        <h1>Formula sheet</h1>
        <p className="lede">One card is one rule. Read the big line, then the white strip under it.</p>
      </section>

      <div className="chips sheet-jumps" role="group" aria-label="Formula groups">
        {SHEETS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={sheet === item.id ? "chip on" : "chip"}
            aria-pressed={sheet === item.id}
            onClick={() => setSheet(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className={show("numbers") ? "formula-group" : "formula-group is-off"} hidden={!show("numbers")} aria-label="Numbers">
        <h2>Numbers</h2>
        <p className="quiet">Say the squares and cubes until the answer comes before you calculate it.</p>
        <Board label="Squares from 11 to 25" pairs={SQUARES} mark="²" />
        <p className="formula-strip">A square never ends in 2, 3, 7 or 8.</p>
        <Board label="Cubes from 1 to 10" pairs={CUBES} mark="³" />
        <p className="formula-strip">Ones digit of a cube root: 2 swaps with 8, 3 swaps with 7. The rest stay.</p>
        <Rule
          tint="lilac"
          kicker="Add fractions"
          lines={[
            <>
              <Frac top="a" bottom="b" /> + <Frac top="c" bottom="d" /> = <Frac top="ad + bc" bottom="bd" />
            </>,
          ]}
          hint="1/2 + 1/3 = 5/6. The bottoms become 6. The tops become 3 and 2."
        />
        <Rule
          tint="mint"
          kicker="Divide fractions"
          lines={[<>Flip the second fraction, then multiply.</>]}
          hint="1/2 ÷ 1/4 = 1/2 × 4/1 = 2. Zero has no reciprocal."
        />
        <Rule
          tint="sun"
          kicker="Which fraction is bigger"
          lines={[<>Cross-multiply. Bigger product, bigger fraction.</>]}
          hint="3/5 and 5/8. 3 × 8 = 24 and 5 × 5 = 25, so 5/8 is bigger."
          figure="compare-fractions"
        />
        <Rule
          tint="peach"
          kicker="Powers"
          lines={[
            <>Same base, multiply: add the powers.</>,
            <>Same base, divide: subtract the powers.</>,
            <>A power of a power: multiply the powers.</>,
          ]}
          hint="2³ × 2² = 2⁵. a⁵ ÷ a² = a³. (a³)² = a⁶."
        />
        <Rule
          tint="lilac"
          kicker="Zero and negative powers"
          lines={[
            <>a⁰ = 1</>,
            <>a⁻ⁿ = 1 / aⁿ</>,
          ]}
          hint="5⁰ = 1. 2⁻³ = 1/8. 0⁰ is not used."
          figure="negative-power"
        />
        <Rule
          tint="mint"
          kicker="HCF and LCM"
          lines={[<>HCF × LCM = the product of the two numbers</>]}
          hint="12 and 18. HCF is 6, LCM is 36. 6 × 36 = 12 × 18."
        />
        <Rule
          tint="sun"
          kicker="Temperature"
          lines={[
            <>°F = °C × 9/5 + 32</>,
            <>°C = (°F − 32) × 5/9</>,
          ]}
          hint="0°C is 32°F. 100°C is 212°F."
        />
        <Rule
          tint="peach"
          kicker="Signs"
          lines={[<>Same signs give +. Different signs give −.</>]}
          hint="(−3) × (−4) = 12. (−3) × 4 = −12."
          figure="sign-grid"
        />
      </section>

      <section className={show("algebra") ? "formula-group" : "formula-group is-off"} hidden={!show("algebra")} aria-label="Algebra">
        <h2>Algebra and money</h2>
        <Rule
          tint="lilac"
          kicker="Square of a sum"
          lines={[<>(a + b)² = a² + 2ab + b²</>]}
          hint="12² = (10 + 2)² = 100 + 40 + 4 = 144."
          figure="a-plus-b"
        />
        <Rule
          tint="mint"
          kicker="Square of a difference"
          lines={[<>(a − b)² = a² − 2ab + b²</>]}
          hint="8² = (10 − 2)² = 100 − 40 + 4 = 64."
        />
        <Rule
          tint="sun"
          kicker="Difference of squares"
          lines={[<>a² − b² = (a − b)(a + b)</>]}
          hint="51² − 49² = (51 − 49)(51 + 49) = 2 × 100 = 200."
        />
        <Rule
          tint="peach"
          kicker="Two brackets"
          lines={[<>(x + a)(x + b) = x² + (a + b)x + ab</>]}
          hint="(x + 2)(x + 3) = x² + 5x + 6."
        />
        <Rule
          tint="lilac"
          kicker="Percent"
          lines={[
            <>
              x% of N = <Frac top="x" bottom="100" /> × N
            </>,
          ]}
          hint="20% of 150 = 30. Profit and loss are a percent of the cost price."
        />
        <Rule
          tint="mint"
          kicker="Simple interest"
          lines={[
            <>
              Interest = <Frac top="P × R × T" bottom="100" />
            </>,
          ]}
          hint="₹1000 at 10% for 2 years earns ₹200. Amount = 1000 + 200 = ₹1200."
        />
        <Rule
          tint="sun"
          kicker="Two years at 10% compound"
          lines={[<>Amount = principal × 1.21</>]}
          hint="₹1000 becomes ₹1210. The interest is ₹210, not ₹2100. 1.10 × 1.10 = 1.21."
        />
        <Rule
          tint="peach"
          kicker="Work together"
          lines={[
            <>
              Days = <Frac top="a × b" bottom="a + b" />
            </>,
          ]}
          hint="A alone takes 6 days, B alone takes 3. Together they take 2 days."
        />
        <Rule
          tint="lilac"
          kicker="Ratio"
          lines={[
            <>
              One part of a : b is <Frac top="a" bottom="a + b" /> of the total
            </>,
          ]}
          hint="2 : 3 of 50. One part is 10, so the shares are 20 and 30."
        />
        <Rule
          tint="mint"
          kicker="Do not swap these"
          lines={[<>Discount comes off the marked price. Profit is on the cost price.</>]}
          hint="Marked ₹200, 10% off, selling price ₹180. Cost ₹100, sold at ₹120, profit is 20%."
        />
      </section>

      <section className={show("shapes") ? "formula-group" : "formula-group is-off"} hidden={!show("shapes")} aria-label="Shapes">
        <h2>Shapes and data</h2>
        <div className="recall-grid">
          <div className="recall-tile">
            <strong>180°</strong>
            <span>angles in a triangle</span>
          </div>
          <div className="recall-tile">
            <strong>360°</strong>
            <span>angles in a quadrilateral, or all exterior angles</span>
          </div>
          <div className="recall-tile">
            <strong>(n − 2) × 180°</strong>
            <span>interior angles of a polygon</span>
          </div>
          <div className="recall-tile">
            <strong>V − E + F = 2</strong>
            <span>vertices, edges, faces of a solid</span>
          </div>
        </div>
        <Rule
          tint="lilac"
          kicker="Triangle"
          lines={[<>Area = ½ × base × height</>, <>Right triangle: a² + b² = c²</>]}
          hint="Base 8, height 5, area 20. 3, 4, 5 is a right triangle. 6, 8, 10 is the same triangle doubled."
          figure="pythagoras"
        />
        <Rule
          tint="mint"
          kicker="Rectangle and square"
          lines={[<>Rectangle area = l × b, perimeter = 2(l + b)</>, <>Square area = side², perimeter = 4 × side</>]}
          hint="5 by 4: area 20, perimeter 18."
          figure="rectangle"
        />
        <Rule
          tint="sun"
          kicker="Circle"
          lines={[<>Area = πr²</>, <>Circumference = 2πr</>]}
          hint="Radius 7, use π = 22/7. Area 154. Circumference 44."
          figure="circle"
        />
        <Rule
          tint="peach"
          kicker="Other areas"
          lines={[<>Parallelogram = base × height</>, <>Trapezium = ½ × (parallel sides) × height</>]}
          hint="Parallel sides 6 and 4, height 5. Area = ½ × 10 × 5 = 25."
        />
        <Rule
          tint="lilac"
          kicker="Cuboid and cube"
          lines={[<>Cuboid volume = l × b × h</>, <>Surface = 2(lb + bh + hl)</>, <>Cube volume = side³, surface = 6 × side²</>]}
          hint="2 × 3 × 4. Volume 24. Surface 2(6 + 12 + 8) = 52."
          figure="cuboid"
        />
        <Rule
          tint="mint"
          kicker="Cylinder"
          lines={[<>Volume = πr²h</>, <>Curved surface = 2πrh</>]}
          hint="Radius 7, height 10, π = 22/7. Volume 1540. Curved surface 440."
        />
        <Rule
          tint="sun"
          kicker="Regular polygon"
          lines={[<>Each exterior angle = 360° ÷ sides</>, <>Diagonals = n(n − 3) / 2</>]}
          hint="A regular hexagon: each exterior angle is 60°. Diagonals = 9. Interior sum = 720°."
        />
        <Rule
          tint="peach"
          kicker="Mean, pie, chance"
          lines={[
            <>Mean = sum ÷ how many</>,
            <>Pie angle = (value ÷ total) × 360°</>,
            <>Probability = favourable ÷ total</>,
          ]}
          hint="4, 6, 8, 10. Mean is 7. 20 out of 80 is a 90° slice. 3 red and 6 blue: P(red) = 1/3."
        />
        <p className="formula-strip">1 m² = 10,000 cm². You square the 100, you do not just add two zeros once.</p>
      </section>

      <section className={show("science") ? "formula-group" : "formula-group is-off"} hidden={!show("science")} aria-label="Science">
        <h2>Science</h2>
        <Rule
          tint="lilac"
          kicker="Pressure"
          lines={[<>Pressure = force ÷ area</>]}
          hint="20 N on 0.5 m² is 40 pascal. A smaller area means more pressure. Unit is N/m²."
          figure="pressure"
        />
        <Rule
          tint="mint"
          kicker="Speed"
          lines={[<>Speed = distance ÷ time</>]}
          hint="100 m in 20 s is 5 m/s. A flat line on a distance–time graph means the object is still."
        />
        <Rule
          tint="sun"
          kicker="Echo"
          lines={[<>Distance to the wall = speed × time ÷ 2</>]}
          hint="Sound in air is about 340 m/s. If the echo takes 2 s, the wall is 340 m away. Divide by 2 because the sound goes and comes back."
          figure="echo"
        />
        <Rule
          tint="peach"
          kicker="Reflection"
          lines={[<>Angle of reflection = angle of incidence</>]}
          hint="If the ray hits at 30° to the normal, it leaves at 30°. Images in two mirrors = 360/θ − 1. At 90° that is 3 images."
          figure="reflection"
        />
        <div className="recall-grid">
          <div className="recall-tile">
            <strong>20 Hz</strong>
            <span>lowest a person hears</span>
          </div>
          <div className="recall-tile">
            <strong>20,000 Hz</strong>
            <span>highest a person hears</span>
          </div>
          <div className="recall-tile">
            <strong>340 m/s</strong>
            <span>sound in air, about</span>
          </div>
          <div className="recall-tile">
            <strong>no vacuum</strong>
            <span>sound needs a material</span>
          </div>
        </div>
        <Rule
          tint="lilac"
          kicker="Loud or high"
          lines={[<>Loudness is amplitude. Pitch is frequency.</>]}
          hint="A bigger vibration is louder. More vibrations each second is a higher note. Do not swap these."
        />
        <Rule
          tint="mint"
          kicker="Acids and bases"
          lines={[<>Acid + base → salt + water</>]}
          hint="Acid turns blue litmus red. Base turns red litmus blue. Turmeric turns red in a base."
          figure="litmus"
        />
        <Rule
          tint="sun"
          kicker="Oxides"
          lines={[<>Metal oxide: basic. Non-metal oxide: acidic.</>]}
          hint="Graphite is the non-metal that conducts. Mercury is the metal that is a liquid."
        />
      </section>

      <section className={show("day") ? "formula-group" : "formula-group is-off"} hidden={!show("day")} aria-label="Exam day">
        <h2>Exam day</h2>
        <article className="formula-card day-card">
          <p className="formula-kicker">Every bubble</p>
          <p className="formula-line">A blank scores the same as a wrong answer.</p>
          <p className="formula-hint">There is no negative marking. Attempt all 200.</p>
        </article>
        <article className="formula-card day-card">
          <p className="formula-kicker">The pass mark</p>
          <p className="formula-line">50% in Paper 1 and 50% in Paper 2.</p>
          <p className="formula-hint">Paper 1 is English, Hindi and Social Science. Paper 2 is Maths and Science. A high total does not rescue a paper under 50.</p>
        </article>
        <article className="formula-card day-card">
          <p className="formula-kicker">If scores are equal</p>
          <p className="formula-line">Maths, then Science, English, SST, Hindi.</p>
          <p className="formula-hint">A tie on the total is broken in that order.</p>
        </article>
      </section>
    </div>
  );
}
