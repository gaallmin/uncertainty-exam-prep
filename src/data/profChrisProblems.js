// Data for the "Prof Chris Problems" page — every actual class-test / exercise
// question, solved step by step using the same block vocabulary as chapters.js
// (p, subheading, math, steps, table, list, interpret, trap), consumed by
// ProblemCard via the shared <Block> renderer from Section.jsx.

export const decisionGuide = [
  { signal: '"Solve the ODE" alone', type: 'Ch1 separable or integrating factor' },
  { signal: 'dR/dS = k/S  (no R on right)', type: 'Weber–Fechner: direct integration → log solution' },
  { signal: 'dR/dS = n·R/S  (R on right)', type: 'Stevens power law: separate variables → power solution' },
  { signal: '"fixed point" + "Jacobian"', type: 'Ch2 stability pipeline' },
  { signal: '"only x is measurable"', type: 'Ch3 system reduction → identifiability' },
  { signal: 'd²x/dt² appears in question', type: 'Ch3 first-order system conversion (let z = ẋ)' },
  { signal: '"identify" or "identifiable"', type: 'Ch3 — check coefficients + check ICs' },
  { signal: '"cannot identify" or x₀ = 0', type: 'Negative / conditional identifiability (Ex4 Q2, Q3)' },
  { signal: '"least squares" or "best fit"', type: 'Ch4 Gauss-Newton' },
  { signal: 'S(t) = ∂y/∂q  or "sensitivity"', type: 'Ch5 — differentiate the ODE w.r.t. the parameter' },
  { signal: '∂²u/∂t²  or  ∂u/∂t', type: 'Ch6 PDE → Method of Lines' },
  { signal: '"convergence" or "grid spacing"', type: 'Ch6 — error ∝ Δx² argument' },
  { signal: '"model discrepancy" or δ(x)', type: 'Ch7 UQ framework' },
]

export const twoAlwaysSignals = [
  '"triangular matrix" → eigenvalues = diagonal, never solve the quadratic',
  '"det(J) < 0" → saddle, stop immediately, no further calculation needed',
]

const ct1a = {
  id: 'ct1-a',
  source: 'CT1',
  topic: 'Stimulus-Response ODE (Stevens Power Law)',
  question:
    'One model for sensory response is dR/dS = n·R/S.\n' +
    '(a) Solve and show R = KS^n\n' +
    '(b) Why is (S,R) = (0,0) a bad point to fit parameters?\n' +
    '(c) Use two data points to find K and n\n' +
    '(d) If stimulus doubles, by what factor does response increase?',
  problemType: 'Separable ODE → parameter fitting from two data points → prediction.',
  body: [
    { type: 'subheading', text: 'Part (a) — Solve dR/dS = n·R/S' },
    {
      type: 'steps',
      items: [
        { text: 'Separate variables — R and S split cleanly onto opposite sides.', tex: '\\frac{dR}{R} = n\\,\\frac{dS}{S}', inline: true },
        { text: 'Integrate both sides.', tex: '\\ln|R| = n\\ln|S| + C', inline: true },
        { text: 'Exponentiate to undo the logs.', tex: 'R = e^{C}S^n', inline: true },
        { text: 'Rename $e^C = K$ — it is just a positive constant.', tex: 'R = KS^n', inline: true },
      ],
    },
    {
      type: 'p',
      text: 'We separate because R and S factorise as $R/S = (R)(1/S)$ — integrating $1/R$ gives $\\ln|R|$, and $n(1/S)$ gives $n\\ln|S|$; exponentiating converts the log form back into a power form.',
    },
    { type: 'subheading', text: 'Part (b) — Why is (0,0) useless?' },
    {
      type: 'p',
      text: 'Substitute $S=0,\\,R=0$ into $R=KS^n$: $0 = K\\cdot 0^n = 0$ for *any* value of $K$ and $n$ — the equation is satisfied trivially regardless of the parameters, so this point carries no information about them.',
    },
    { type: 'subheading', text: 'Part (c) — Find K and n from two data points' },
    { type: 'p', text: 'Two equations, two unknowns: $18 = K\\cdot 30^n$ (i) and $60 = K\\cdot 40^n$ (ii).' },
    {
      type: 'steps',
      items: [
        { text: 'Divide (ii) by (i) to eliminate K.', tex: '\\frac{60}{18} = \\left(\\frac{40}{30}\\right)^n \\;\\implies\\; \\frac{10}{3} = \\left(\\frac{4}{3}\\right)^n', inline: true },
        { text: 'Take $\\ln$ of both sides and solve for n.', tex: 'n = \\frac{\\ln(10/3)}{\\ln(4/3)} \\approx 4.185', inline: true },
        { text: 'Back-substitute into (i) to find K.', tex: 'K = \\frac{18}{30^{n}} \\approx 1.184\\times 10^{-5}', inline: true },
      ],
    },
    {
      type: 'p',
      text: 'Dividing first eliminates K cleanly in one step; taking logs then converts the power into a product, making n solvable directly.',
    },
    { type: 'subheading', text: 'Part (d) — Double the stimulus' },
    { type: 'math', tex: 'R_{\\text{new}} = K(2S)^n = 2^n\\cdot KS^n = 2^n\\cdot R_{\\text{old}}' },
    { type: 'p', text: 'Factor increase $= 2^n = 2^{4.185}\\approx 18.2$.' },
  ],
  pattern:
    'Separable ODE of the form $dy/y = f(x)dx \\to \\ln y = F(x)+C \\to y = Ae^{F(x)}$. For a power-law $R=KS^n$: always eliminate $K$ first by dividing two data equations, then take $\\ln$ to solve for $n$, then back-substitute for $K$. Never use $(0,0)$ — it gives $0=0$ for any parameters.',
  examSentence:
    '"The point (0,0) satisfies R = KS^n for all K and n, so it carries no information about the parameters. Doubling S multiplies R by 2^n."',
  variantPrompt:
    'Give me a new stimulus-response problem like the Stevens power law one (dR/dS = n·R/S), with different data points to fit K and n, and walk me through solving it using the same separable-ODE pattern.',
}

