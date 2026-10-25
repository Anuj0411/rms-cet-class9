import type { NoteBit } from "./types.ts";

export const mathsNotes: Record<string, NoteBit[]> = {
  "m-rational": [
    {
      idea: "A rational number is a fraction p/q. p and q are integers, and q is never 0.",
      example: "2/3, −5/1 and 0 are rational. 1/0 is not a number.",
    },
    {
      idea: "To add or subtract, make the denominators the same. Then add or subtract only the tops.",
      example: "1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
    },
    {
      idea: "To multiply, multiply the tops and multiply the bottoms. Cancel a common factor first if you can.",
      example: "2/3 × 3/4 = 6/12 = 1/2.",
    },
    {
      idea: "To divide, multiply by the reciprocal. Flip the second fraction.",
      example: "3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8.",
    },
    {
      idea: "The additive inverse is the number that adds to 0. Just change the sign.",
      example: "The additive inverse of −2/4 is +2/4, which is 1/2.",
    },
    {
      idea: "The reciprocal (multiplicative inverse) flips the fraction. Their product is 1. Zero has no reciprocal.",
      example: "The reciprocal of −3/5 is −5/3. The reciprocal of 4 is 1/4.",
    },
    {
      idea: "A number exactly halfway between two rationals is their average.",
      example: "Halfway between 1/5 and 2/7 is (1/5 + 2/7) ÷ 2 = 17/70.",
    },
    {
      idea: "To see which fraction is larger, cross-multiply. Compare a×d with b×c for a/b and c/d.",
      example: "3/5 or 5/8: 3×8 = 24 and 5×5 = 25. 25 is bigger, so 5/8 is larger.",
    },
  ],
  "m-integers": [
    {
      idea: "Same signs add and keep the sign. Different signs subtract and keep the sign of the bigger number.",
      example: "(−8) + (−3) = −11. (−8) + 3 = −5.",
    },
    {
      idea: "Subtracting a number means adding its opposite.",
      example: "5 − (−2) = 5 + 2 = 7. (−4) − 3 = −7.",
    },
    {
      idea: "Negative times negative is positive. Negative times positive is negative.",
      example: "(−3) × (−4) = 12. (−3) × 4 = −12.",
    },
    {
      idea: "“A fraction of a number” means multiply.",
      example: "3/4 of 20 = 3/4 × 20 = 15.",
    },
    {
      idea: "Line up decimal points before you add or subtract. Count decimal places when you multiply.",
      example: "2.5 × 0.4 = 1.00, because 25 × 4 = 100 and there are two decimal places in all.",
    },
    {
      idea: "°F = °C × 9/5 + 32. °C = (°F − 32) × 5/9.",
      example: "15°C = 15 × 9/5 + 32 = 59°F. 0°C = 32°F. 100°C = 212°F.",
    },
  ],
  "m-playing": [
    {
      idea: "A number is divisible by 2 if its last digit is even, by 5 if it ends in 0 or 5, and by 10 if it ends in 0.",
    },
    {
      idea: "Divisible by 3 if the digit sum is divisible by 3. By 9 if the digit sum is divisible by 9.",
      example: "261: 2+6+1 = 9, so 261 is divisible by 3 and by 9.",
    },
    {
      idea: "By 4, check the last two digits. By 8, check the last three digits.",
      example: "316 is divisible by 4 because 16 is. 1128 is divisible by 8 because 128 is.",
    },
    {
      idea: "By 11, the alternating sum of digits is 0 or a multiple of 11.",
      example: "121: 1 − 2 + 1 = 0, so 121 is divisible by 11.",
    },
    {
      idea: "By 6 means by both 2 and 3. There is no separate trick.",
    },
    {
      idea: "A prime number has exactly two factors: 1 and itself. 1 is not prime. 2 is the only even prime.",
      example: "2, 3, 5, 7, 11 are prime. 9 = 3 × 3, so 9 is not prime.",
    },
    {
      idea: "For two numbers, HCF × LCM = the product of the numbers.",
      example: "16 and 24. HCF is 8, so LCM = (16 × 24) / 8 = 48.",
    },
  ],
  "m-exponents": [
    {
      idea: "When you multiply the same base, add the powers. When you divide, subtract the powers.",
      example: "2² × 2¹ = 2³ = 8. 5⁴ ÷ 5² = 5² = 25.",
    },
    {
      idea: "A power of a power: multiply the powers. (ab)ᵐ = aᵐ × bᵐ. (a/b)ᵐ = aᵐ / bᵐ.",
      example: "(2³)² = 2⁶ = 64. (2 × 3)² = 4 × 9 = 36.",
    },
    {
      idea: "Any non-zero number to the power 0 is 1. 0⁰ is not used.",
      example: "7⁰ = 1. (−4)⁰ = 1.",
    },
    {
      idea: "A negative power means “1 over” that positive power.",
      example: "5⁻² = 1/5² = 1/25. 2⁻³ = 1/8.",
    },
    {
      idea: "Standard form writes a number as a number from 1 up to 10, times a power of 10.",
      example: "70000 = 7 × 10⁴. 0.004 = 4 × 10⁻³.",
    },
  ],
  "m-squares": [
    {
      idea: "A square number is n × n. Learn 1² to 20², and at least 11² = 121, 12² = 144, 13² = 169, 15² = 225, 25² = 625.",
    },
    {
      idea: "A square never ends in 2, 3, 7 or 8. If a number ends in one of those, it is not a perfect square.",
    },
    {
      idea: "Between n² and (n+1)² there are 2n numbers that are not squares.",
      example: "Between 4² = 16 and 5² = 25 there are 2×4 = 8 numbers.",
    },
    {
      idea: "Pythagorean triples: 3,4,5 and 5,12,13 and their multiples. 6,8,10 is just 2 times 3,4,5.",
    },
    {
      idea: "Square root undoes squaring. To find it, pair the prime factors.",
      example: "√144 = 12 because 144 = 12 × 12. √2 is not a whole number.",
    },
    {
      idea: "To make a perfect square, pair the prime factors. Multiply by whatever is left unpaired.",
      example: "28 = 2 × 2 × 7. The 7 is alone, so multiply by 7. 196 = 14².",
    },
  ],
  "m-cubes": [
    {
      idea: "A cube is n × n × n. Learn 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³=216, 7³=343, 8³=512, 9³=729, 10³=1000.",
    },
    {
      idea: "A negative number cubed stays negative.",
      example: "(−2)³ = −8. The cube root of −8 is −2.",
    },
    {
      idea: "Cube root undoes cubing. The cube root of 27 is 3, because 3 × 3 × 3 = 27.",
    },
    {
      idea: "Ones digit of a cube tells the ones digit of the cube root: 0→0, 1→1, 4→4, 5→5, 6→6, 9→9, and 2 swaps with 8, 3 swaps with 7.",
      example: "If a cube ends in 3, its cube root ends in 7. 13³ ends in 7, and 7³ = 343 ends in 3.",
    },
    {
      idea: "1729 is the smallest number that is a sum of two cubes in two ways.",
      example: "1729 = 1³ + 12³ = 9³ + 10³. It is called the Hardy–Ramanujan number.",
    },
    {
      idea: "To make a perfect cube, group prime factors in threes. Multiply by the factors that are short.",
      example: "36 = 2 × 2 × 3 × 3. It needs one more 2 and one more 3, so multiply by 6.",
    },
  ],
  "m-algebra": [
    {
      idea: "(a + b)² = a² + 2ab + b². (a − b)² = a² − 2ab + b².",
      example: "(2 + 3)² = 4 + 12 + 9 = 25, which is also 5².",
    },
    {
      idea: "a² − b² = (a − b)(a + b).",
      example: "49 − 16 = (7 − 4)(7 + 4) = 3 × 11 = 33.",
    },
    {
      idea: "(x + a)(x + b) = x² + (a + b)x + ab.",
      example: "(x + 2)(x + 3) = x² + 5x + 6.",
    },
    {
      idea: "Add like terms only. Same letter and same power.",
      example: "3x + 5x = 8x. 3x + 5x² stays as it is. They are not like terms.",
    },
  ],
  "m-factorisation": [
    {
      idea: "Take out the common factor first.",
      example: "2x + 4 = 2(x + 2). 6x² + 9x = 3x(2x + 3).",
    },
    {
      idea: "x² + (sum)x + (product) splits into two brackets.",
      example: "x² + 5x + 6 = (x + 2)(x + 3), because 2 + 3 = 5 and 2 × 3 = 6.",
    },
    {
      idea: "Use a² − b² and the perfect-square identities when you see them.",
      example: "x² − 9 = (x − 3)(x + 3). x² + 6x + 9 = (x + 3)².",
    },
    {
      idea: "Always multiply the factors back. If you get the original expression, the factorisation is right.",
    },
  ],
  "m-equations": [
    {
      idea: "Do the same thing to both sides. The equation stays true.",
      example: "2x + 1 = 5. Subtract 1: 2x = 4. Divide by 2: x = 2.",
    },
    {
      idea: "When a term crosses the equals sign, its sign flips. + becomes −, and × becomes ÷.",
      example: "x + 7 = 3 means x = 3 − 7 = −4.",
    },
    {
      idea: "Check by putting the answer back into the original equation.",
      example: "If x = 2, then 2(2) + 1 = 5. It matches, so x = 2 is correct.",
    },
    {
      idea: "In an age or perimeter story, name the unknown, write one equation, then solve it.",
      example: "A boy is 4 years younger than his sister. Their ages add to 8. Boy x, sister x+4. x + (x+4) = 8, so x = 2.",
    },
  ],
  "m-comparing": [
    {
      idea: "x% of a number = (x/100) × the number.",
      example: "15% of 200 = 0.15 × 200 = 30.",
    },
    {
      idea: "Profit and loss are always a percent of the cost price, not the selling price, unless the question says otherwise.",
      example: "CP 200, profit 5%. Profit = 10, so SP = 210.",
    },
    {
      idea: "Discount is taken off the marked price. SP = marked price − discount.",
      example: "Marked 500, discount 10%. Discount = 50, so you pay 450.",
    },
    {
      idea: "Simple interest = PRT/100. Amount = principal + interest.",
      example: "₹1000 at 10% for 2 years: interest = 1000×10×2/100 = ₹200. Amount = ₹1200.",
    },
    {
      idea: "Compound interest grows on the new amount each year. For 2 years at 10%, multiply by 1.10 × 1.10 = 1.21.",
      example: "₹1000 becomes 1000 × 1.21 = ₹1210. CI = ₹210, which is ₹10 more than SI.",
    },
    {
      idea: "GST is extra unless the price already says “inclusive”.",
      example: "Bill ₹200, GST 5%. Tax = ₹10, so you pay ₹210.",
    },
    {
      idea: "In a ratio a : b, one part is a/(a+b) of the total.",
      example: "Boys : girls = 2 : 4. Boys are 2/6 of the children, which is 1/3.",
    },
  ],
  "m-proportion": [
    {
      idea: "a : b = c : d means a/b = c/d, so a×d = b×c.",
      example: "2 : 4 = 3 : x. Then 2x = 12, so x = 6.",
    },
    {
      idea: "If two people finish a job in a days and b days, together they take ab/(a+b) days.",
      example: "6 days and 3 days. Together: (6×3)/(6+3) = 18/9 = 2 days.",
    },
    {
      idea: "Inverse proportion: if one quantity doubles, the other halves. Their product stays the same.",
      example: "6 workers take 4 days. 12 workers take 2 days, because 6×4 = 12×2.",
    },
  ],
  "m-mensuration": [
    {
      idea: "Rectangle: area = length × breadth. Perimeter = 2(length + breadth).",
      example: "5 by 3: area 15, perimeter 16.",
    },
    {
      idea: "Square: area = side². Perimeter = 4 × side. Triangle: area = (1/2) × base × height.",
    },
    {
      idea: "Parallelogram: area = base × height. Trapezium: (1/2) × (sum of the parallel sides) × height.",
    },
    {
      idea: "Circle: area = πr². Circumference = 2πr. Use π = 22/7 when the radius is a multiple of 7.",
      example: "r = 7: area = 22/7 × 49 = 154. Circumference = 2 × 22/7 × 7 = 44.",
    },
    {
      idea: "Cuboid: volume = length × breadth × height. Surface = 2(lb + bh + hl). Cube: volume = side³, surface = 6 × side².",
    },
    {
      idea: "Cylinder: volume = πr²h. Curved surface = 2πrh. Total surface adds the two circles: 2πrh + 2πr².",
    },
    {
      idea: "Area units: 1 m² = 10,000 cm², because 1 m = 100 cm and you square both.",
      example: "2 m² = 20,000 cm².",
    },
  ],
  "m-triangles": [
    {
      idea: "The three angles of a triangle add to 180°. An exterior angle equals the sum of the two interior angles that are not next to it.",
    },
    {
      idea: "Equilateral: all sides equal, every angle 60°. Isosceles: two sides equal, and the base angles equal.",
    },
    {
      idea: "Pythagoras, right triangle only: (one leg)² + (other leg)² = (longest side)².",
      example: "3² + 4² = 9 + 16 = 25 = 5².",
    },
    {
      idea: "Two triangles are congruent (same size and shape) by SSS, SAS, ASA, or RHS. AAA only makes them similar, not always congruent.",
    },
    {
      idea: "RHS means right angle, hypotenuse, and one other side. Use it only when there is a right angle.",
    },
    {
      idea: "SAS means two sides and the angle that sits between those sides. The third angle of a triangle is 180° minus the other two.",
      example: "Angles 50° and 60°. Third angle = 180 − 110 = 70°.",
    },
  ],
  "m-quads": [
    {
      idea: "The four angles of any quadrilateral add to 360°.",
    },
    {
      idea: "A parallelogram has opposite sides equal and parallel, and opposite angles equal. Diagonals bisect each other.",
    },
    {
      idea: "A rectangle is a parallelogram with right angles. Its diagonals are equal. A rhombus has all sides equal, and its diagonals cross at right angles.",
    },
    {
      idea: "A square has all the properties of a rectangle and a rhombus. A kite has two pairs of adjacent equal sides.",
    },
    {
      idea: "Exterior angles of any polygon add to 360°. Interior angle sum = (n − 2) × 180°.",
      example: "A hexagon has 6 sides. Interior sum = 4 × 180° = 720°.",
    },
    {
      idea: "For a solid, vertices − edges + faces = 2.",
      example: "A cube: 8 vertices, 12 edges, 6 faces. 8 − 12 + 6 = 2. If you know V and E, F = E − V + 2.",
    },
    {
      idea: "A regular polygon has equal sides and equal angles. Each exterior angle is 360° ÷ number of sides. Number of diagonals = n(n − 3)/2.",
      example: "A regular hexagon: each exterior angle is 60°. Diagonals = 6 × 3 / 2 = 9.",
    },
  ],
  "m-data": [
    {
      idea: "Mean is the average: add the numbers, then divide by how many there are.",
      example: "4, 6, 8, 10. Sum 28. Mean = 28/4 = 7.",
    },
    {
      idea: "Median is the middle value after you sort. If there are two middle values, take their average. Mode is the value that appears most often.",
      example: "3, 5, 5, 9. Median is the average of 5 and 5, which is 5. Mode is 5.",
    },
    {
      idea: "Probability = favourable outcomes / total equally likely outcomes. It is always from 0 to 1.",
      example: "3 red and 6 blue. P(red) = 3/9 = 1/3. A sure event is 1. An impossible event is 0.",
    },
    {
      idea: "A pie-chart angle = (that value / total) × 360°.",
      example: "20 out of 80: angle = (20/80) × 360 = 90°.",
    },
  ],
  "m-graphs": [
    {
      idea: "A point is written (x, y). x is across, y is up. The origin is (0, 0).",
      example: "(3, −2) is 3 right and 2 down. That is the fourth quadrant.",
    },
    {
      idea: "Quadrant I is (+,+), II is (−,+), III is (−,−), IV is (+,−).",
    },
    {
      idea: "A bar graph compares separate items. A histogram shows continuous groups with no gap. A line graph shows change over time.",
    },
    {
      idea: "Lines of symmetry: a square has 4, a non-square rectangle has 2, an equilateral triangle has 3, a circle has infinitely many.",
    },
    {
      idea: "If x is 0, the point is on the y-axis. If y is 0, the point is on the x-axis. On a straight line, the rise stays in step with the run.",
      example: "(0, 4) is on the y-axis. From (7, 3), one step right and one step up reaches (9, 5).",
    },
  ],
};
