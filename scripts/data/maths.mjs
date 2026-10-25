import { frac, gcd, mcq } from "./mcq.mjs";

const COUNT = 30;

function topic(meta, make) {
  const questions = [];
  const seen = new Set();
  let cursor = 0;
  for (let slot = 0; slot < COUNT; slot++) {
    let q = make(cursor);
    let guard = 0;
    while (seen.has(q.stem)) {
      cursor += 1;
      guard += 1;
      if (guard > 40) {
        throw new Error(`${meta.id} ran out of unique stems near slot ${slot + 1}`);
      }
      q = make(cursor);
    }
    cursor += 1;
    seen.add(q.stem);
    q.id = `${meta.id}-${String(slot + 1).padStart(2, "0")}`;
    questions.push(q);
  }
  return { ...meta, subject: "maths", testSize: 15, questions };
}

function rational(i) {
  const id = "m-rational";
  const kind = i % 8;
  const shift = Math.floor(i / 8);
  if (kind === 0) {
    const a = 2 + (i % 6);
    const b = a + 2 + shift;
    const correct = frac(a, b);
    return mcq(
      id,
      i,
      `The additive inverse of −${a}/${b} is`,
      correct,
      [frac(-a, b), frac(b, a), frac(-b, a)],
      `The additive inverse of a number is what you add to it to get 0. −${a}/${b} + ${correct} = 0, so the inverse is ${correct}. −${a}/${b} is the number itself, not its inverse. ${frac(b, a)} and ${frac(-b, a)} are reciprocals, which multiply to 1 or −1. They do not add to 0.`,
    );
  }
  if (kind === 1) {
    const a = 2 + (i % 5);
    const b = a + 3 + shift;
    const correct = frac(b, a);
    return mcq(
      id,
      i,
      `The multiplicative inverse of ${a}/${b} is`,
      correct,
      [frac(-b, a), frac(a, b), frac(-a, b)],
      `The multiplicative inverse (reciprocal) of ${a}/${b} is ${correct}, because ${a}/${b} × ${correct} = 1. ${frac(a, b)} is the same number. ${frac(-b, a)} and ${frac(-a, b)} introduce a minus sign, so the product would be −1 or not 1.`,
    );
  }
  if (kind === 2) {
    const p = 1 + (i % 4);
    const q = 3 + shift;
    const r = 1 + ((i + 1) % 3);
    let s = 5 + (i % 4);
    if (s === q) s += 1;
    const correct = frac(p * s + r * q, q * s);
    return mcq(
      id,
      i,
      `Simplify ${p}/${q} + ${r}/${s}.`,
      correct,
      [frac(p + r, q + s), frac(p * s - r * q, q * s), frac(p * r, q * s), "0"],
      `To add fractions, use a common denominator. ${p}/${q} + ${r}/${s} = (${p}×${s} + ${r}×${q}) / (${q}×${s}) = ${p * s + r * q}/${q * s} = ${correct}. Adding tops and bottoms to get ${frac(p + r, q + s)} is not addition. ${frac(p * s - r * q, q * s)} is the subtraction. ${frac(p * r, q * s)} is the product of the numerators over the product of the denominators, which is not this sum.`,
    );
  }
  if (kind === 3) {
    const p = 3 + (i % 4);
    const q = 4 + shift;
    const r = 1 + (i % 3);
    const s = 2 + ((i + 2) % 4);
    const correct = frac(p * s - r * q, q * s);
    return mcq(
      id,
      i,
      `Simplify ${p}/${q} − ${r}/${s}.`,
      correct,
      [frac(p * s + r * q, q * s), frac(p - r, q - s === 0 ? q + s : q - s), frac(p * r, q * s), "0"],
      `Subtract with a common denominator: ${p}/${q} − ${r}/${s} = (${p}×${s} − ${r}×${q}) / (${q}×${s}) = ${correct}. ${frac(p * s + r * q, q * s)} adds instead of subtracting. ${frac(p - r, q - s)} subtracts tops and bottoms separately, which is not the rule. ${frac(p * r, q * s)} is a product, not a difference.`,
    );
  }
  if (kind === 4) {
    const p = 2 + (i % 4);
    const q = 3 + shift;
    const r = 2 + ((i + 1) % 4);
    const s = 5 + (i % 3);
    const correct = frac(p * r, q * s);
    return mcq(
      id,
      i,
      `Simplify ${p}/${q} × ${r}/${s}.`,
      correct,
      [frac(p * s, q * r), frac(p + r, q + s), frac(p * s + r * q, q * s), "0"],
      `Multiply numerators and denominators: ${p}/${q} × ${r}/${s} = ${p * r}/${q * s} = ${correct}. ${frac(p * s, q * r)} swaps the second fraction as if this were division. ${frac(p + r, q + s)} adds. ${frac(p * s + r * q, q * s)} is the addition formula.`,
    );
  }
  if (kind === 5) {
    const p = 2 + (i % 5);
    const q = 3 + shift;
    const r = 1 + ((i + 2) % 4);
    const s = 2 + (i % 4);
    const correct = frac(p * s, q * r);
    return mcq(
      id,
      i,
      `Simplify ${p}/${q} ÷ ${r}/${s}.`,
      correct,
      [frac(p * r, q * s), frac(q * r, p * s), frac(p * s - q * r, q * s), "0"],
      `Dividing by a fraction means multiplying by its reciprocal. ${p}/${q} ÷ ${r}/${s} = ${p}/${q} × ${s}/${r} = ${correct}. ${frac(p * r, q * s)} multiplies the fractions instead of dividing. ${frac(q * r, p * s)} is the reciprocal of the correct value. ${frac(p * s - q * r, q * s)} uses a subtraction pattern that does not belong here.`,
    );
  }
  if (kind === 6) {
    const a = 1 + (i % 4);
    const b = 5 + shift;
    const c = a + 2;
    let d = b + 3;
    if (a * d === c * b) d += 1;
    const first = frac(a, b);
    const second = frac(c, d);
    const correct = a * d > c * b ? first : second;
    const smaller = correct === first ? second : first;
    return mcq(
      id,
      i,
      `Which is larger: ${a}/${b} or ${c}/${d}?`,
      correct,
      [smaller, "They are equal", frac(a + c, b + d)],
      `Cross-multiply. ${a}×${d} = ${a * d} and ${c}×${b} = ${c * b}. The larger product belongs to the larger fraction, so ${correct} is larger. ${smaller} is the smaller one. They are not equal. ${frac(a + c, b + d)} adds the tops and the bottoms, which is not a comparison.`,
    );
  }
  const a = 1 + (i % 5);
  const b = 4 + shift;
  const c = a + 1;
  let d = b + 2;
  if (a * d === c * b) d += 1;
  const correct = frac(a * d + c * b, 2 * b * d);
  const added = frac(a + c, b + d);
  const summed = frac(a * d + c * b, b * d);
  return mcq(
    id,
    i,
    `A rational number lying exactly halfway between ${a}/${b} and ${c}/${d} is`,
    correct,
    [added, summed, frac(a, b), "0"],
    `The halfway value is the average. (${a}/${b} + ${c}/${d}) / 2 = ${correct}. ${added} adds the tops and the bottoms, which is a different number. ${summed} is the sum of the two fractions, not half of that sum. ${frac(a, b)} is one end of the interval, not the middle.`,
  );
}

