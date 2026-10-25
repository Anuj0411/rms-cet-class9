export function Formulas() {
  return (
    <article className="card formula">
      <p className="eyebrow">10 and 11 December · read only</p>
      <h1>Formula sheet</h1>
      <details className="fold inner" open>
        <summary>Mathematics</summary>
      <ul>
        <li>a/b + c/d = (ad + bc) / bd. To divide by a fraction, multiply by its reciprocal.</li>
        <li>(a + b)² = a² + 2ab + b². (a − b)² = a² − 2ab + b². a² − b² = (a − b)(a + b).</li>
        <li>Simple interest = PRT / 100. Two years at 10% compound: multiply the principal by 1.21.</li>
        <li>Together, A and B finish a job in ab / (a + b) days.</li>
        <li>Triangle area = half × base × height. Circle area = πr². Cuboid volume = lbh. Cylinder curved surface = 2πrh.</li>
        <li>Triangle angles add to 180°. Polygon interior sum = (n − 2) × 180°. Exterior angles add to 360°. V − E + F = 2.</li>
        <li>Mean = sum / count. Pie angle = (value / total) × 360°. Probability = favourable / total.</li>
      </ul>
      </details>
      <details className="fold inner">
        <summary>Science</summary>
      <ul>
        <li>Pressure = force / area, in pascal. Echo distance = speed × time / 2.</li>
        <li>Angle of reflection = angle of incidence. Images between two mirrors = 360/θ − 1.</li>
        <li>Speed = distance / time. Audible sound is 20 Hz to 20,000 Hz. No sound in a vacuum.</li>
        <li>Metal oxides are basic. Non-metal oxides are acidic or neutral. Neutralisation makes salt and water.</li>
      </ul>
      </details>
      <details className="fold inner">
        <summary>On the day</summary>
      <p>Attempt every question. A blank and a wrong answer both score zero. Do not leave Paper 1 or Paper 2 under 50.</p>
      </details>
    </article>
  );
}

export function Interview() {
  return (
    <article className="card">
      <p className="eyebrow">After the written paper and the medical</p>
      <h1>Interview checklist</h1>
      <p>The interview is 50 marks, and it also has a pass mark. It is not part of these tests. Use this list in March, not instead of Maths and Science now.</p>
      <ul className="checklist">
        <li>Why he wants Rashtriya Military School, in two or three honest sentences.</li>
        <li>His father's or mother's service, in plain words, if it applies. No memorised speech.</li>
        <li>One game he plays, one book he has actually read, and one news event from the last month.</li>
        <li>A short answer on teamwork, honesty, and what he does when he loses.</li>
        <li>Practice standing, greeting, and speaking slowly. The board is listening for sense, not for big words.</li>
      </ul>
    </article>
  );
}
