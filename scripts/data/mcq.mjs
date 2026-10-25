export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a || 1;
}

export function frac(n, d) {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d);
  n /= g;
  d /= g;
  if (d === 1) return String(n);
  return n < 0 ? `-${Math.abs(n)}/${d}` : `${n}/${d}`;
}

export function mcq(topicId, i, stem, correct, wrongs, explanation) {
  const c = String(correct);
  const ws = [];
  for (const w of wrongs) {
    const s = String(w);
    if (s !== c && !ws.includes(s)) ws.push(s);
  }
  if (ws.length < 3) {
    throw new Error(
      `Need 3 wrong options for ${topicId} #${i + 1}: ${stem}\ncorrect=${c}\nwrongs=${wrongs.join(" | ")}`,
    );
  }
  const three = ws.slice(0, 3);
  const answer = i % 4;
  const options = [];
  let w = 0;
  for (let k = 0; k < 4; k++) options.push(k === answer ? c : three[w++]);
  if (new Set(options).size !== 4) {
    throw new Error(`Duplicate options for ${topicId} #${i + 1}`);
  }
  return {
    id: `${topicId}-${String(i + 1).padStart(2, "0")}`,
    stem,
    options,
    answer,
    explanation,
  };
}

export function fromRows(topicId, rows) {
  return rows.map((row, i) => {
    const [stem, correct, w1, w2, w3, explanation] = row;
    return mcq(topicId, i, stem, correct, [w1, w2, w3], explanation);
  });
}