const ct1b = {
  id: 'ct1-b',
  source: 'CT1',
  topic: 'Stability of a 2D Competition System',
  question:
    'Given ẋ = x - x² - xy, ẏ = ½y - ¼y² - ¾xy:\n' +
    '(a) Show (0,2) is a fixed point\n' +
    '(b) Solve numerically from two starting points and sketch\n' +
    '(c) Determine stability from trajectories (one sentence)\n' +
    '(d) Show mathematically via Jacobian and eigenvalues',
  problemType:
    '2D nonlinear system → verify a fixed point by substitution → compute the Jacobian → classify stability from its eigenvalues.',
  body: [
    { type: 'subheading', text: 'Part (a) — Verify (0,2) is a fixed point' },
    { type: 'p', text: 'Substitute $x^*=0,\\,y^*=2$ directly into both equations.' },
    {
      type: 'math',
      tex: 'f(0,2) = 0 - 0^2 - 0\\cdot 2 = 0\\;\\checkmark, \\qquad g(0,2) = \\tfrac12(2) - \\tfrac14(4) - \\tfrac34(0)(2) = 1-1-0 = 0\\;\\checkmark',
    },
    {
      type: 'p',
      text: 'Both are zero, so (0,2) is a fixed point. Exam note: show the arithmetic explicitly — do not just say "by substitution."',
    },
    { type: 'subheading', text: 'Part (c) — Stability from the trajectories (one sentence)' },
    { type: 'p', text: '"Stable — both trajectories tend towards the fixed point (0,2) as t increases."' },
    { type: 'subheading', text: 'Part (d) — Jacobian and eigenvalues' },
    {
      type: 'steps',
      items: [
        {
          text: 'Compute all four partial derivatives symbolically.',
          tex: '\\frac{\\partial f}{\\partial x} = 1-2x-y,\\ \\ \\frac{\\partial f}{\\partial y} = -x,\\ \\ \\frac{\\partial g}{\\partial x} = -\\tfrac34 y,\\ \\ \\frac{\\partial g}{\\partial y} = \\tfrac12 - \\tfrac12 y - \\tfrac34 x',
        },
        {
          text: 'Evaluate every one of them at $(0,2)$.',
          tex: '\\frac{\\partial f}{\\partial x} = -1,\\ \\ \\frac{\\partial f}{\\partial y} = 0,\\ \\ \\frac{\\partial g}{\\partial x} = -\\tfrac32,\\ \\ \\frac{\\partial g}{\\partial y} = -\\tfrac12',
        },
        { text: 'Assemble J.', tex: 'J = \\begin{pmatrix} -1 & 0 \\\\ -\\tfrac32 & -\\tfrac12\\end{pmatrix}' },
        {
          text: 'J is lower triangular — read the eigenvalues straight off the diagonal, do NOT solve the quadratic.',
          tex: '\\lambda_1 = -1,\\qquad \\lambda_2 = -\\tfrac12',
        },
        {
          text: 'Classify: both real and negative.',
          tex: '\\text{tr}(J) = -\\tfrac32 < 0,\\quad \\det(J) = \\tfrac12 > 0,\\quad \\Delta = \\tfrac94 - 2 = \\tfrac14 > 0 \\;\\implies\\; \\text{stable node}',
        },
      ],
    },
  ],
  pattern:
    'Fixed-point problems: always verify by substitution first (show the arithmetic). Jacobian: compute the four partials symbolically, THEN plug in $(x^*,y^*)$. Triangular-matrix shortcut: eigenvalues = diagonal — never waste time solving the quadratic. Conclusion sentence: always state eigenvalue signs + node/spiral classification + physical meaning.',
  examSentence:
    '"Both eigenvalues λ₁ = -1, λ₂ = -1/2 are real and negative, so (0,2) is a stable node — trajectories approach the fixed point monotonically."',
  variantPrompt:
    'Give me a new 2D nonlinear competition or predator-prey system like CT1-B, with a different fixed point to verify and classify via the Jacobian, and walk me through it using the same fixed-point → Jacobian → eigenvalue pipeline.',
}

const ct2 = {
  id: 'ct2',
  source: 'CT2',
  topic: 'Predator-Prey System Reduction + Fitting',
  question:
    'Given ẋ = Ax - Bxy, ẏ = -Cy + Dxy, only x is measurable.\n' +
    '(a) Show d²x/dt² = (1/x)(dx/dt)² + Dx(dx/dt) - C(dx/dt) + ACx - ADx²\n' +
    '(b) Write as first-order system in (x,z) where z = dx/dt\n' +
    '(c) Deduce all parameters A,B,C,D are identifiable\n' +
    '(d) Fit using R with given data and initial guess\n' +
    '(e) What dynamics emerge from best-fit parameters?',
  problemType: 'System reduction (eliminate the hidden variable y) → structural identifiability → R-based Gauss-Newton fitting.',
  body: [
    { type: 'subheading', text: 'Part (a) — Eliminate y to get a scalar ODE' },
    {
      type: 'steps',
      items: [
        { text: 'Isolate y from the x equation.', tex: '\\dot x = Ax - Bxy \\;\\implies\\; y = \\frac{Ax-\\dot x}{Bx}' },
        { text: 'Differentiate ẋ (product rule on −Bxy) — this introduces ẏ.', tex: '\\ddot x = A\\dot x - B\\dot x y - Bx\\dot y' },
        { text: 'Substitute ẏ = −Cy + Dxy from the second equation (do not differentiate it again).', tex: '\\ddot x = A\\dot x - B\\dot x y + BCxy - BDx^2y' },
        {
          text: 'Substitute y from Step 1 everywhere it appears.',
          tex: 'B\\dot x y = A\\dot x - \\frac{\\dot x^2}{x},\\quad BCxy = ACx - C\\dot x,\\quad BDx^2y = ADx^2 - Dx\\dot x',
        },
        { text: 'Combine and simplify.', tex: '\\ddot x = \\frac{\\dot x^2}{x} + Dx\\dot x - C\\dot x + ACx - ADx^2' },
      ],
    },
    {
      type: 'p',
      text: 'Why this order: isolate y first so you always know what to substitute; differentiate the observable equation because that introduces ẏ; use ẏ from the system — never differentiate the second equation again.',
    },
    { type: 'subheading', text: 'Part (b) — First-order system' },
    {
      type: 'math',
      tex: '\\dot x = z,\\ \\ x(0)=x_0 \\qquad \\dot z = \\frac{z^2}{x} + Dxz - Cz + ACx - ADx^2,\\ \\ z(0) = Ax_0 - Bx_0y_0',
    },
    { type: 'p', text: 'z(0) comes from the original ẋ equation evaluated at t=0.' },
    { type: 'subheading', text: 'Part (c) — Identifiability' },
    {
      type: 'list',
      items: [
        'Coefficient of $\\dot x$ alone: $-C \\to$ recovers $C$',
        'Coefficient of $x\\dot x$: $D \\to$ recovers $D$',
        'Coefficient of $x$: $AC \\to A = (AC)/C$',
        'Coefficient of $x^2$: $-AD$ — check $AD/D=A$ ✓',
        'From $z(0)=Ax_0-Bx_0y_0$: $B = (Ax_0 - z(0))/(x_0y_0) \\to$ recovers $B$',
      ],
    },
    { type: 'p', text: 'All four parameters A, B, C, D are uniquely recoverable — the system is structurally identifiable from x alone.' },
    { type: 'subheading', text: 'Part (e) — Dynamics from the best fit' },
    {
      type: 'p',
      text: 'Best-fit parameters: A=0.6538, B=1.319, C=1.018, D=1.018. Dynamics: periodic (a predator-prey limit cycle).',
    },
  ],
  pattern:
    'System reduction always: isolate the hidden variable → differentiate the observable → substitute ẏ → substitute y → collect terms. Identifiability: match coefficients of the scalar ODE to parameter combinations. The initial condition z(0) always supplies one extra equation — use it for the last undetermined parameter.',
  examSentence:
    '"The system is structurally identifiable — observing x alone with known initial conditions uniquely determines all four parameters. The best-fit model exhibits periodic dynamics — predator and prey populations oscillate in a sustained limit cycle."',
  variantPrompt:
    'Give me a new two-species predator-prey (or similar hidden-variable) system like CT2, where only one variable is observed, and walk me through eliminating the hidden variable and checking identifiability using the same reduction method.',
}