function integers(i) {
  const id = "m-integers";
  const kind = i % 6;
  if (kind === 0) {
    const a = 8 + (i % 15);
    const b = 3 + (i % 7);
    const correct = String(-a + b);
    return mcq(
      id,
      i,
      `Simplify (−${a}) + ${b}.`,
      correct,
      [String(a + b), String(a - b), String(-a - b)],
      `Adding a positive number moves right on the number line. −${a} + ${b} = ${correct}. ${a + b} adds the absolute values and drops the sign. ${a - b} subtracts the wrong way. ${-a - b} subtracts ${b} instead of adding it.`,
    );
  }
  if (kind === 1) {
    const a = 3 + i;
    const b = 4 + (i % 4);
    const correct = String(a * b);
    return mcq(
      id,
      i,
      `Simplify (−${a}) × (−${b}).`,
      correct,
      [String(-a * b), String(a + b), String(-(a + b))],
      `The product of two negative integers is positive. (−${a}) × (−${b}) = ${correct}. ${-a * b} keeps a minus sign, which would be right only if one factor were negative. ${a + b} and ${-(a + b)} are sums, not products.`,
    );
  }
  if (kind === 2) {
    const k = 2 + i;
    const whole = 4 * k;
    const num = 3;
    const den = 4;
    const correct = String(3 * k);
    return mcq(
      id,
      i,
      `${num}/${den} of ${whole} is`,
      correct,
      [String(whole), String(whole * num), String(k)],
      `${num}/${den} of ${whole} means ${whole} × ${num}/${den} = ${correct}. ${whole} forgets to take the fraction. ${whole * num} multiplies by ${num} and never divides by ${den}. ${k} is only the multiplier used to build ${whole}, not the result.`,
    );
  }
  if (kind === 3) {
    const a = (15 + (i % 9)) / 10;
    const b = (25 + (i % 7)) / 10;
    const sum = Math.round((a + b) * 100) / 100;
    const correct = String(sum);
    return mcq(
      id,
      i,
      `Add ${a.toFixed(1)} + ${b.toFixed(1)}.`,
      correct,
      [String(Math.round((a + b) * 10) / 10 + 1), (a + b).toFixed(2) === correct ? String(sum + 0.1) : (a + b).toFixed(2), String(Math.round((a - b) * 10) / 10)],
      `Line up the decimal points. ${a.toFixed(1)} + ${b.toFixed(1)} = ${correct}. The other options come from a shifted decimal, from subtracting, or from adding an extra tenth.`,
    );
  }
  if (kind === 4) {
    const c = 5 * (3 + Math.floor(i / 6));
    const f = (9 / 5) * c + 32;
    const correct = String(f);
    return mcq(
      id,
      i,
      `Convert ${c}°C to Fahrenheit. Use F = (9/5)C + 32.`,
      correct,
      [String(c + 32), String(Math.round(((5 / 9) * c + 32) * 10) / 10), String((9 / 5) * c), "0"],
      `F = (9/5)×${c} + 32 = ${correct}. ${c + 32} only adds 32. ${(5 / 9) * c + 32} uses the reverse formula. ${(9 / 5) * c} forgets to add 32.`,
    );
  }
  const a = 2 + (i % 6);
  const b = 3 + (i % 5);
  const correct = String(a * b - (a + b));
  return mcq(
    id,
    i,
    `Simplify ${a} × ${b} − (${a} + ${b}).`,
    correct,
    [String(a * b + a + b), String(a * b), String((a - b) * (a + b))],
    `Do the multiplication before the subtraction. ${a} × ${b} = ${a * b}, then ${a * b} − ${a + b} = ${correct}. ${a * b + a + b} adds the bracket instead of subtracting it. ${a * b} stops before the subtraction. The last option multiplies a difference and a sum, which is a different expression.`,
  );
}

function playing(i) {
  const id = "m-playing";
  const kind = i % 5;
  if (kind === 0) {
    const base = 100 + 9 * (i % 8);
    const digit = (3 - (base % 3) + 3) % 3;
    const n = base * 10 + digit;
    const correct = String(digit);
    const wrongs = [0, 1, 2, 3, 4, 5].filter((d) => d !== digit).slice(0, 3).map(String);
    return mcq(
      id,
      i,
      `What digit should replace * so that ${base}* is divisible by 3?`,
      correct,
      wrongs,
      `A number is divisible by 3 when the sum of its digits is divisible by 3. The digits of ${base} add up to ${String(base).split("").reduce((s, d) => s + Number(d), 0)}. With * = ${correct}, the total is divisible by 3, so ${n} works. The other digits leave a remainder when the digit sum is divided by 3.`,
    );
  }
  if (kind === 1) {
    const n = 15 + i;
    const correct = n % 2 === 0 ? "2" : "not by 2";
    return mcq(
      id,
      i,
      `Which of these is true about ${n}?`,
      n % 2 === 0 ? `${n} is divisible by 2` : `${n} is not divisible by 2`,
      [
        n % 2 === 0 ? `${n} is not divisible by 2` : `${n} is divisible by 2`,
        `${n} is divisible by 9`,
        n % 5 === 0 ? `${n} is not divisible by 5` : `${n} is divisible by 5`,
      ],
      `A number is divisible by 2 when its last digit is even. The last digit of ${n} is ${n % 10}, so the true statement is the one about 2. Divisibility by 5 needs the last digit 0 or 5. Divisibility by 9 needs the digit sum to be a multiple of 9. ${correct === "2" ? `${n} is even.` : `${n} is odd.`}`,
    );
  }
  if (kind === 2) {
    const a = 12 + 2 * (i % 6);
    const b = 18 + 3 * (i % 5);
    const h = gcd(a, b);
    const l = (a * b) / h;
    return mcq(
      id,
      i,
      `The HCF of ${a} and ${b} is ${h}. Their LCM is`,
      String(l),
      [String(a * b), String(h), String(a + b)],
      `For two whole numbers, HCF × LCM = product of the numbers. So LCM = ${a} × ${b} / ${h} = ${l}. ${a * b} is the product, which still contains the common factor. ${h} is the HCF, not the LCM. ${a + b} is the sum and is not used in this rule.`,
    );
  }
  if (kind === 3) {
    const n = 84 + 6 * (i % 8);
    let x = n;
    const parts = [];
    for (let p = 2; p * p <= x; p++) {
      while (x % p === 0) {
        parts.push(p);
        x /= p;
      }
    }
    if (x > 1) parts.push(x);
    const correct = parts.join(" × ");
    return mcq(
      id,
      i,
      `The prime factorisation of ${n} is`,
      correct,
      [`${n} × 1`, parts.slice(0, -1).join(" × ") || `${n}`, `${parts[0]} × ${n / parts[0] + 1}`],
      `Keep dividing by the smallest prime until you reach 1. ${n} = ${correct}. ${n} × 1 is not a prime factorisation because ${n} is not prime. Stopping early leaves a composite factor. The last option changes a factor, so the product is no longer ${n}.`,
    );
  }
  const n = 100 + 10 * (i % 9) + (i % 4);
  const last = n % 10;
  const by5 = last === 0 || last === 5;
  return mcq(
    id,
    i,
    `Is ${n} divisible by 5?`,
    by5 ? "Yes, because the last digit is 0 or 5" : "No, because the last digit is not 0 or 5",
    [
      by5 ? "No, because the last digit is not 0 or 5" : "Yes, because the last digit is 0 or 5",
      "Yes, because it is greater than 50",
      "No, because it is even",
    ],
    `Divisibility by 5 depends only on the last digit. The last digit of ${n} is ${last}. ${by5 ? "That is 0 or 5, so it is divisible by 5." : "That is not 0 or 5, so it is not divisible by 5."} Being large, or being even, does not decide divisibility by 5.`,
  );
}