const ct3a = {
  id: 'ct3-a',
  source: 'CT3',
  topic: 'Sensitivity Analysis',
  question:
    'dy/dt = -ky, y(0) = y₀. Define S(t) = ∂y/∂k.\n' +
    '(a) Derive the ODE for S(t) and its IC\n' +
    '(b) Show S(t) = -y₀te^{-kt}\n' +
    '(c) Find t* where |S(t)| is maximised\n' +
    '(d) Define relative sensitivity σ = (k/y)S. Show σ = -kt.\n' +
    '    What does this tell us about measuring k?',
  problemType: 'Sensitivity-equation derivation → analytic solution → optimisation (peak-sensitivity time) → relative-sensitivity interpretation.',
  body: [
    { type: 'subheading', text: 'Part (a) — Derive Ṡ' },
    {
      type: 'steps',
      items: [
        { text: 'Start from the ODE.', tex: '\\frac{dy}{dt} = -ky', inline: true },
        { text: 'Differentiate both sides with respect to k.', tex: '\\frac{d}{dk}\\Big[\\frac{dy}{dt}\\Big] = \\frac{d}{dk}[-ky]', inline: true },
        { text: 'Swap the order on the left (differentiation commutes).', tex: '\\frac{d}{dt}\\Big[\\frac{\\partial y}{\\partial k}\\Big] = \\frac{d}{dk}[-ky]', inline: true },
        { text: 'Chain rule on the right — $-ky$ depends on $k$ both explicitly and through $y$.', tex: '\\frac{d}{dk}[-ky] = -y - k\\cdot\\frac{\\partial y}{\\partial k}', inline: true },
        { text: 'Substitute $S=\\partial y/\\partial k$.', tex: '\\dot S = -y-kS,\\qquad S(0)=0', inline: true },
      ],
    },
    { type: 'p', text: 'Why S(0)=0: $y(0)=y_0$ is a fixed constant that does not depend on k, so $\\partial y_0/\\partial k = 0$.' },
    { type: 'subheading', text: 'Part (b) — Analytic solution' },
    { type: 'p', text: 'A closed form for y exists, so differentiate it directly instead of solving the sensitivity ODE.' },
    { type: 'math', tex: 'S(t) = \\frac{\\partial}{\\partial k}\\big[y_0e^{-kt}\\big] = -y_0te^{-kt}' },
    { type: 'p', text: 'Verify against the ODE: $\\dot S = -y_0e^{-kt}+ky_0te^{-kt}$ and $-y-kS = -y_0e^{-kt}+ky_0te^{-kt}$ ✓' },
    { type: 'subheading', text: 'Part (c) — Time of maximum |S|' },
    {
      type: 'steps',
      items: [
        { text: '$|S(t)| = y_0te^{-kt}$ since $y_0>0$; set its derivative to zero.', tex: '\\frac{d}{dt}\\big[y_0te^{-kt}\\big] = y_0e^{-kt}(1-kt) = 0', inline: true },
        { text: '$y_0e^{-kt}>0$ always, so the bracket must vanish.', tex: '1-kt^*=0 \\;\\implies\\; t^* = \\frac{1}{k}', inline: true },
      ],
    },
    {
      type: 'interpret',
      text: 'The best time to take measurements to identify k is $t^*=1/k$. Before this the signal has not developed enough; after this it decays and sensitivity falls.',
    },
    { type: 'subheading', text: 'Part (d) — Relative sensitivity' },
    { type: 'math', tex: '\\sigma(t) = \\frac{k}{y}S = \\frac{k}{y_0e^{-kt}}\\cdot(-y_0te^{-kt}) = -kt' },
    {
      type: 'p',
      text: '$|\\sigma|=kt$ grows with time — a 1% change in k causes a $kt$% change in y, so later measurements are increasingly informative about k.',
    },
  ],
  pattern:
    'Sensitivity derivation: always differentiate the ODE with respect to the parameter. The chain rule always gives TWO terms: explicit $\\partial f/\\partial q$ and implicit $(\\partial f/\\partial y)\\cdot S$. The IC is always 0 if $y_0$ does not depend on the parameter. Shortcut: if an analytic solution exists, differentiate it directly. To find $t^*$: set $d|S|/dt=0$, factor out the (always positive) exponential, solve what remains. Relative sensitivity $\\sigma=(q/y)S$: always simplify fully and interpret in words.',
  examSentence:
    '"σ = -kt grows in magnitude over time — later measurements are increasingly informative for estimating k — but |S(t)| itself peaks at t* = 1/k, which is the single best time to measure."',
  variantPrompt:
    'Give me a new single-parameter ODE sensitivity problem like the -ky decay example, ask me to derive the sensitivity equation, find the analytic S(t), the peak time t*, and the relative sensitivity — and walk me through it using the same pattern.',
}

const ct3b = {
  id: 'ct3-b',
  source: 'CT3',
  topic: 'Wave Equation + Method of Lines',
  question:
    '∂²u/∂t² = c²∂²u/∂x², c=1, x∈[-100,100].\n' +
    'IC: u(x,0) = exp(-λ(x-30)²) + exp(-λ(x+30)²), ∂u/∂t|_{t=0} = 0.\n' +
    '(a) Fill in R code. For dx=5, 0.5, 0.05 find max difference from analytic solution.\n' +
    '    Explain why this checks your code.\n' +
    '(b) From plots, when do the two waves meet? Does this make sense?',
  problemType: 'Second-order-in-time PDE → introduce velocity → Method of Lines → convergence check → physical interpretation.',
  body: [
    { type: 'subheading', text: 'Converting the wave equation for MOL' },
    {
      type: 'steps',
      items: [
        {
          text: '$\\partial^2u/\\partial t^2$ is second order in time; MOL needs first order, so introduce $v=\\partial u/\\partial t$.',
          tex: '\\frac{\\partial u}{\\partial t}=v,\\qquad \\frac{\\partial v}{\\partial t}=c^2\\frac{\\partial^2 u}{\\partial x^2}',
        },
        {
          text: 'Discretise space only, approximating the second spatial derivative.',
          tex: '\\frac{\\partial^2 u}{\\partial x^2}\\approx \\frac{u_{i+1}-2u_i+u_{i-1}}{\\Delta x^2}',
        },
        {
          text: 'Result: $2n$ ODEs — n for u, n for v.',
          tex: '\\frac{du_i}{dt}=v_i,\\qquad \\frac{dv_i}{dt}=c^2\\frac{u_{i+1}-2u_i+u_{i-1}}{\\Delta x^2}',
        },
        {
          text: 'Initial conditions.',
          tex: 'u_i(0)=e^{-\\lambda(x_i-30)^2}+e^{-\\lambda(x_i+30)^2},\\qquad v_i(0)=0',
        },
      ],
    },
    { type: 'subheading', text: 'Part (a) — Convergence' },
    {
      type: 'table',
      headers: ['Δx', 'Max difference from analytic solution'],
      rows: [
        ['5', '0.2232'],
        ['0.5', '0.0040'],
        ['0.05', '0.00016'],
      ],
    },
    {
      type: 'p',
      text: 'A tenfold reduction in $\\Delta x$ produces roughly a hundredfold reduction in error — second-order convergence, error $\\propto \\Delta x^2$.',
    },
    {
      type: 'p',
      text: 'Why this checks the code: as $\\Delta x\\to 0$ the finite-difference approximation to $\\partial^2u/\\partial x^2$ becomes exact. If the error decreases at the predicted $\\Delta x^2$ rate, it confirms both that the code is correct and that it is solving the right equation.',
    },
    { type: 'subheading', text: 'Part (b) — When do the waves meet?' },
    { type: 'p', text: 'Two pulses start at $x=\\pm 30$, each travelling at speed $c=1$ toward $x=0$.' },
    { type: 'math', tex: '\\text{time} = \\frac{\\text{distance}}{\\text{speed}} = \\frac{30}{1} = 30' },
    {
      type: 'p',
      text: 'Does this make sense? Yes — the wave equation propagates information at speed c=1, and both waves travel inward symmetrically, so colliding at the midpoint after 30 time units is exactly what the model predicts.',
    },
  ],
  pattern:
    'Second-order-in-time PDE: always introduce $v=\\partial u/\\partial t$ first. MOL: discretise space → finite difference for $\\partial^2u/\\partial x^2$ → system of ODEs. Convergence: error $\\propto \\Delta x^2$ for this scheme — halving $\\Delta x$ quarters the error. Physical interpretation: always use speed × time = distance reasoning.',
  examSentence:
    '"The max difference converges to zero as Δx decreases, confirming the numerical solution approaches the analytic solution. The waves meet at t=30 at x=0, since each pulse starts 30 units from the centre travelling at speed c=1."',
  variantPrompt:
    'Give me a new second-order-in-time PDE problem like the wave-equation one, ask me to convert it to a Method-of-Lines system, check convergence as Δx shrinks, and interpret the physical result — walk me through it with the same pattern.',
}