function exponents(i) {
  const id = "m-exponents";
  const kind = i % 6;
  if (kind === 0) {
    const a = 2 + (i % 5);
    const m = 2 + (i % 4);
    const n = 1 + (i % 3);
    const correct = `${a}^${m + n}`;
    return mcq(
      id,
      i,
      `Simplify ${a}^${m} × ${a}^${n}.`,
      correct,
      [`${a}^${m * n}`, `${a * a}^${m + n}`, `${a}^${m} + ${a}^${n}`],
      `When the bases are the same, add the powers: ${a}^${m} × ${a}^${n} = ${correct}. ${a}^${m * n} multiplies the powers, which is the rule for a power of a power. ${a * a}^${m + n} changes the base. Adding the two powers as terms is not multiplication.`,
    );
  }
  if (kind === 1) {
    const a = 2 + (i % 6);
    const m = 4 + (i % 4);
    const n = 1 + (i % 3);
    const correct = `${a}^${m - n}`;
    return mcq(
      id,
      i,
      `Simplify ${a}^${m} ÷ ${a}^${n}.`,
      correct,
      [`${a}^${m + n}`, `${a}^${n - m}`, `1/${a}^${m + n}`],
      `When dividing the same base, subtract the powers: ${a}^${m} ÷ ${a}^${n} = ${correct}. Adding the powers is the multiplication rule. ${a}^${n - m} reverses the subtraction and would be a reciprocal. The last option inverts the whole product instead of subtracting.`,
    );
  }
  if (kind === 2) {
    const a = 2 + (i % 7);
    const m = 2 + (i % 3);
    const n = 2;
    const correct = `${a}^${m * n}`;
    return mcq(
      id,
      i,
      `Simplify (${a}^${m})^${n}.`,
      correct,
      [`${a}^${m + n}`, `${a * n}^${m}`, `${a}^${m}`],
      `A power of a power multiplies the indices: (${a}^${m})^${n} = ${correct}. Adding the indices is for multiplying the same base. ${a * n}^${m} changes the base. ${a}^${m} drops the outside power.`,
    );
  }
  if (kind === 3) {
    const a = 3 + (i % 8);
    return mcq(
      id,
      i,
      `The value of ${a}^0 is`,
      "1",
      ["0", String(a), String(-1)],
      `Any non-zero number to the power 0 is 1, so ${a}^0 = 1. It is not 0, and it is not the base itself. −1 would be a negative power or a sign error, not the zero-power rule.`,
    );
  }
  if (kind === 4) {
    const a = 2 + (i % 5);
    const n = 1 + (i % 3);
    const correct = `1/${a}^${n}`;
    return mcq(
      id,
      i,
      `Write ${a}^−${n} with a positive power.`,
      correct,
      [`${a}^${n}`, `−${a}^${n}`, `−1/${a}^${n}`],
      `A negative power means the reciprocal: ${a}^−${n} = ${correct}. ${a}^${n} drops the minus in the power. −${a}^${n} and −1/${a}^${n} put a minus sign in front. A negative index does not make the value negative when the base is positive.`,
    );
  }
  const n = 2 + (i % 6);
  const exp = 3 + (i % 4);
  const correct = `${n} × 10^${exp}`;
  return mcq(
    id,
    i,
    `Write ${n}${String(10 ** exp).slice(1)} in standard form.`,
    correct,
    [`${n} × 10^${exp - 1}`, `${n}.${"0".repeat(Math.max(exp - 1, 0))} × 10`, `${n * 10} × 10^${exp}`],
    `Standard form is a number from 1 up to, but not including, 10, times a power of 10. ${n}${String(10 ** exp).slice(1)} = ${correct}. The other options shift the decimal and so use the wrong power of 10.`,
  );
}

function squares(i) {
  const id = "m-squares";
  const kind = i % 5;
  if (kind === 0) {
    const n = 11 + (i % 15);
    return mcq(
      id,
      i,
      `The square of ${n} is`,
      String(n * n),
      [String(n * n + n), String(2 * n), String((n + 1) * (n + 1))],
      `${n}² means ${n} × ${n} = ${n * n}. ${2 * n} is the double, not the square. ${n * n + n} adds an extra ${n}. ${(n + 1) * (n + 1)} is the next square, ${n + 1}².`,
    );
  }
  if (kind === 1) {
    const n = 4 + (i % 18);
    return mcq(
      id,
      i,
      `The square root of ${n * n} is`,
      String(n),
      [String(n * n), String(n + 1), String(2 * n)],
      `√${n * n} = ${n}, because ${n} × ${n} = ${n * n}. ${n * n} is the square itself. ${n + 1} and ${2 * n} do not multiply by themselves to give ${n * n}.`,
    );
  }
  if (kind === 2) {
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [7, 24, 25],
      [8, 15, 17],
      [9, 12, 15],
      [9, 40, 41],
      [20, 21, 29],
    ];
    const [a, b, c] = triples[i % triples.length];
    return mcq(
      id,
      i,
      `A right triangle has legs ${a} cm and ${b} cm. The hypotenuse is`,
      `${c} cm`,
      [`${a + b} cm`, `${c + 1} cm`, `${a * b} cm`],
      `By Pythagoras, hypotenuse² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}. So the hypotenuse is ${c} cm. ${a + b} adds the legs. ${c + 1} is the next whole number, whose square is not ${c * c}. ${a * b} is the product of the legs, which is related to area, not the hypotenuse.`,
    );
  }
  if (kind === 3) {
    const samples = [12, 18, 20, 28, 32, 44, 45, 48, 50, 52, 63, 75, 76, 80, 98];
    const n = samples[i % samples.length];
    const factors = {};
    let x = n;
    for (let p = 2; p * p <= x; p++) {
      while (x % p === 0) {
        factors[p] = (factors[p] || 0) + 1;
        x /= p;
      }
    }
    if (x > 1) factors[x] = (factors[x] || 0) + 1;
    let mul = 1;
    const show = [];
    for (const [p, e] of Object.entries(factors)) {
      show.push(`${p}^${e}`);
      if (e % 2) mul *= Number(p);
    }
    return mcq(
      id,
      i,
      `The smallest whole number by which ${n} must be multiplied to make a perfect square is`,
      String(mul),
      [String(mul + 1 === n ? mul + 2 : mul + 1), String(n), "1"],
      `Write ${n} = ${show.join(" × ")}. In a perfect square every power is even, so we need one more ${Object.entries(factors)
        .filter(([, e]) => e % 2)
        .map(([p]) => p)
        .join(" and ")}. The smallest multiplier is ${mul}. Multiplying by 1 leaves it unchanged, and it is not already a square. Multiplying by ${n} makes a square only by a much larger factor than needed.`,
    );
  }
  const n = 8 + (i % 12);
  const low = Math.floor(Math.sqrt(n * n + 3));
  const between = n * n + 5;
  const root = Math.sqrt(between);
  const a = Math.floor(root);
  const b = a + 1;
  return mcq(
    id,
    i,
    `${between} lies between the squares of`,
    `${a} and ${b}`,
    [`${a - 1} and ${a}`, `${b} and ${b + 1}`, `${n} and ${n + 2}`],
    `${a}² = ${a * a} and ${b}² = ${b * b}. ${between} is greater than ${a * a} and smaller than ${b * b}, so it lies between ${a} and ${b}. The other pairs are the neighbouring gaps, and ${between} is not in those gaps.`,
  );
}

function cubes(i) {
  const id = "m-cubes";
  const kind = i % 4;
  const n = 2 + Math.floor(i / 4);
  if (kind === 0) {
    return mcq(
      id,
      i,
      `The cube of ${n} is`,
      String(n ** 3),
      [String(n ** 2), String(3 * n), String((n + 1) ** 3), "1"],
      `${n}³ = ${n} × ${n} × ${n} = ${n ** 3}. ${n ** 2} is the square. ${3 * n} is three times the number. ${(n + 1) ** 3} is the next cube.`,
    );
  }
  if (kind === 1) {
    return mcq(
      id,
      i,
      `The cube root of ${n ** 3} is`,
      String(n),
      [String(n ** 3), String(n ** 2), String(3 * n), String(n + 1), "1"],
      `∛${n ** 3} = ${n}, because ${n} × ${n} × ${n} = ${n ** 3}. The cube itself, the square, and three times ${n} are different numbers.`,
    );
  }
  if (kind === 2) {
    const samples = [16, 24, 36, 40, 54, 56, 72, 80, 88, 96, 104, 108];
    const m = samples[i % samples.length];
    const factors = {};
    let x = m;
    for (let p = 2; p * p <= x; p++) {
      while (x % p === 0) {
        factors[p] = (factors[p] || 0) + 1;
        x /= p;
      }
    }
    if (x > 1) factors[x] = (factors[x] || 0) + 1;
    let mul = 1;
    for (const [p, e] of Object.entries(factors)) {
      const need = (3 - (e % 3)) % 3;
      mul *= Number(p) ** need;
    }
    return mcq(
      id,
      i,
      `The smallest whole number by which ${m} must be multiplied to make a perfect cube is`,
      String(mul),
      [String(mul * 2), "1", String(m)],
      `In a perfect cube, every prime power is a multiple of 3. From the factorisation of ${m}, the missing factors multiply to ${mul}. It is not already a cube, so 1 is not enough. Multiplying by ${m} is far larger than the smallest multiplier.`,
    );
  }
  const negatives = -n;
  return mcq(
    id,
    i,
    `The cube of ${negatives} is`,
    String(negatives ** 3),
      [String(n ** 3), String(-(n ** 2)), String(-n), "1"],
    `The cube of a negative number is negative, because three minuses give a minus. (${negatives})³ = ${negatives ** 3}. ${n ** 3} is the cube of the positive number. ${-(n ** 2)} is the negative square, not the cube. ${-n} is the number itself.`,
  );
}