const ex1 = {
  id: 'ex1',
  source: 'Ex1',
  topic: "Integrating Factor — Newton's Cooling",
  question: 'dT/dt = -k(T - T₀). Solve for T(t), leaving answer in terms of T(0).',
  problemType: 'Separable ODE (equivalently solvable by integrating factor) with a constant equilibrium.',
  body: [
    {
      type: 'steps',
      items: [
        { text: 'Recognise it is separable.', tex: '\\frac{dT}{T-T_0} = -k\\,dt', inline: true },
        { text: 'Integrate both sides.', tex: '\\ln|T-T_0| = -kt+C', inline: true },
        { text: 'Exponentiate.', tex: 'T-T_0 = Ae^{-kt},\\qquad A=e^C', inline: true },
        { text: 'Apply the IC at t=0.', tex: 'T(0)-T_0 = A \\;\\implies\\; A = T(0)-T_0', inline: true },
        { text: 'Final answer.', tex: 'T(t) = T_0 + \\big(T(0)-T_0\\big)e^{-kt}', inline: true },
      ],
    },
    {
      type: 'p',
      text: 'Physical meaning: T starts at T(0) and decays exponentially toward the background T₀ — it never reaches T₀ exactly but gets arbitrarily close, at a rate controlled by k.',
    },
  ],
  pattern:
    'Any ODE of the form $dy/dt = -k(y-c)$ is separable, with solution $y = c + (y_0-c)e^{-kt}$. Memorise this template: equilibrium + (initial deviation) × decay.',
  examSentence: '"T(t) = T₀ + (T(0) − T₀)e^{-kt} — the temperature decays exponentially toward the background T₀ and never overshoots it."',
  variantPrompt:
    "Give me a new Newton's-cooling-style separable ODE (dy/dt = -k(y-c)) with different constants, and walk me through solving it using the equilibrium-plus-decay template.",
}

const ex2 = {
  id: 'ex2',
  source: 'Ex2',
  topic: 'Painting Forgery — Integrating Factor',
  question:
    'dy/dt = -λy + r. Solve using integrating factor.\n' +
    'Use current values λy=8.5, r=0.8 to back-calculate λy₀ for 300-year-old painting.\n' +
    'Is it a forgery?',
  problemType: 'Linear ODE → integrating factor → back-calculate an unknown initial value → real-world conclusion.',
  body: [
    {
      type: 'steps',
      items: [
        { text: 'Standard form.', tex: '\\dot y + \\lambda y = r', inline: true },
        { text: 'Integrating factor.', tex: '\\mu = e^{\\int \\lambda\\,dt} = e^{\\lambda t}', inline: true },
        { text: 'Multiply through — the left side collapses.', tex: '\\frac{d}{dt}(e^{\\lambda t}y) = re^{\\lambda t}', inline: true },
        { text: 'Integrate both sides.', tex: 'e^{\\lambda t}y = \\frac{r}{\\lambda}e^{\\lambda t} + C', inline: true },
        { text: 'Solve for y.', tex: 'y(t) = \\frac{r}{\\lambda} + Ce^{-\\lambda t}', inline: true },
        { text: 'Apply the IC at manufacture time $t_0$.', tex: 'y(t_0)=y_0 \\;\\implies\\; C = y_0 - \\frac{r}{\\lambda}', inline: true },
        { text: 'Full solution.', tex: 'y(t) = \\frac{r}{\\lambda} + \\Big(y_0-\\frac{r}{\\lambda}\\Big)e^{-\\lambda(t-t_0)}', inline: true },
      ],
    },
    { type: 'subheading', text: 'Back-calculate for a 300-year-old painting' },
    { type: 'p', text: 'Multiply through by λ, with $t-t_0=300$:' },
    { type: 'math', tex: '\\lambda y = r + (\\lambda y_0 - r)e^{-\\lambda\\cdot 300}' },
    {
      type: 'p',
      text: 'Substitute $\\lambda y=8.5,\\ r=0.8,\\ \\lambda=3.151\\times10^{-2}$: $e^{-9.453}\\approx 7.87\\times10^{-5}$, so',
    },
    { type: 'math', tex: '\\lambda y_0 - 0.8 = \\frac{8.5-0.8}{7.87\\times10^{-5}} \\approx 97{,}841 \\;\\implies\\; \\lambda y_0 \\approx 97{,}842' },
    { type: 'p', text: 'A genuine painting requires $\\lambda y_0$ in the range 0–200. 97,842 is vastly outside that range — conclusively a forgery.' },
    { type: 'subheading', text: 'Part (b) — Back-calculate λy₀ the other way (multiply through by λ)' },
    {
      type: 'p',
      text: 'Instead of dividing by a tiny exponential, multiply the solution through by $\\lambda$ first — this rearranges the same equation into a form where $\\lambda y_0$ can be isolated directly, without ever dividing by a near-zero number.',
    },
    {
      type: 'steps',
      items: [
        {
          text: 'Multiply the solution $y(t) = r/\\lambda + (y_0 - r/\\lambda)e^{-\\lambda(t-t_0)}$ through by λ.',
          tex: '\\lambda y(t) = r + (\\lambda y_0 - r)e^{-\\lambda(t-t_0)}',
        },
        {
          text: 'Rearrange to isolate the term containing $\\lambda y_0$.',
          tex: '\\lambda y_0 - r = \\big(\\lambda y(t) - r\\big)\\cdot e^{\\lambda(t-t_0)}',
        },
        {
          text: 'Solve for $\\lambda y_0$.',
          tex: '\\lambda y_0 = r + \\big(\\lambda y(t) - r\\big)\\cdot e^{\\lambda(t-t_0)}',
        },
        {
          text: 'Substitute the current values $\\lambda y = 8.5,\\ r = 0.8,\\ t-t_0 = 300,\\ \\lambda = 3.151\\times10^{-2}$, so $\\lambda(t-t_0) = 9.453$.',
          tex: '\\lambda y_0 = 0.8 + (8.5-0.8)\\times e^{9.453} = 0.8 + 7.7\\times 12{,}735 \\approx 98{,}147',
        },
      ],
    },
    {
      type: 'p',
      text: 'This is the same physical quantity as Part (a) — the small difference from 97,842 is just rounding carried through the two different arrangements of the same algebra, not a different answer.',
    },
    { type: 'subheading', text: 'Part (c) — Is it a forgery?' },
    {
      type: 'p',
      text: 'A genuine painting requires $\\lambda y_0 \\in (0, 200)$. The calculated value, $\\lambda y_0 \\approx 98{,}147$, is far outside that window — no honest age for the painting produces a value anywhere near this large, so the measurement is not just "suspicious", it is conclusive.',
    },
  ],
  pattern:
    'Linear ODE $\\dot y + Py = Q \\to$ integrating factor $e^{\\int P\\,dt} \\to \\frac{d}{dt}(e^{Pt}y)=Qe^{Pt} \\to$ integrate. Back-calculation: rearrange the solution to isolate the unknown at the initial time. Always state the physical conclusion — marks are given for this.',
  examSentence:
    '"λy₀ ≈ 97,842 (equivalently ≈98,147 via the alternative rearrangement) far exceeds the expected range of 0–200 for a 300-year-old painting, conclusively indicating that the painting is a forgery."',
  variantPrompt:
    'Give me a new integrating-factor back-calculation problem like the painting-forgery one, with different rate constants and measured values, and walk me through solving it and interpreting the physical conclusion.',
}