function algebra(i) {
  const id = "m-algebra";
  const kind = i % 5;
  const a = 2 + Math.floor(i / 5);
  const b = a + 1 + (i % 3);
  if (kind === 0) {
    const correct = `${a * a + 2 * a * b + b * b}`;
    return mcq(
      id,
      i,
      `Expand (${a} + ${b})² using an identity.`,
      correct,
      [String(a * a + b * b), String(a * a + a * b + b * b), String((a + b) * 2)],
      `(x + y)² = x² + 2xy + y². Here x = ${a} and y = ${b}, so the value is ${a * a} + ${2 * a * b} + ${b * b} = ${correct}. ${a * a + b * b} drops the middle term 2xy. ${a * a + a * b + b * b} uses xy instead of 2xy. ${2 * (a + b)} is the double of the sum, not the square.`,
    );
  }
  if (kind === 1) {
    const correct = String(a * a - 2 * a * b + b * b);
    return mcq(
      id,
      i,
      `Expand (${a} − ${b})².`,
      correct,
      [String(a * a + 2 * a * b + b * b), String(a * a - b * b), String(a * a + b * b)],
      `(x − y)² = x² − 2xy + y² = ${a * a} − ${2 * a * b} + ${b * b} = ${correct}. ${a * a + 2 * a * b + b * b} is (${a} + ${b})². ${a * a - b * b} is a difference of squares. ${a * a + b * b} drops the middle term and also loses the minus.`,
    );
  }
  if (kind === 2) {
    const correct = String(a * a - b * b);
    return mcq(
      id,
      i,
      `The value of ${a}² − ${b}² is`,
      correct,
      [String((a - b) * (a - b)), String(a * a + b * b), String((a - b) * (a + b) + 2 * a * b)],
      `${a}² − ${b}² = (${a} − ${b})(${a} + ${b}) = ${a - b} × ${a + b} = ${correct}. ${(a - b) ** 2} expands to a square of a difference, which still has a middle term. ${a * a + b * b} adds the squares. The last option adds an extra 2ab onto the correct product.`,
    );
  }
  if (kind === 3) {
    const p = 1 + (i % 4);
    const q = 2 + (i % 5);
    const correct = `x² + ${p + q}x + ${p * q}`;
    return mcq(
      id,
      i,
      `Expand (x + ${p})(x + ${q}).`,
      correct,
      [`x² + ${p * q}x + ${p + q}`, `x² + ${p + q}x + ${p + q}`, `x² − ${p + q}x + ${p * q}`],
      `(x + a)(x + b) = x² + (a + b)x + ab. Here a + b = ${p + q} and ab = ${p * q}, so the product is ${correct}. Swapping the sum and the product is the usual slip. A minus in the middle term would fit (x − ${p})(x − ${q}) only if both signs were minus, which they are not.`,
    );
  }
  const m = 2 + (i % 5);
  const n = 1 + (i % 4);
  return mcq(
    id,
    i,
    `Add ${m}x + ${n} and ${n}x + ${m}.`,
    `${m + n}x + ${m + n}`,
    [`${m + n}x + ${n}`, `${m * n}x + ${m + n}`, `${m + n}x + ${m * n}`],
    `Add like terms. The x terms are ${m}x + ${n}x = ${m + n}x. The constants are ${n} + ${m} = ${m + n}. The sum is ${m + n}x + ${m + n}. The other options multiply coefficients, or they add only one of the constants.`,
  );
}

function factorisation(i) {
  const id = "m-factorisation";
  const kind = i % 4;
  const a = 2 + Math.floor(i / 4);
  const b = 2 + (i % 4);
  if (kind === 0) {
    return mcq(
      id,
      i,
      `Factorise ${a}x + ${a * b}.`,
      `${a}(x + ${b})`,
      [`${a}(x + ${a * b})`, `x(${a} + ${b})`, `${a}x(1 + ${b})`],
      `The common factor is ${a}. ${a}x + ${a * b} = ${a}(x + ${b}). ${a}(x + ${a * b}) would expand to ${a}x + ${a * a * b}, which has an extra ${a}. x(${a} + ${b}) expands to ${a}x + ${b}x, not a constant term. ${a}x(1 + ${b}) expands to ${a}x + ${a * b}x, so the second term still has x.`,
    );
  }
  if (kind === 1) {
    return mcq(
      id,
      i,
      `Factorise x² + ${a + b}x + ${a * b}.`,
      `(x + ${a})(x + ${b})`,
      [`(x + ${a * b})(x + 1)`, `(x − ${a})(x − ${b})`, `(x + ${a})(x − ${b})`, `(x + ${a + b})^2`],
      `Look for two numbers that add to ${a + b} and multiply to ${a * b}. They are ${a} and ${b}, so the factors are (x + ${a})(x + ${b}). (x − ${a})(x − ${b}) gives a plus middle term only if you expand carefully: the middle term is negative. (x + ${a})(x − ${b}) gives a middle term ${a - b}, not ${a + b}.`,
    );
  }
  if (kind === 2) {
    return mcq(
      id,
      i,
      `Factorise x² − ${a * a}.`,
      `(x − ${a})(x + ${a})`,
      [`(x − ${a})²`, `(x + ${a})²`, `(x − ${a * a})(x + 1)`],
      `x² − ${a * a} is a difference of squares: x² − ${a}² = (x − ${a})(x + ${a}). (x − ${a})² = x² − ${2 * a}x + ${a * a}, which has a middle term. (x + ${a})² adds the squares. The last option does not multiply back to x² − ${a * a}.`,
    );
  }
  return mcq(
    id,
    i,
    `Factorise ${a}x² + ${a * b}x.`,
    `${a}x(x + ${b})`,
    [`${a}(x² + ${b})`, `x(${a} + ${b})`, `${a}x(x + ${a * b})`],
    `Both terms have ${a}x. ${a}x² + ${a * b}x = ${a}x(x + ${b}). ${a}(x² + ${b}) leaves the second term short of an x. x(${a} + ${b}) is linear. ${a}x(x + ${a * b}) puts the common factor back into the bracket.`,
  );
}

function equations(i) {
  const id = "m-equations";
  const a = 2 + (i % 5);
  const x = 2 + Math.floor(i / 3);
  const b = 1 + (i % 4);
  const c = a * x + b;
  const kind = i % 3;
  if (kind === 0) {
    return mcq(
      id,
      i,
      `Solve ${a}x + ${b} = ${c}.`,
      String(x),
      [String(c - b), String(x + 1), String(c), "0"],
      `Subtract ${b} from both sides: ${a}x = ${c} − ${b} = ${c - b}. Then divide by ${a}: x = ${x}. ${c - b} is the value of ${a}x before dividing. ${x + 1} is one more than the solution. ${c} is the right-hand side, not the value of x.`,
    );
  }
  if (kind === 1) {
    const older = 3 + (i % 6);
    const sum = 2 * x + older;
    return mcq(
      id,
      i,
      `A boy is ${older} years younger than his sister. Their ages add up to ${sum}. The boy's age is`,
      String(x),
      [String(x + older), String(sum - older), String(Math.floor(sum / 2)), String(sum), String(older)],
      `Let the boy's age be y. Then the sister is y + ${older}, and y + (y + ${older}) = ${sum}. So 2y = ${sum - older} and y = ${x}. ${x + older} is the sister's age. ${sum - older} forgets that the sister is older than the boy by ${older}, not that her age is ${older}. Half of ${sum} ignores the age gap.`,
    );
  }
  const len = 3 + (i % 5);
  const width = len + 1 + (i % 3);
  const peri = 2 * (len + width);
  return mcq(
    id,
    i,
    `A rectangle has perimeter ${peri} cm. Its length is ${len} cm. The width is`,
    `${width} cm`,
    [`${peri - len} cm`, `${len} cm`, `${peri / 2} cm`],
    `Perimeter = 2(length + width). So length + width = ${peri}/2 = ${len + width}. Width = ${len + width} − ${len} = ${width} cm. ${peri - len} subtracts from the whole perimeter. ${peri / 2} is the sum of length and width, not the width.`,
  );
}

function comparing(i) {
  const id = "m-comparing";
  const kind = i % 6;
  if (kind === 0) {
    const cp = 100 * (2 + Math.floor(i / 6));
    const p = 5 * (1 + (i % 5));
    const sp = (cp * (100 + p)) / 100;
    return mcq(
      id,
      i,
      `A shopkeeper buys an item for ₹${cp} and wants a profit of ${p}%. The selling price is`,
      `₹${sp}`,
      [`₹${cp + p}`, `₹${(cp * p) / 100}`, `₹${cp - (cp * p) / 100}`],
      `Profit = ${p}% of ${cp} = ₹${(cp * p) / 100}. Selling price = cost + profit = ₹${sp}. ₹${cp + p} adds the percent number itself, not the percent of the cost. ₹${(cp * p) / 100} is only the profit. The last option subtracts the profit, which would be a loss.`,
    );
  }
  if (kind === 1) {
    const mp = 200 + 50 * Math.floor(i / 6);
    const d = 10;
    const sp = (mp * (100 - d)) / 100;
    return mcq(
      id,
      i,
      `A marked price of ₹${mp} is discounted by ${d}%. The sale price is`,
      `₹${sp}`,
      [`₹${mp - d}`, `₹${(mp * d) / 100}`, `₹${mp + (mp * d) / 100}`],
      `Discount = ${d}% of ${mp} = ₹${(mp * d) / 100}. Sale price = ${mp} − that discount = ₹${sp}. ₹${mp - d} subtracts 10 rupees, not 10 percent. The middle option is only the discount. Adding the discount would raise the price.`,
    );
  }
  if (kind === 2) {
    const p = 1000 * (1 + Math.floor(i / 6));
    const r = 5;
    const t = 2 + (i % 3);
    const si = (p * r * t) / 100;
    return mcq(
      id,
      i,
      `Simple interest on ₹${p} at ${r}% per year for ${t} years is`,
      `₹${si}`,
      [`₹${(p * r) / 100}`, `₹${p + si}`, `₹${(p * t) / 100}`],
      `Simple interest = PRT/100 = ${p} × ${r} × ${t} / 100 = ₹${si}. ₹${(p * r) / 100} is the interest for one year only. ₹${p + si} is the amount, not the interest. ₹${(p * t) / 100} drops the rate.`,
    );
  }
  if (kind === 3) {
    const p = 500 * (1 + Math.floor(i / 6));
    const amount = p * 1.21;
    return mcq(
      id,
      i,
      `Compound interest on ₹${p} at 10% per year for 2 years, added yearly, gives an amount of`,
      `₹${amount}`,
      [`₹${p * 1.2}`, `₹${p * 1.1}`, `₹${p}`, `₹${p + p * 0.1}`],
      `Amount after 2 years at 10% is P × (1.1)² = P × 1.21 = ₹${amount}. ₹${p * 1.2} is two years of simple interest at 10%. ₹${p * 1.1} is only one year. ₹${p + p * 0.2} is the same simple-interest amount written another way.`,
    );
  }
  if (kind === 4) {
    const boys = 2 + Math.floor(i / 6);
    const girls = boys + 1 + (i % 3);
    return mcq(
      id,
      i,
      `The ratio of boys to girls is ${boys} : ${girls}. Boys are what fraction of the total children?`,
      frac(boys, boys + girls),
      [frac(boys, girls), frac(girls, boys + girls), frac(boys, girls + 1), "1", "0"],
      `Total parts = ${boys} + ${girls} = ${boys + girls}. Boys are ${boys} of those parts, so the fraction is ${frac(boys, boys + girls)}. ${frac(boys, girls)} compares boys with girls, not with the total. ${frac(girls, boys + girls)} is the girls' share.`,
    );
  }
  const old = 40 + 10 * Math.floor(i / 6);
  const pct = 10;
  const next = old + (old * pct) / 100;
  return mcq(
    id,
    i,
    `A price of ₹${old} increases by ${pct}%. The new price is`,
    `₹${next}`,
    [`₹${old + pct}`, `₹${(old * pct) / 100}`, `₹${old - (old * pct) / 100}`],
    `Increase = ${pct}% of ${old} = ₹${(old * pct) / 100}. New price = ₹${next}. ₹${old + pct} adds 10 rupees. The middle option is only the increase. The last option is a 10% decrease.`,
  );
}

function proportion(i) {
  const id = "m-proportion";
  const pairs = [
    [6, 3, 2],
    [4, 12, 3],
    [6, 6, 3],
    [10, 10, 5],
    [12, 6, 4],
    [12, 4, 3],
    [8, 8, 4],
    [15, 10, 6],
    [12, 12, 6],
    [20, 5, 4],
  ];
  const kind = i % 4;
  if (kind === 0) {
    const [a, b, together] = pairs[i % pairs.length];
    return mcq(
      id,
      i,
      `A can finish a job in ${a} days and B can finish it in ${b} days. Working together, they finish it in`,
      `${together} days`,
      [`${a + b} days`, `${Math.min(a, b)} days`, `${a * b} days`],
      `A's one day of work is 1/${a} and B's is 1/${b}. Together they do ${frac(a + b, a * b)} of the job per day, so the time is ${a * b}/${a + b} = ${together} days. Adding the days, taking the faster person alone, or multiplying the days all ignore that they share the work.`,
    );
  }
  if (kind === 1) {
    const men1 = 4 + 2 * (i % 5);
    const days1 = 6 + (i % 7);
    const men2 = men1 * 2;
    const days2 = days1 / 2;
    return mcq(
      id,
      i,
      `${men1} workers finish a wall in ${days1} days. How many days will ${men2} workers take, at the same rate?`,
      `${days2} days`,
      [`${days1 * 2} days`, `${days1} days`, `${men2 * days1} days`],
      `This is inverse proportion: more workers, fewer days. ${men1} × ${days1} = ${men2} × days, so days = ${days2}. Doubling the workers doubles the days only in direct proportion, which this is not. The worker-days product is not the number of days.`,
    );
  }
  if (kind === 2) {
    const cost1 = 5 + (i % 4);
    const price1 = 40 + 10 * (i % 5);
    const costN = cost1 * 2;
    const priceN = price1 * 2;
    return mcq(
      id,
      i,
      `${cost1} notebooks cost ₹${price1}. The cost of ${costN} notebooks at the same rate is`,
      `₹${priceN}`,
      [`₹${price1 + costN}`, `₹${price1}`, `₹${Math.round(price1 / cost1)}`],
      `Cost is directly proportional to the number of notebooks. Double the notebooks means double the cost: ₹${priceN}. Adding the new count to the old price mixes rupees and notebooks. ₹${Math.round(price1 / cost1)} is the price of one notebook, not of ${costN}.`,
    );
  }
  const a = 2;
  const b = 4 + 2 * Math.floor(i / 4);
  const c = 3 + (i % 5);
  const d = (b * c) / a;
  return mcq(
    id,
    i,
    `If ${a} : ${b} = ${c} : x, then x is`,
    String(d),
    [String((a * c) / b), String(b + c - a), String(a * b * c), String(b), String(c)],
    `In a proportion, product of extremes = product of means. ${a} × x = ${b} × ${c}, so x = ${b * c}/${a} = ${d}. ${((a * c) / b)} swaps the positions. ${b + c - a} treats the proportion like a subtraction pattern. The product of all three known numbers is not x.`,
  );
}