const ex4 = {
  id: 'ex4',
  source: 'Ex4',
  topic: 'A→B→C Cascade Identifiability',
  question:
    'dA/dt = -k₁A, dB/dt = k₁A - k₂B, dC/dt = k₂B.\n' +
    'Measuring B and C only.\n' +
    '(a) Eliminate A to get d²B/dt² = -(k₁+k₂)dB/dt - k₁k₂B\n' +
    '(b) Can we identify k₁ and k₂ from B and C measurements?',
  problemType: 'System reduction (eliminate A) → second-order ODE in B → identifiability from the sum and product of its coefficients.',
  body: [
    { type: 'subheading', text: 'Part (a) — Eliminate A' },
    {
      type: 'steps',
      items: [
        { text: 'Differentiate the B equation.', tex: '\\ddot B = k_1\\dot A - k_2\\dot B', inline: true },
        { text: 'Substitute $\\dot A = -k_1A$.', tex: '\\ddot B = -k_1^2A - k_2\\dot B', inline: true },
        {
          text: 'Eliminate A using the B equation: $\\dot B = k_1A-k_2B \\implies A = (\\dot B+k_2B)/k_1$.',
          tex: '\\ddot B = -k_1(\\dot B+k_2B) - k_2\\dot B = -(k_1+k_2)\\dot B - k_1k_2B',
          inline: true,
        },
      ],
    },
    { type: 'math', tex: 'B(0)=B_0,\\qquad \\dot B(0) = k_1A_0-k_2B_0' },
    { type: 'subheading', text: 'Part (b) — Identifiability' },
    {
      type: 'p',
      text: 'The scalar ODE has two coefficients: $-(k_1+k_2)$ (the sum) and $-k_1k_2$ (the product). From the sum and product of two numbers you can always recover both — they are the roots of $\\lambda^2+(k_1+k_2)\\lambda+k_1k_2=0$. Additionally, C measurements give $\\dot C=k_2B \\to k_2$ directly.',
    },
  ],
  pattern:
    'A→B→C cascade: always differentiate the middle compartment, substitute $\\dot A$ from the A equation, then eliminate A algebraically. Identifiability from a scalar ODE: count independent coefficient combinations. Sum + product of two parameters → both individually recoverable.',
  examSentence:
    '"Yes, k₁ and k₂ are uniquely identifiable from measurements of B and C with known initial conditions — the sum and product of the two rate constants are both recoverable, and C gives k₂ directly."',
  variantPrompt:
    'Give me a new compartment-cascade identifiability problem like A→B→C, and walk me through reducing it to a scalar ODE and checking whether the rate constants are individually identifiable, using the same sum/product reasoning.',
}

const sampleOde = {
  id: 'sample-ode',
  source: 'SampleODE',
  topic: 'Competition Model Fixed Points + Stability',
  question:
    'ẋ = x(3-x-2y), ẏ = y(2-y-x).\n' +
    'Find coexistence fixed point (x>0, y>0).\n' +
    'Calculate Jacobian eigenvalues and determine if coexistence is stable.',
  problemType: 'Find the coexistence fixed point → Jacobian → classify by checking det(J) first.',
  body: [
    { type: 'subheading', text: 'Step 1 — Coexistence fixed point (x>0, y>0)' },
    {
      type: 'steps',
      items: [
        { text: 'Set ẋ=0 with x>0.', tex: '3-x-2y=0 \\;\\implies\\; x = 3-2y', inline: true },
        { text: 'Set ẏ=0 with y>0.', tex: '2-y-x=0 \\;\\implies\\; x = 2-y', inline: true },
        { text: 'Equate the two expressions for x and solve.', tex: '3-2y = 2-y \\;\\implies\\; y=1,\\ x=1', inline: true },
      ],
    },
    { type: 'p', text: 'Coexistence fixed point: (1,1).' },
    { type: 'subheading', text: 'Step 2 — Jacobian' },
    {
      type: 'math',
      tex: '\\frac{\\partial f}{\\partial x}=3-2x-2y,\\ \\ \\frac{\\partial f}{\\partial y}=-2x,\\ \\ \\frac{\\partial g}{\\partial x}=-y,\\ \\ \\frac{\\partial g}{\\partial y}=2-2y-x',
    },
    { type: 'p', text: 'Evaluate at (1,1):' },
    { type: 'math', tex: 'J = \\begin{pmatrix} -1 & -2 \\\\ -1 & -1 \\end{pmatrix}' },
    { type: 'subheading', text: 'Step 3 — Classify' },
    { type: 'math', tex: '\\text{tr}(J) = -2,\\qquad \\det(J) = (-1)(-1)-(-2)(-1) = 1-2 = -1' },
    { type: 'p', text: '$\\det(J)=-1<0 \\implies$ SADDLE POINT. Stop here — no need to check the discriminant.' },
  ],
  pattern:
    'Competition models: find fixed points by setting each factor to zero separately. For coexistence (both positive), use the non-trivial factors and solve the resulting linear system. Classification shortcut: check det FIRST — if det<0, it is a saddle, done, no need for Δ.',
  examSentence:
    '"det(J) < 0 so (1,1) is a saddle point — coexistence is unstable, and small perturbations push the system toward one species dominating."',
  variantPrompt:
    'Give me a new 2-species competition model like ẋ=x(3-x-2y), ẏ=y(2-y-x), ask me to find the coexistence fixed point and classify its stability, and walk me through it using the det-first shortcut.',
}

const ex3q1 = {
  id: 'ex3-q1',
  source: 'Ex3 Q1',
  topic: 'Weber-Fechner Law (Log Response)',
  question:
    'One model for sensory response is dR/dS = k/S.\n' +
    '(a) Solve and show R = k log S + A\n' +
    '(b) Given threshold S₀ where R(S₀)=0, show A = -k log S₀\n' +
    '    and hence R = k log(S/S₀)\n' +
    '(c) If we double a noise stimulus, what is the increase in response?',
  problemType:
    'Direct-integration separable ODE (no R on the right) → log-law solution → threshold condition → prediction, contrasted with the power law of CT1-A.',
  body: [
    { type: 'subheading', text: 'Part (a) — Solve dR/dS = k/S' },
    { type: 'p', text: 'The right side contains only S, not R — this is a direct integration, not a separation.' },
    { type: 'math', tex: 'R = \\int \\frac{k}{S}\\,dS = k\\ln S + A' },
    {
      type: 'p',
      text: 'Compare with CT1-A, where R/S on the right required separating $dR/R$ from $dS/S$; here there is no R on the right at all, so you integrate straight away.',
    },
    { type: 'subheading', text: 'Part (b) — Apply the threshold condition R(S₀)=0' },
    {
      type: 'steps',
      items: [
        { text: 'Substitute $S=S_0,\\ R=0$.', tex: '0 = k\\ln S_0 + A \\;\\implies\\; A = -k\\ln S_0', inline: true },
        { text: 'Substitute back.', tex: 'R = k\\ln S - k\\ln S_0 = k\\ln(S/S_0)', inline: true },
      ],
    },
    { type: 'p', text: 'Below the threshold ($S<S_0$): $R<0$, not perceived. Above it: $R>0$, perceived and increasing logarithmically.' },
    { type: 'subheading', text: 'Part (c) — Double the stimulus' },
    { type: 'math', tex: 'R_{\\text{new}} = k\\ln(2S/S_0) = k\\ln 2 + R_{\\text{old}}' },
    {
      type: 'p',
      text: "The increase is $k\\ln 2$ — a constant, independent of the starting level. This is fundamentally different from CT1-A's power law, where doubling multiplies the response by $2^n$ (a ratio) rather than adding a fixed amount.",
    },
    {
      type: 'trap',
      text: 'It is easy to mistake this for CT1-A because both start "dR/dS = something/S". The difference is whether R appears on the right: $dR/dS=nR/S$ (R present) separates into a power law $R=KS^n$; $dR/dS=k/S$ (R absent) integrates directly into a log law $R=k\\ln S+A$. Always check for R on the right before choosing a method.',
    },
  ],
  pattern:
    'If $dR/dS=f(S)$ only (no R on the right): direct integration, $R=\\int f(S)\\,dS$. If $dR/dS=f(S)g(R)$ (R on the right): separate variables first. Weber-Fechner (log): doubling adds a constant $k\\ln 2$. Stevens power law (CT1-A): doubling multiplies by $2^n$. Always check which model you have before solving.',
  examSentence:
    '"Doubling the stimulus increases response by the constant k log 2, independent of the starting stimulus level — this is the Weber-Fechner law."',
  variantPrompt:
    'Give me a new sensory-response ODE problem where dR/dS depends only on S (Weber-Fechner style, no R on the right), with a threshold condition, and walk me through solving it and contrasting it with the Stevens power-law case.',
}