function mensuration(i) {
  const id = "m-mensuration";
  const kind = i % 6;
  if (kind === 0) {
    const l = 5 + (i % 8);
    const b = 3 + (i % 5);
    return mcq(
      id,
      i,
      `The area of a rectangle ${l} cm by ${b} cm is`,
      `${l * b} cm²`,
      [`${2 * (l + b)} cm²`, `${l + b} cm²`, `${2 * l * b} cm²`],
      `Area of a rectangle = length × breadth = ${l} × ${b} = ${l * b} cm². ${2 * (l + b)} is the perimeter in cm, not the area. ${l + b} adds the sides. ${2 * l * b} doubles the area.`,
    );
  }
  if (kind === 1) {
    const base = 6 + 2 * (i % 6);
    const h = 4 + (i % 5);
    return mcq(
      id,
      i,
      `The area of a triangle with base ${base} cm and height ${h} cm is`,
      `${(base * h) / 2} cm²`,
      [`${base * h} cm²`, `${base + h} cm²`, `${2 * base * h} cm²`],
      `Area of a triangle = (1/2) × base × height = (1/2) × ${base} × ${h} = ${(base * h) / 2} cm². ${base * h} forgets the half and is the area of the related rectangle. Adding the sides is not an area. Doubling the product is four times the triangle's area.`,
    );
  }
  if (kind === 2) {
    const r = 7 * (1 + (i % 4));
    const area = (22 / 7) * r * r;
    return mcq(
      id,
      i,
      `Using π = 22/7, the area of a circle of radius ${r} cm is`,
      `${area} cm²`,
      [`${2 * (22 / 7) * r} cm²`, `${(22 / 7) * r} cm²`, `${area / 2} cm²`],
      `Area = πr² = 22/7 × ${r} × ${r} = ${area} cm². 2πr is the circumference, ${2 * (22 / 7) * r} cm, not the area. πr uses the radius only once. Half of the area is not the formula.`,
    );
  }
  if (kind === 3) {
    const l = 4 + (i % 5);
    const b = 3 + (i % 4);
    const h = 2 + (i % 6);
    return mcq(
      id,
      i,
      `The volume of a cuboid ${l} cm × ${b} cm × ${h} cm is`,
      `${l * b * h} cm³`,
      [`${2 * (l * b + b * h + h * l)} cm³`, `${l * b} cm³`, `${l + b + h} cm³`],
      `Volume = length × breadth × height = ${l} × ${b} × ${h} = ${l * b * h} cm³. ${2 * (l * b + b * h + h * l)} is the surface area. ${l * b} is the area of the base only. The sum of the three edges is not a volume.`,
    );
  }
  if (kind === 4) {
    const r = 7 * (1 + (i % 3));
    const h = 5 + (i % 6);
    const csa = 2 * (22 / 7) * r * h;
    return mcq(
      id,
      i,
      `Using π = 22/7, the curved surface area of a cylinder of radius ${r} cm and height ${h} cm is`,
      `${csa} cm²`,
      [`${(22 / 7) * r * r * h} cm²`, `${2 * (22 / 7) * r} cm²`, `${2 * (22 / 7) * r * r} cm²`],
      `Curved surface area = 2πrh = 2 × 22/7 × ${r} × ${h} = ${csa} cm². πr²h is the volume. 2πr is the circumference of the base. 2πr² is not this cylinder's curved surface.`,
    );
  }
  const m = 2 + (i % 5);
  return mcq(
    id,
    i,
    `${m} m² is equal to how many cm²?`,
    String(m * 10000),
    [String(m * 100), String(m * 1000), String(m * 100 * 100 * 10)],
    `1 m = 100 cm, so 1 m² = 100 × 100 = 10,000 cm². ${m} m² = ${m * 10000} cm². Multiplying by 100 converts metres to centimetres once, which is right for length, not for area. 1,000 is the factor for metres to millimetres in length.`,
  );
}

function triangles(i) {
  const id = "m-triangles";
  const fixed = [
    [
      "The sum of the three angles of a triangle is",
      "180°",
      "90°",
      "360°",
      "270°",
      "The angle sum of any triangle is 180°. 90° is a right angle, not the sum. 360° is the sum of angles around a point or of a quadrilateral. 270° is three right angles.",
    ],
    [
      "Two angles of a triangle are 50° and 60°. The third angle is",
      "70°",
      "110°",
      "90°",
      "130°",
      "The three angles add to 180°. Third angle = 180 − 50 − 60 = 70°. 110° is 180 − 70, which subtracts the answer instead of the given angles. 90° assumes a right angle that is not given. 130° is 180 − 50, forgetting the 60° angle.",
    ],
    [
      "An exterior angle of a triangle is 110°. One remote interior angle is 45°. The other remote interior angle is",
      "65°",
      "70°",
      "45°",
      "135°",
      "An exterior angle equals the sum of the two remote interior angles. 110 = 45 + the other, so the other is 65°. 70° is 110 − 40, a slip in subtraction. 45° repeats the given angle. 135° is the adjacent interior angle on a straight line (180 − 45), which is not asked.",
    ],
    [
      "Which lengths can be the sides of a right triangle?",
      "5 cm, 12 cm, 13 cm",
      "4 cm, 5 cm, 6 cm",
      "2 cm, 3 cm, 4 cm",
      "6 cm, 7 cm, 8 cm",
      "Check Pythagoras. 5² + 12² = 25 + 144 = 169 = 13², so 5, 12, 13 works. For 4, 5, 6: 16 + 25 = 41, which is not 36. For 2, 3, 4: 4 + 9 = 13, not 16. For 6, 7, 8: 36 + 49 = 85, not 64.",
    ],
    [
      "Two triangles are congruent by SAS when",
      "two sides and the included angle are equal",
      "all three angles are equal",
      "two angles and a non-included side are equal",
      "only the perimeters are equal",
      "SAS means two sides and the angle between those sides. Three equal angles is AAA, which gives a similar triangle, not necessarily a congruent one. Two angles and a non-included side is not the SAS statement. Equal perimeters do not fix the shape.",
    ],
    [
      "RHS congruence is used for",
      "right triangles with equal hypotenuse and one side",
      "any two triangles with equal areas",
      "triangles with three equal angles",
      "only equilateral triangles",
      "RHS is a congruence rule for right-angled triangles: the right angle, the hypotenuse, and one side. Equal area does not make triangles congruent. Three equal angles is similarity. Equilateral triangles are a special case, not the meaning of RHS.",
    ],
  ];
  if (i < fixed.length) {
    const [stem, c, w1, w2, w3, ex] = fixed[i];
    return mcq(id, i, stem, c, [w1, w2, w3], ex);
  }
  const a = 30 + (i % 25);
  const b = 25 + (i % 20);
  const third = 180 - a - b;
  return mcq(
    id,
    i,
    `Two angles of a triangle are ${a}° and ${b}°. The third angle is`,
    `${third}°`,
    [`${a + b}°`, `${180 - a}°`, `${a}°`, "1°"],
    `Angle sum is 180°. Third angle = 180 − ${a} − ${b} = ${third}°. ${a + b}° is the sum of the two given angles, not the third. ${180 - a}° forgets to subtract ${b}°. The remaining option treats the triangle as if it had a fixed 90° split, which was not given.`,
  );
}

function quads(i) {
  const id = "m-quads";
  const fixed = [
    [
      "The sum of the interior angles of a quadrilateral is",
      "360°",
      "180°",
      "270°",
      "540°",
      "A quadrilateral splits into two triangles, and each triangle has 180°, so the sum is 360°. 180° is one triangle. 540° is the interior sum of a pentagon, (5 − 2) × 180.",
    ],
    [
      "In a parallelogram, opposite sides are",
      "equal and parallel",
      "perpendicular only",
      "always unequal",
      "equal but never parallel",
      "Both pairs of opposite sides of a parallelogram are equal and parallel. They are not always perpendicular; that would be a special case such as a rhombus with right angles, which is a square. Opposite sides are not unequal, and equal sides that are not parallel do not make a parallelogram.",
    ],
    [
      "The sum of the exterior angles of any convex polygon, one at each vertex, is",
      "360°",
      "180°",
      "depends on the number of sides",
      "720°",
      "If you walk around any convex polygon, you turn a full circle. The exterior angles add to 360°, whatever the number of sides. 180° is the triangle interior sum. 720° is a full two turns.",
    ],
    [
      "Each exterior angle of a regular hexagon is",
      "60°",
      "120°",
      "90°",
      "72°",
      "Exterior angle of a regular polygon = 360° / number of sides = 360/6 = 60°. 120° is the interior angle (180 − 60). 90° is the exterior of a square. 72° is the exterior of a regular pentagon.",
    ],
    [
      "For a cube, V = 8 and E = 12. Euler's formula gives F as",
      "6",
      "8",
      "10",
      "12",
      "Euler's formula is V − E + F = 2. So 8 − 12 + F = 2, hence F = 6. A cube has 6 faces. 8 is the number of vertices, and 12 is the number of edges.",
    ],
    [
      "The number of diagonals of a convex hexagon is",
      "9",
      "6",
      "12",
      "15",
      "Number of diagonals = n(n − 3)/2. For n = 6, 6 × 3 / 2 = 9. 6 counts the sides, not the diagonals. 12 and 15 use n(n − 2)/2 or n(n − 1)/2, which count different joins.",
    ],
  ];
  if (i < fixed.length) {
    const [stem, c, w1, w2, w3, ex] = fixed[i];
    return mcq(id, i, stem, c, [w1, w2, w3], ex);
  }
  const n = 5 + i;
  const sum = (n - 2) * 180;
  return mcq(
    id,
    i,
    `The sum of the interior angles of a polygon with ${n} sides is`,
    `${sum}°`,
    [`${n * 180}°`, `${(n - 1) * 180}°`, `360°`],
    `Interior sum = (n − 2) × 180° = (${n} − 2) × 180 = ${sum}°. ${n * 180} forgets to subtract the two triangles' worth that close the shape. ${(n - 1) * 180} subtracts only one. 360° is the quadrilateral sum, or the exterior sum, not this polygon's interior sum unless n = 4.`,
  );
}

function data(i) {
  const id = "m-data";
  const kind = i % 5;
  if (kind === 0) {
    const a = 4 + (i % 7);
    const nums = [a, a + 2, a + 4, a + 6];
    const mean = a + 3;
    return mcq(
      id,
      i,
      `The mean of ${nums.join(", ")} is`,
      String(mean),
      [String(a), String(nums[nums.length - 1]), String(a + 2)],
      `Mean = sum / count. Sum = ${nums.reduce((s, n) => s + n, 0)} and there are 4 numbers, so the mean is ${mean}. ${a} is the smallest value. ${nums[nums.length - 1]} is the largest. ${a + 2} is one of the data values, not the average.`,
    );
  }
  if (kind === 1) {
    const a = 3 + (i % 8);
    const nums = [a, a + 1, a + 4, a + 7, a + 9];
    const median = a + 4;
    return mcq(
      id,
      i,
      `The median of ${nums.join(", ")} is`,
      String(median),
      [String(a), String(a + 9), String(a + 1)],
      `For five numbers already in order, the median is the third one. That is ${median}. The first and last values are the extremes. ${a + 1} is the second value, not the middle.`,
    );
  }
  if (kind === 2) {
    const mode = 5 + (i % 6);
    const other = mode + 3;
    const list = [mode, other, mode, other + 1, mode];
    return mcq(
      id,
      i,
      `The mode of ${list.join(", ")} is`,
      String(mode),
      [String(other), String(other + 1), String(mode + other)],
      `The mode is the value that appears most often. ${mode} appears three times. ${other} appears once, and ${other + 1} appears once. The sum of two values is not the mode.`,
    );
  }
  if (kind === 3) {
    const red = 2 + (i % 4);
    const blue = 3 + (i % 5);
    const total = red + blue;
    return mcq(
      id,
      i,
      `A bag has ${red} red balls and ${blue} blue balls. The probability of drawing a red ball is`,
      frac(red, total),
      [frac(blue, total), frac(red, blue), "1", "0"],
      `Probability = favourable / total = ${red}/${total} = ${frac(red, total)}. ${frac(blue, total)} is the probability of blue. ${frac(red, blue)} compares red with blue, not with the total. ${frac(1, red)} is not the number of favourable outcomes over the total.`,
    );
  }
  const part = 20 + 5 * (i % 6);
  const total = 120;
  const angle = (part / total) * 360;
  return mcq(
    id,
    i,
    `In a pie chart, a category has ${part} out of ${total}. Its central angle is`,
    `${angle}°`,
    [`${part}°`, `${(part / total) * 100}°`, `${360 - angle}°`],
    `Central angle = (value / total) × 360 = (${part}/${total}) × 360 = ${angle}°. ${part}° uses the raw value as if it were already an angle. ${(part / total) * 100}° is the percentage, not the angle. ${360 - angle}° is the rest of the circle.`,
  );
}

function graphs(i) {
  const id = "m-graphs";
  const fixed = [
    [
      "The point (3, −2) lies in",
      "Quadrant IV",
      "Quadrant I",
      "Quadrant II",
      "Quadrant III",
      "x is positive and y is negative, which is Quadrant IV. Quadrant I is (+, +). Quadrant II is (−, +). Quadrant III is (−, −).",
    ],
    [
      "The point (−4, 5) lies in",
      "Quadrant II",
      "Quadrant I",
      "Quadrant III",
      "Quadrant IV",
      "x is negative and y is positive, so the point is in Quadrant II. Quadrant I needs both positive. Quadrant III needs both negative. Quadrant IV needs x positive and y negative.",
    ],
    [
      "A square has how many lines of symmetry?",
      "4",
      "2",
      "1",
      "8",
      "A square has two lines through opposite vertices and two through the midpoints of opposite sides, so 4 lines. A rectangle that is not a square has 2. An isosceles triangle that is not equilateral has 1. 8 counts something else, such as twice the sides.",
    ],
    [
      "A rectangle that is not a square has how many lines of symmetry?",
      "2",
      "4",
      "1",
      "0",
      "The two lines joining midpoints of opposite sides are lines of symmetry. The diagonals of a non-square rectangle are not lines of symmetry, so it does not have 4. It is not asymmetric, so 0 is wrong, and it has more than one line.",
    ],
    [
      "An equilateral triangle has how many lines of symmetry?",
      "3",
      "1",
      "2",
      "4",
      "Each line from a vertex to the midpoint of the opposite side is a line of symmetry, so there are 3. An isosceles triangle that is not equilateral has 1. 2 and 4 are the counts for a rectangle and a square.",
    ],
    [
      "The point (0, 4) lies on",
      "the y-axis",
      "the x-axis",
      "Quadrant I",
      "Quadrant II",
      "The x-coordinate is 0, so the point is on the y-axis, 4 units up. The x-axis is the set of points with y = 0. A point on an axis is not inside a quadrant.",
    ],
  ];
  if (i < fixed.length) {
    const [stem, c, w1, w2, w3, ex] = fixed[i];
    return mcq(id, i, stem, c, [w1, w2, w3], ex);
  }
  const x = 1 + i;
  const y = 2 + (i % 5);
  const m = 1 + (i % 3);
  const c0 = y - m * x;
  const x2 = x + 2;
  const y2 = m * x2 + c0;
  return mcq(
    id,
    i,
    `A straight line passes through (${x}, ${y}). For every 1 step right, it goes ${m} step${m > 1 ? "s" : ""} up. The y-value when x = ${x2} is`,
    String(y2),
    [String(y + 1), String(y + m), String(x2 + y), String(y), "0"],
    `From x = ${x} to x = ${x2} is 2 steps right. Each step raises y by ${m}, so y rises by ${2 * m}. New y = ${y} + ${2 * m} = ${y2}. ${y + 1} moves only one step in y. ${y + m} is the rise for one step right, but x moved by 2. ${x2 + y} adds the new x to the old y, which is not how a line works.`,
  );
}