const ex4q2 = {
  id: 'ex4-q2',
  source: 'Ex4 Q2',
  topic: 'Negative Identifiability — Observing Only A',
  question:
    'Same A→B→C system: dA/dt = -k₁A, dB/dt = k₁A - k₂B, dC/dt = k₂B.\n' +
    'If we only observe A (not B or C), can we uniquely determine k₁ and k₂?',
  problemType: "Negative identifiability — recognise when a parameter cannot be recovered because it never appears in the observed variable's solution.",
  body: [
    { type: 'p', text: 'Same A→B→C system, but now only A is observed (not B or C).' },
    {
      type: 'steps',
      items: [
        { text: 'Solve the self-contained A equation.', tex: '\\dot A = -k_1A,\\ A(0)=A_0 \\;\\implies\\; A(t) = A_0e^{-k_1t}', inline: true },
        { text: 'Ask whether $k_2$ appears anywhere in A(t) — it does not, since the A equation never involves B, C, or $k_2$.' },
        { text: 'k₁ is identifiable: fit it from any two time points.', tex: 'k_1 = -\\frac{\\ln\\big(A(t_1)/A(t_2)\\big)}{t_1-t_2}', inline: true },
        { text: 'k₂ is NOT identifiable: it never appears in A(t), so no amount of A measurements can constrain it.' },
      ],
    },
    {
      type: 'interpret',
      text: 'A flows out of tank A at rate k₁ — you can see that outflow directly. But what happens downstream, in tanks B and C, governed by k₂, is invisible if you only ever watch tank A.',
    },
  ],
  pattern:
    'To check identifiability from observing variable X: write the ODE for X, solve it, and check which parameters appear. Parameters that never appear in X(t) are NOT identifiable from X data. Parameters that do appear are identifiable IF they appear independently, not only in combinations.',
  examSentence:
    '"Observing A alone allows identification of k₁ (from the exponential decay rate) but k₂ is not identifiable — it does not appear in the solution for A(t), since A evolves independently of the downstream dynamics."',
  variantPrompt:
    'Give me a new cascade or compartment system like A→B→C where I only observe the first (upstream) variable, and walk me through determining which rate constants are and are not identifiable.',
}

const ex4q3 = {
  id: 'ex4-q3',
  source: 'Ex4 Q3',
  topic: 'Conditional Identifiability — Role of Initial Conditions',
  question:
    'System: dx₁/dt = p₁x₁x₂, dx₂/dt = p₂x₂. Observe only x₁.\n' +
    '(a) Show d²x₁/dt² = (1/x₁)(dx₁/dt)² + x₁p₁p₂\n' +
    '    with x₁(0) = x₁₀, dx₁(0)/dt = p₁x₁₀x₂₀\n' +
    '(b) If x₁₀=1 and x₂₀=0, what can we identify about p₁ and p₂?\n' +
    '(c) If x₁₀=1 and x₂₀≠0, how do we identify p₁ and p₂ uniquely?',
  problemType:
    'System reduction to a scalar ODE where identifiability depends entirely on the initial conditions — the same model is identifiable or not depending on x₂₀.',
  body: [
    { type: 'subheading', text: 'Part (a) — Reduce to a scalar ODE in x₁' },
    {
      type: 'steps',
      items: [
        { text: 'Isolate $x_2$ from the $x_1$ equation.', tex: '\\dot x_1 = p_1x_1x_2 \\;\\implies\\; x_2 = \\frac{\\dot x_1}{p_1x_1}', inline: true },
        { text: 'Differentiate $\\dot x_1$ — introduces $\\dot x_2$.', tex: '\\ddot x_1 = p_1\\dot x_1x_2 + p_1x_1\\dot x_2', inline: true },
        { text: 'Substitute $\\dot x_2=p_2x_2$ from the second equation.', tex: '\\ddot x_1 = p_1x_2(\\dot x_1+p_2x_1)', inline: true },
        {
          text: 'Substitute $x_2$ from Step 1.',
          tex: '\\ddot x_1 = \\frac{\\dot x_1}{x_1}(\\dot x_1+p_2x_1) = \\frac{\\dot x_1^2}{x_1} + p_1p_2x_1',
          inline: true,
        },
      ],
    },
    { type: 'math', tex: 'x_1(0)=x_{10},\\qquad \\dot x_1(0) = p_1x_{10}x_{20}' },
    { type: 'subheading', text: 'Part (b) — Case $x_{10}=1,\\ x_{20}=0$' },
    { type: 'p', text: 'The scalar ODE contains only the product $p_1p_2$ — the individual parameters never appear separately.' },
    { type: 'math', tex: '\\dot x_1(0) = p_1\\cdot 1\\cdot 0 = 0' },
    {
      type: 'p',
      text: 'The IC gives 0 regardless of $p_1$, so it adds no information either. Only the product $p_1p_2$ is identifiable — infinitely many $(p_1,p_2)$ pairs with the same product fit equally well.',
    },
    {
      type: 'trap',
      text: 'If $x_2(0)=0$ then $x_2(t)=x_{20}e^{p_2t}=0$ for all time, so $\\dot x_1=p_1x_1\\cdot 0=0$ always — $x_1$ never moves. You are watching a flat line with zero information about either parameter separately, even though the reduced ODE "looks" like it depends on both.',
    },
    { type: 'subheading', text: 'Part (c) — Case $x_{10}=1,\\ x_{20}\\neq 0$' },
    {
      type: 'steps',
      items: [
        { text: 'The IC now gives an independent equation.', tex: '\\dot x_1(0) = p_1\\cdot 1\\cdot x_{20} \\;\\implies\\; p_1 = \\frac{\\dot x_1(0)}{x_{20}}', inline: true },
        { text: 'Recover $p_2$ from the product already known from the ODE.', tex: 'p_2 = \\frac{p_1p_2}{p_1}', inline: true },
      ],
    },
    {
      type: 'p',
      text: 'Both parameters are individually identifiable when $x_{20}\\neq 0$, because $x_2(t)=x_{20}e^{p_2t}$ is now non-zero and evolving, creating variation in $x_1$ that separates $p_1$ from $p_2$ through the known $x_{20}$.',
    },
  ],
  pattern:
    'Always check identifiability in TWO places: (1) the coefficients of the scalar ODE — what parameter combinations appear? (2) the initial conditions — do they give an additional independent equation? If only a product or sum appears everywhere, parameters are not individually identifiable. Initial conditions can break the degeneracy. Degenerate case ($x_{20}=0$): $x_2$ stays flat, so $x_1$ stays flat, and no information is extracted.',
  examSentence:
    '"When x₂₀=0, only the product p₁p₂ is identifiable — the parameters cannot be recovered individually. When x₂₀≠0, the initial condition ẋ₁(0) = p₁x₁₀x₂₀ independently determines p₁, and p₂ follows from the ODE coefficient p₁p₂."',
  variantPrompt:
    'Give me a new two-variable system like ẋ₁=p₁x₁x₂, ẋ₂=p₂x₂ where identifiability depends on whether an initial condition is zero or not, and walk me through both cases using the same reasoning.',
}

const sampleOde1d = {
  id: 'sample-ode-1d',
  source: 'SampleODE',
  topic: 'Population Blow-up',
  question:
    'dP/dt = kP². If P(0) = P₀, find P(t).\n' +
    'How long to double from P₀?\n' +
    'What happens as t → 1/(kP₀)?',
  problemType: 'Separable ODE with a quadratic growth term → finite-time blow-up.',
  body: [
    { type: 'subheading', text: 'Step 1 — Separate variables' },
    { type: 'math', tex: '\\frac{dP}{P^2} = k\\,dt' },
    { type: 'subheading', text: 'Step 2 — Integrate both sides' },
    { type: 'math', tex: '\\int P^{-2}\\,dP = \\int k\\,dt \\;\\implies\\; -\\frac{1}{P} = kt + C' },
    { type: 'subheading', text: 'Step 3 — Apply the IC P(0) = P₀' },
    { type: 'math', tex: '-\\frac{1}{P_0} = C \\;\\implies\\; C = -\\frac{1}{P_0}' },
    { type: 'subheading', text: 'Step 4 — Solve for P' },
    {
      type: 'math',
      tex: '\\frac{1}{P} = \\frac{1}{P_0} - kt \\;\\implies\\; P(t) = \\frac{1}{\\tfrac{1}{P_0}-kt} = \\frac{P_0}{1-kP_0t}',
    },
    { type: 'subheading', text: 'Doubling time' },
    {
      type: 'p',
      text: 'Set $P(t^*) = 2P_0$ and solve for $t^*$:',
    },
    {
      type: 'math',
      tex: '2P_0 = \\frac{P_0}{1-kP_0t^*} \\;\\implies\\; 1-kP_0t^* = \\tfrac12 \\;\\implies\\; t^* = \\frac{1}{2kP_0}',
    },
    { type: 'subheading', text: 'As t → 1/(kP₀)' },
    {
      type: 'p',
      text: 'The denominator $1-kP_0t \\to 0^+$, so $P \\to \\infty$ — this is blow-up in *finite* time $T = 1/(kP_0)$, not the usual "approaches infinity as $t\\to\\infty$" behaviour.',
    },
    {
      type: 'interpret',
      text: "Unlike exponential growth ($\\dot P=kP$), which takes infinite time to reach infinity, quadratic growth ($\\dot P=kP^2$) reaches infinity in a finite, calculable time. This models explosive processes — runaway population growth or chain reactions — where the growth rate itself grows with the population, so growth accelerates growth.",
    },
    {
      type: 'p',
      text: 'General pattern: $\\dot P = kP^n$ for $n>1$ always gives finite-time blow-up, at $T = \\dfrac{1}{(n-1)kP_0^{\\,n-1}}$.',
    },
  ],
  pattern:
    'Separable ODE $dP/P^n = k\\,dt$ for $n>1$: integrates to $P(t) = P_0/(1-(n-1)kP_0^{n-1}t)^{1/(n-1)}$, which blows up at finite time $T=1/((n-1)kP_0^{n-1})$. Any power steeper than linear growth ($n>1$) blows up in finite time — only $n=1$ (exponential) takes infinite time to diverge.',
  examSentence:
    '"P(t) = P₀/(1-kP₀t) blows up at the finite time T = 1/(kP₀) — quadratic growth reaches infinity in finite time, unlike exponential growth."',
  variantPrompt:
    'Give me a new separable ODE of the form dP/dt = kPⁿ with n>1 (finite-time blow-up), and walk me through solving it, finding the doubling time, and identifying the blow-up time using the same pattern.',
}

const sampleOde2d = {
  id: 'sample-ode-2d',
  source: 'SampleODE',
  topic: 'Tank Pollutant — Steady State & Inverse Time',
  question:
    'dC/dt = (5/100)(2 - C), C(0) = 0.\n' +
    'Find C(t). Find steady state C(t→∞).\n' +
    'Find time to reach 90% of steady state.',
  problemType: 'Separable ODE (equivalent to integrating factor) → steady state → inverse time calculation.',
  body: [
    { type: 'subheading', text: 'Step 1 — Recognise this is separable' },
    { type: 'math', tex: '\\frac{dC}{2-C} = \\frac{5}{100}\\,dt = \\frac{1}{20}\\,dt' },
    { type: 'subheading', text: 'Step 2 — Integrate' },
    { type: 'math', tex: '-\\ln|2-C| = \\frac{t}{20} + K \\;\\implies\\; 2-C = Ae^{-t/20}' },
    { type: 'subheading', text: 'Step 3 — Apply the IC C(0)=0' },
    { type: 'math', tex: '2 = A \\;\\implies\\; A = 2' },
    { type: 'subheading', text: 'Step 4 — Solution' },
    { type: 'math', tex: 'C(t) = 2\\big(1-e^{-t/20}\\big)' },
    { type: 'subheading', text: 'Step 5 — Steady state' },
    {
      type: 'p',
      text: 'As $t\\to\\infty$, $e^{-t/20}\\to 0$, so $C(\\infty) = 2$ mg/L — the concentration rises from 0 and asymptotes to the inflow concentration, which makes physical sense: in the long run the tank equilibrates with what is flowing in.',
    },
    { type: 'subheading', text: 'Step 6 — Time to reach 90% of steady state' },
    {
      type: 'steps',
      items: [
        {
          text: 'Set C(t*) equal to 90% of the steady-state value.',
          tex: '0.9\\times 2 = 2\\big(1-e^{-t^*/20}\\big)',
        },
        {
          text: 'Simplify and isolate the exponential.',
          tex: '0.9 = 1-e^{-t^*/20} \\;\\implies\\; e^{-t^*/20} = 0.1',
        },
        {
          text: 'Take logs and solve for t*.',
          tex: '-\\frac{t^*}{20} = \\ln(0.1) = -\\ln(10) \\;\\implies\\; t^* = 20\\ln(10) \\approx 46.05\\ \\text{minutes}',
        },
      ],
    },
  ],
  pattern:
    'Any ODE of the form $dC/dt = k(C_{eq}-C)$ integrates to $C(t) = C_{eq}(1-e^{-kt})$ — steady state is always $C_{eq}$, the equilibrium value the right-hand side vanishes at. Time to reach a fraction $f$ of steady state: $t = -\\ln(1-f)/k$. This is the same equilibrium-plus-decay template as Ex1 (Newton\'s cooling), just approaching the equilibrium from below instead of above.',
  examSentence:
    '"C(t) = 2(1-e^{-t/20}) approaches the steady state of 2 mg/L, reaching 90% of it at t = 20 ln(10) ≈ 46.05 minutes."',
  variantPrompt:
    'Give me a new tank/mixing-style separable ODE of the form dC/dt = k(C_eq - C), and walk me through finding C(t), the steady state, and the time to reach a given fraction of steady state, using the same pattern.',
}