const concept = {
  rational:
    "A rational number can be written as p/q where p and q are integers and q is not 0. Add and subtract with a common denominator: a/b + c/d = (ad + bc)/bd. Multiply tops and bottoms. To divide, multiply by the reciprocal. The additive inverse of a number adds with it to give 0. The multiplicative inverse multiplies with it to give 1. Example: 1/2 + 1/3 = 5/6.",
  integers:
    "Integers include negative numbers, zero, and positive numbers. The product of two negatives is positive. A fraction of a quantity means multiply. Line up decimal points before adding. Temperature: F = (9/5)C + 32. Example: (−6) × (−4) = 24, and 20°C = 68°F.",
  playing:
    "Divisible by 2: last digit even. By 5: last digit 0 or 5. By 3 or 9: digit sum divisible by 3 or 9. By 10: last digit 0. HCF × LCM = product of the two numbers. Prime factorisation writes the number as a product of primes. Example: 84 = 2 × 2 × 3 × 7.",
  exponents:
    "Same base: multiply by adding powers, divide by subtracting powers. (a^m)^n = a^(mn). a^0 = 1 for a ≠ 0. a^(−n) = 1/a^n. Standard form uses a number from 1 to just under 10 times a power of 10. Example: 2^3 × 2^4 = 2^7.",
  squares:
    "n² = n × n. √(n²) = n for a positive n. A perfect square has even powers in its prime factorisation. In a right triangle, a² + b² = c². Example: the smallest multiplier that makes 12 a square is 3, because 12 = 2² × 3.",
  cubes:
    "n³ = n × n × n. The cube of a negative number is negative. A perfect cube has prime powers that are multiples of 3. Example: 2³ = 8 and ∛8 = 2. (−3)³ = −27.",
  algebra:
    "(a + b)² = a² + 2ab + b². (a − b)² = a² − 2ab + b². a² − b² = (a − b)(a + b). (x + a)(x + b) = x² + (a + b)x + ab. Add like terms only. Example: (x + 2)(x + 3) = x² + 5x + 6.",
  factorisation:
    "Take out the common factor first. Then look for a² − b², (a + b)², (a − b)², or two numbers that add and multiply to the right values. Example: x² + 5x + 6 = (x + 2)(x + 3). Check by expanding.",
  equations:
    "To solve ax + b = c, undo the addition, then undo the multiplication. In a word problem, name the unknown, write the sentence as an equation, and check the answer in the story. Example: 3x + 1 = 10 gives 3x = 9, so x = 3.",
  comparing:
    "Percent means out of 100. Profit and discount are percents of the cost or the marked price, not extra rupees added to the percent number. Simple interest = PRT/100. For 2 years at 10% compound, multiply by 1.21. A ratio a : b means the fraction a/(a + b) of the whole. Example: 10% of ₹200 is ₹20.",
  proportion:
    "Direct proportion: both quantities rise together, and a/b = c/d. Inverse proportion: one rises while the other falls, and the product stays the same. Together, A and B finish a job in ab/(a + b) days. Example: 6 workers take half as long as 3 workers on the same wall.",
  mensuration:
    "Rectangle area = l × b. Triangle area = (1/2) × base × height. Circle area = πr² and circumference = 2πr. Cuboid volume = l × b × h. Cylinder curved surface = 2πrh. 1 m² = 10,000 cm². Use π = 22/7 when the radius is a multiple of 7. Example: radius 7 cm gives area 154 cm².",
  triangles:
    "The angles of a triangle add to 180°. An exterior angle equals the sum of the two remote interior angles. A right triangle obeys a² + b² = c². SAS: two sides and the included angle. RHS: right angle, hypotenuse, and one side. Example: angles 50° and 60° leave 70°.",
  quads:
    "A quadrilateral's interior angles add to 360°. Opposite sides of a parallelogram are equal and parallel. Exterior angles of any convex polygon add to 360°. Interior sum = (n − 2) × 180°. Diagonals = n(n − 3)/2. Euler: V − E + F = 2. Example: a cube has F = 6.",
  data:
    "Mean = sum / count. Median is the middle value after sorting. Mode is the most frequent value. Probability = favourable / total. Pie angle = (value / total) × 360°. Example: the mean of 4, 6, 8, 10 is 7.",
  graphs:
    "Quadrant I is (+, +), II is (−, +), III is (−, −), IV is (+, −). A point with x = 0 is on the y-axis. A square has 4 lines of symmetry, a non-square rectangle has 2, an equilateral triangle has 3. On a straight line, rise stays in proportion to the run. Example: (3, −2) is in Quadrant IV.",
};

const ncert = {
  rational: "NCERT Class 8 Maths, Chapter 1: Rational Numbers",
  integers: "NCERT Class 8 Maths, number system: integers, fractions and decimals",
  playing: "NCERT Class 8 Maths, playing with numbers and divisibility",
  exponents: "NCERT Class 8 Maths, Chapter 12: Exponents and Powers",
  squares: "NCERT Class 8 Maths, Chapter 6: Squares and Square Roots",
  cubes: "NCERT Class 8 Maths, Chapter 7: Cubes and Cube Roots",
  algebra: "NCERT Class 8 Maths, Chapter 9: Algebraic Expressions and Identities",
  factorisation: "NCERT Class 8 Maths, Chapter 14: Factorisation",
  equations: "NCERT Class 8 Maths, Chapter 2: Linear Equations in One Variable",
  comparing: "NCERT Class 8 Maths, Chapter 8: Comparing Quantities",
  proportion: "NCERT Class 8 Maths, Chapter 13: Direct and Inverse Proportions",
  mensuration: "NCERT Class 8 Maths, Chapter 11: Mensuration",
  triangles: "NCERT Class 8 Maths: triangles, congruence, lines and angles",
  quads: "NCERT Class 8 Maths, Chapter 3: Understanding Quadrilaterals",
  data: "NCERT Class 8 Maths, Chapter 5: Data Handling",
  graphs: "NCERT Class 8 Maths, Chapter 15: Introduction to Graphs, and symmetry",
};

export const topics = [
  topic({ id: "m-rational", title: "Rational Numbers", ncert: ncert.rational, minutes: 20, concept: concept.rational }, rational),
  topic({ id: "m-integers", title: "Integers, Fractions and Decimals", ncert: ncert.integers, minutes: 20, concept: concept.integers }, integers),
  topic({ id: "m-playing", title: "Playing with Numbers", ncert: ncert.playing, minutes: 20, concept: concept.playing }, playing),
  topic({ id: "m-exponents", title: "Exponents and Powers", ncert: ncert.exponents, minutes: 20, concept: concept.exponents }, exponents),
  topic({ id: "m-squares", title: "Squares and Square Roots", ncert: ncert.squares, minutes: 20, concept: concept.squares }, squares),
  topic({ id: "m-cubes", title: "Cubes and Cube Roots", ncert: ncert.cubes, minutes: 20, concept: concept.cubes }, cubes),
  topic({ id: "m-algebra", title: "Algebraic Expressions and Identities", ncert: ncert.algebra, minutes: 22, concept: concept.algebra }, algebra),
  topic({ id: "m-factorisation", title: "Factorisation", ncert: ncert.factorisation, minutes: 20, concept: concept.factorisation }, factorisation),
  topic({ id: "m-equations", title: "Linear Equations", ncert: ncert.equations, minutes: 20, concept: concept.equations }, equations),
  topic({ id: "m-comparing", title: "Comparing Quantities", ncert: ncert.comparing, minutes: 22, concept: concept.comparing }, comparing),
  topic({ id: "m-proportion", title: "Proportion, Time and Work", ncert: ncert.proportion, minutes: 20, concept: concept.proportion }, proportion),
  topic({ id: "m-mensuration", title: "Mensuration and Circles", ncert: ncert.mensuration, minutes: 22, concept: concept.mensuration }, mensuration),
  topic({ id: "m-triangles", title: "Triangles, Congruence and Angles", ncert: ncert.triangles, minutes: 20, concept: concept.triangles }, triangles),
  topic({ id: "m-quads", title: "Quadrilaterals and Polygons", ncert: ncert.quads, minutes: 20, concept: concept.quads }, quads),
  topic({ id: "m-data", title: "Data Handling", ncert: ncert.data, minutes: 18, concept: concept.data }, data),
  topic({ id: "m-graphs", title: "Graphs and Symmetry", ncert: ncert.graphs, minutes: 18, concept: concept.graphs }, graphs),
];