const sampleOde3b = {
  id: 'sample-ode-3b',
  source: 'SampleODE',
  topic: 'Nonlinear System — Three Fixed Points via Jacobian',
  question:
    'dx/dt = y, dy/dt = -x + x³.\n' +
    'Find three fixed points. Use the Jacobian to classify each.',
  problemType: '2D nonlinear (Hamiltonian-form) system → three fixed points → Jacobian classification at each.',
  body: [
    { type: 'subheading', text: 'Step 1 — Fixed points' },
    {
      type: 'p',
      text: 'Set both equations to zero: $y=0$ from the first equation, and $-x+x^3=0 \\implies x(x^2-1)=0 \\implies x=0,1,-1$ from the second.',
    },
    { type: 'p', text: 'Three fixed points: $(0,0)$, $(1,0)$, $(-1,0)$.' },
    { type: 'subheading', text: 'Step 2 — General Jacobian' },
    {
      type: 'math',
      tex: 'J = \\begin{pmatrix} \\partial f/\\partial x & \\partial f/\\partial y \\\\ \\partial g/\\partial x & \\partial g/\\partial y \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ -1+3x^2 & 0 \\end{pmatrix}',
    },
    { type: 'subheading', text: 'Step 3 — At (0,0)' },
    {
      type: 'math',
      tex: 'J = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0\\end{pmatrix}, \\quad \\text{tr}=0,\\ \\det = 0-(-1) = 1>0,\\ \\Delta = 0-4 = -4<0',
    },
    { type: 'p', text: '$\\text{tr}=0$, $\\det>0$ $\\implies$ CENTRE (neutrally stable).' },
    { type: 'subheading', text: 'Step 4 — At (1,0)' },
    {
      type: 'math',
      tex: 'J = \\begin{pmatrix} 0 & 1 \\\\ 2 & 0\\end{pmatrix}, \\quad \\text{tr}=0,\\ \\det = 0-2 = -2<0',
    },
    { type: 'p', text: '$\\det<0$ $\\implies$ SADDLE (unstable) — stop, no need to check the discriminant.' },
    { type: 'subheading', text: 'Step 5 — At (−1,0)' },
    { type: 'p', text: 'Same Jacobian as $(1,0)$ (it depends on $x^2$) $\\implies$ SADDLE (unstable).' },
    {
      type: 'interpret',
      text: 'Systems of the form $\\dot x=y,\\ \\dot y=f(x)$ are Hamiltonian — they conserve a quantity analogous to energy, which is why $\\text{tr}(J)=0$ always, at every fixed point. That rules out spirals entirely: with zero trace the eigenvalues are either purely real (saddle) or purely imaginary (centre), never complex with nonzero real part. Never classify a zero-trace fixed point as a spiral.',
    },
  ],
  pattern:
    'For $\\dot x=y,\\ \\dot y=f(x)$ systems: tr(J) is always 0, so every fixed point is either a centre ($\\det>0$) or a saddle ($\\det<0$) — never a spiral or a node. Check $\\det$ first as always; if it is $>0$ here, it is automatically a centre, not a stable/unstable node, because the zero trace has already ruled those out.',
  examSentence:
    '"(0,0) is a centre since tr=0, det>0; (±1,0) are both saddles since det<0 — coexisting with a centre and two saddles is typical of a Hamiltonian double-well system."',
  variantPrompt:
    'Give me a new Hamiltonian-style system of the form ẋ=y, ẏ=f(x) with multiple fixed points, and walk me through finding them and classifying each via the Jacobian, using the tr(J)=0 shortcut.',
}

const sampleOde3c = {
  id: 'sample-ode-3c',
  source: 'SampleODE',
  topic: 'Competition Model — Coexistence Instability',
  question:
    'dx/dt = x(3-x-2y), dy/dt = y(2-y-x).\n' +
    'Find the coexistence fixed point (x>0, y>0).\n' +
    'Is coexistence stable?',
  problemType: '2D competition system → coexistence fixed point → saddle detection via det(J).',
  body: [
    { type: 'subheading', text: 'Step 1 — Coexistence fixed point' },
    {
      type: 'p',
      text: 'From $\\dot x=0,\\ x>0$: $3-x-2y=0 \\implies x=3-2y$. From $\\dot y=0,\\ y>0$: $2-y-x=0 \\implies x=2-y$.',
    },
    {
      type: 'math',
      tex: '3-2y = 2-y \\;\\implies\\; y=1 \\;\\implies\\; x=1',
    },
    { type: 'p', text: 'Coexistence fixed point: $(1,1)$.' },
    { type: 'subheading', text: 'Step 2 — Jacobian' },
    {
      type: 'p',
      text: 'With $f=x(3-x-2y)=3x-x^2-2xy$ and $g=y(2-y-x)=2y-y^2-xy$:',
    },
    {
      type: 'math',
      tex: '\\frac{\\partial f}{\\partial x}=3-2x-2y,\\ \\ \\frac{\\partial f}{\\partial y}=-2x,\\ \\ \\frac{\\partial g}{\\partial x}=-y,\\ \\ \\frac{\\partial g}{\\partial y}=2-2y-x',
    },
    { type: 'p', text: 'Evaluate at $(1,1)$:' },
    {
      type: 'math',
      tex: 'J = \\begin{pmatrix} -1 & -2 \\\\ -1 & -1 \\end{pmatrix}',
    },
    { type: 'subheading', text: 'Step 3 — Classify' },
    {
      type: 'math',
      tex: '\\det(J) = (-1)(-1)-(-2)(-1) = 1-2 = -1 < 0',
    },
    { type: 'p', text: '$\\det(J)<0 \\implies$ SADDLE $\\implies$ coexistence is UNSTABLE.' },
    {
      type: 'interpret',
      text: 'Coexistence being unstable means any small perturbation pushes the system toward one species dominating and the other going extinct — this is competitive exclusion: two species competing for the same limited resource cannot stably coexist, they can only pass through a coexistence point on the way to one winner.',
    },
  ],
  pattern:
    'Competition models with symmetric-looking coefficients often give a saddle at coexistence — det(J)<0 is the fastest check, and it means immediate exclusion of one species with no further calculation needed. Contrast with the SampleODE competition problem in Block 4, which is the identical system: this is worth recognising as a repeat pattern, not a new one.',
  examSentence:
    '"det(J) = -1 < 0, so the coexistence fixed point (1,1) is a saddle — coexistence is unstable, and the system moves toward competitive exclusion of one species."',
  variantPrompt:
    'Give me a new 2-species Lotka-Volterra competition model, ask me to find the coexistence fixed point and determine its stability via det(J), and walk me through it using the same det-first shortcut.',
}

export const problemGroups = [
  { id: 'block1', label: 'Block 1 — Class Test 1 (Separable ODE + Stability)', problems: [ct1a, ct1b] },
  { id: 'block2', label: 'Block 2 — Class Test 2 (System Reduction + Fitting)', problems: [ct2] },
  { id: 'block3', label: 'Block 3 — Class Test 3 (Sensitivity + MOL)', problems: [ct3a, ct3b] },
  { id: 'block4', label: 'Block 4 — Exercise Problems', problems: [ex1, ex2, ex4, sampleOde] },
  { id: 'block5', label: 'Block 5 — Previously Missing Problems', problems: [ex3q1, ex4q2, ex4q3] },
  {
    id: 'block6',
    label: 'Block 6 — Sample ODE Questions (New Problems)',
    problems: [sampleOde1d, sampleOde2d, sampleOde3b, sampleOde3c],
  },
]
