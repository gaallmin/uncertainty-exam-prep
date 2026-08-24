// All exam-prep content as structured data, consumed by ChapterView / Section.
// Block types: p, subheading, math, steps, table, list, interpret, trap, bank, summary.
//
// Explanation philosophy for every taught section: (1) state the problem and show
// where the obvious approach fails, (2) surface the key idea as a question, not a
// rule, (3) show why that specific method works before writing any equation, then
// (4) derive it with a prose bridge between every pair of equation lines, and
// (5) close with a plain-English "Whole Story" paragraph and no equations.

export const chapters = [
  // ───────────────────────────── CH1 ─────────────────────────────
  {
    id: 'ch1',
    number: 1,
    navLabel: 'Ch1 · Basic ODEs',
    title: 'Basic ODEs',
    sections: [
      {
        id: 'ch1-why-odes',
        title: 'Why ODEs?',
        tags: ['why'],
        blocks: [
          {
            type: 'p',
            text: "Say you're watching a quantity change — a radioactive sample decaying, cash earning interest, a drug leaving your bloodstream. You want a formula for the amount at time $t$. That's the goal: find $y(t)$.",
          },
          { type: 'subheading', text: "Why not just guess the formula?" },
          {
            type: 'p',
            text: "You could plot the data, decide it 'looks exponential', and fit coefficients. But that only works if you already know the shape — really you're curve-fitting after the fact, not modelling the mechanism. It also breaks the moment the process is more than textbook-simple, like a leaking tank feeding a growing population.",
          },
          { type: 'subheading', text: 'What do you actually know?' },
          {
            type: 'p',
            text: "You don't know $y(t)$ up front. But you often know the *rule* governing the change: right now, the sample decays at a rate proportional to how much is left; right now, interest is added in proportion to the current balance. That rule is a statement about the derivative $dy/dt$ — not about $y(t)$ itself.",
          },
          {
            type: 'p',
            text: 'That is what an ODE is: an equation for $dy/dt$ in terms of $y$ (and maybe $t$), plus a starting value $y(0)$. Solving it means working backward from the rule for the rate to the quantity itself. Every method in this chapter answers the same question in a different situation: given a rule for the derivative, how do you integrate your way back to the function?',
          },
          {
            type: 'summary',
            text: "You can't usually observe the formula for a changing quantity directly, but you can usually state how it changes right now — and that instantaneous rule, written as a derivative, turns out to be enough information to reconstruct the whole function. An ODE is nothing more than 'the rule for the rate' plus a starting point; solving it is the process of turning that rule back into a quantity.",
          },
        ],
      },
      {
        id: 'ch1-separable',
        title: 'Separable ODEs',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'The problem' },
          {
            type: 'p',
            text: "You're given $\\frac{dy}{dt} = f(t)\\cdot g(y)$ and $y(0)$, and you want $y(t)$ explicitly. The obvious move is to integrate both sides with respect to $t$ right away:",
          },
          { type: 'math', tex: '\\int \\frac{dy}{dt}\\, dt = \\int f(t)\\, g(y)\\, dt' },
          {
            type: 'p',
            text: "But look at the right side — it still contains $y$, which is a function of $t$ you don't know yet. To compute that integral you'd need to already know $y(t)$, which is exactly what you're trying to find. You're going in circles.",
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: "So ask: is there a way to rearrange the equation so the $t$-stuff and the $y$-stuff are no longer tangled on the same side? You've done this before — it's the same instinct as clearing a fraction. To solve $\\tfrac{2}{3}x = 4$ you multiply both sides by $\\tfrac{3}{2}$ until $x$ stands alone. Here, you want to divide and multiply until every $y$ sits on one side and every $t$ on the other.",
          },
          { type: 'subheading', text: 'Why this works' },
          {
            type: 'p',
            text: '$g(y)$ depends only on $y$, and $f(t)$ only on $t$ — they were never truly mixed, just written on the same side. Dividing both sides by $g(y)$ peels them apart, and multiplying through by $dt$ finishes the separation:',
          },
          { type: 'math', tex: '\\frac{dy}{g(y)} = f(t)\\, dt' },
          {
            type: 'p',
            text: 'Each side is now a function of one variable alone, so each side is an ordinary single-variable integral — something you already know how to do:',
          },
          { type: 'math', tex: '\\int \\frac{dy}{g(y)} = \\int f(t)\\, dt' },
          { type: 'subheading', text: 'Worked example — radioactive decay' },
          {
            type: 'p',
            text: 'Take the rule "the rate of decay is proportional to how much is left": $\\dot y = -ky$. Here $g(y) = y$ and $f(t) = -k$, so the same separation applies.',
          },
          { type: 'math', tex: '\\int \\frac{dy}{y} = \\int -k\\, dt' },
          {
            type: 'p',
            text: 'The left integrates to $\\ln|y|$, the right to $-kt$ plus a constant of integration:',
          },
          { type: 'math', tex: '\\ln|y| = -kt + C' },
          { type: 'p', text: 'Exponentiate both sides to undo the log and isolate $y$:' },
          { type: 'math', tex: 'y(t) = y_0 e^{-kt}' },
          {
            type: 'interpret',
            text: '$y(t) = y_0 e^{-kt}$ tells you the sample never mathematically hits zero — but it halves every $\\frac{\\ln 2}{k}$ time units, a fixed interval no matter how much is left. $k$ is the single dial controlling that half-life, which is why measuring $k$ precisely is the whole game in dating and decay problems.',
          },
          {
            type: 'summary',
            text: "Separable equations are exactly the ones where the tangle between t and y is superficial — once you divide through by g(y), the two variables were never really mixed together. That lets you integrate each side on its own, turning a differential equation into an algebra problem. Radioactive decay is the cleanest example: the rate is proportional to the amount present, and separating variables hands you the exponential decay law directly.",
          },
        ],
      },
      {
        id: 'ch1-integrating-factor',
        title: 'Integrating Factor',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'The problem' },
          { type: 'p', text: 'Now the equation is' },
          { type: 'math', tex: '\\frac{dy}{dt} + P(t)y = Q(t)' },
          {
            type: 'p',
            text: "Try separating variables the way you just did — you can't. The right side isn't a product $f(t)g(y)$, and $y$ and $t$ are mixed *additively* on the left, not multiplicatively. Separation only worked because the variables were never really tangled; here they genuinely are.",
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: "Ask the same question as before: what would 'clean' look like? If the entire left side collapsed into a single derivative of one combined quantity — instead of two separate terms $\\dot y$ and $P(t)y$ — you could integrate the whole equation in one step, the way you'd integrate $\\dot u = Q(t)$.",
          },
          {
            type: 'p',
            text: 'What kind of expression, when differentiated, naturally produces two terms like that? The product rule does exactly this:',
          },
          { type: 'math', tex: '\\frac{d}{dt}(\\mu y) = \\mu \\dot{y} + \\dot{\\mu} y' },
          {
            type: 'p',
            text: 'That has the right shape — one term with $\\dot y$, one term with $y$ times something. So the question becomes: is there a function $\\mu(t)$ that turns your equation\'s left side into precisely this?',
          },
          { type: 'subheading', text: 'Why this works' },
          {
            type: 'p',
            text: 'Multiply your original equation through by an unknown $\\mu(t)$: $\\mu\\dot y + \\mu P(t) y$. Compare this term-by-term with $\\mu\\dot y + \\dot\\mu y$ above — they match exactly as long as $\\dot\\mu = \\mu P(t)$. That condition is itself a separable ODE for $\\mu$, which you already know how to solve:',
          },
          { type: 'math', tex: '\\dot{\\mu} = \\mu P(t) \\;\\implies\\; \\mu(t) = e^{\\int P(t)\\, dt}' },
          {
            type: 'p',
            text: 'This $\\mu$ — the integrating factor — is engineered, not guessed, so that multiplying the original equation by it forces the left side to collapse into a single derivative.',
          },
          { type: 'subheading', text: 'The derivation' },
          { type: 'p', text: 'Multiply both sides of the original equation by $\\mu(t)$:' },
          { type: 'math', tex: '\\frac{d}{dt}(\\mu y) = \\mu Q(t)' },
          {
            type: 'p',
            text: 'The left side is now literally $d/dt$ of a single product, so integrate both sides directly with respect to $t$:',
          },
          { type: 'math', tex: '\\mu y = \\int \\mu Q\\, dt + C' },
          { type: 'p', text: '$\\mu y$ is not the answer — you want $y$ alone, so divide through by $\\mu$:' },
          { type: 'math', tex: 'y = \\frac{1}{\\mu}\\left[\\int \\mu Q\\, dt + C\\right]' },
          {
            type: 'trap',
            text: "After integrating you're staring at $\\mu y$ on the left, and the line looks finished — there's an equals sign and everything is solved for something. The instinct is to stop there. But $\\mu y$ is not $y$: $\\mu(t)$ was scaffolding you introduced to make the integral possible, not part of the quantity you were asked for. Dividing by $\\mu$ isn't optional tidying — it's the step that actually answers the question.",
          },
          {
            type: 'summary',
            text: "The integrating factor exists because the product rule is the only elementary way to generate an expression with both a plain derivative term and a term multiplied by the function itself — exactly the shape a linear ODE's left side has. You solve a small separable equation to find the multiplier μ that forces this match, multiply the whole equation by it, and the left side collapses into something you can integrate in one step. The final division by μ is what converts the scaffolding quantity μy back into the y you actually wanted.",
          },
        ],
      },
      {
        id: 'ch1-painting-forgery',
        title: 'Ex2 — Painting Forgery (Prof Chris pattern)',
        tags: ['exam'],
        blocks: [
          {
            type: 'p',
            text: 'This is the integrating-factor method applied directly to an exam scenario — the tool is already built, so the work is putting the right numbers in.',
          },
          { type: 'subheading', text: 'The model' },
          {
            type: 'math',
            tex: '\\frac{dy}{dt} = -\\lambda y + r(t), \\quad \\lambda = 3.151 \\times 10^{-2}',
          },
          {
            type: 'p',
            text: 'Notice the shape: $\\dot y + \\lambda y = r(t)$ is exactly the standard linear form from the previous section, with $P(t) = \\lambda$ (a constant) and $Q(t) = r(t)$, so $\\mu = e^{\\int \\lambda\\, dt} = e^{\\lambda t}$.',
          },
          { type: 'p', text: 'Multiplying through by $\\mu$ collapses the left side as before:' },
          { type: 'math', tex: '\\frac{d}{dt}(e^{\\lambda t} y) = r e^{\\lambda t}' },
          { type: 'p', text: 'Integrate both sides, then divide by $\\mu = e^{\\lambda t}$ to isolate $y$:' },
          { type: 'math', tex: 'e^{\\lambda t} y = \\frac{r}{\\lambda} e^{\\lambda t} + C \\;\\implies\\; y(t) = \\frac{r}{\\lambda} + Ce^{-\\lambda t}' },
          {
            type: 'p',
            text: 'Use current measurements $\\lambda y = 8.5,\\, r = 0.8$ to back-calculate $\\lambda y_0$ for a painting claimed to be 300 years old.',
          },
          {
            type: 'interpret',
            text: 'So what does this buy you? $\\lambda y_0$ is a fingerprint fixed by the painting\'s true age — a genuine Old Master must land in a specific numeric range, 0–200. If you back-calculate $\\lambda y_0$ from present-day measurements and it falls far outside that band, no honest age of the painting explains the data. That is not "suspicious" — it is conclusive.',
          },
          {
            type: 'summary',
            text: 'Once you recognise the painting equation as a linear first-order ODE with a constant coefficient, the whole apparatus from the integrating-factor derivation applies unchanged — you are not solving a new problem, you are plugging a known scenario into a known machine. The physics does the rest: because λy0 is determined purely by age, a measured value outside the plausible range is direct evidence the claimed age is false.',
          },
        ],
      },
    ],
  },

  // ───────────────────────────── CH2 ─────────────────────────────
  {
    id: 'ch2',
    number: 2,
    navLabel: 'Ch2 · Stability & Jacobian',
    title: 'Stability & Jacobian',
    sections: [
      {
        id: 'ch2-why-linearise',
        title: 'Why Linearise?',
        tags: ['why'],
        blocks: [
          {
            type: 'p',
            text: "You're given a nonlinear system $\\dot x = f(x,y),\\ \\dot y = g(x,y)$ and asked whether it settles down or blows up. You want to know the long-run behaviour near an equilibrium.",
          },
          { type: 'subheading', text: "Why not solve it exactly?" },
          {
            type: 'p',
            text: "Try to solve for $x(t)$ and $y(t)$ directly and you're stuck immediately — most nonlinear ODEs have no closed-form solution at all. Numerically integrating a single trajectory doesn't answer the stability question either; you'd have to test every possible nearby starting point to be sure.",
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: "So don't solve the whole system — ask a smaller question: near one specific fixed point, does a *tiny* nudge grow or shrink? Close to a point, any smooth function looks like its tangent — the same idea as $f(x) \\approx f(a) + f'(a)(x-a)$ near $a$ in single-variable calculus. Do that in two variables at once, and 'the tangent' becomes a matrix of partial derivatives: the Jacobian.",
          },
          {
            type: 'p',
            text: 'Near the fixed point, the nonlinear system behaves like the linear system $\\dot{\\mathbf{u}} = J\\mathbf{u}$, where $\\mathbf{u} = (x-x^*, y-y^*)$ is the perturbation. The eigenvalues of $J$ tell you whether that perturbation grows (unstable) or shrinks (stable) — turning a nonlinear question into a linear-algebra one.',
          },
          {
            type: 'summary',
            text: "You can't generally solve a nonlinear system outright, but you don't need to — you only need to know whether small nudges near equilibrium grow or die out, and locally every smooth system looks linear. The Jacobian is that local linear approximation, and its eigenvalues are what tell you whether perturbations amplify or decay. Everything else in this chapter is the mechanics of computing that matrix and reading its eigenvalues correctly.",
          },
        ],
      },
      {
        id: 'ch2-pipeline',
        title: 'The Pipeline — Always This Order',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'The problem' },
          {
            type: 'p',
            text: 'Given $\\dot{x} = f(x,y),\\ \\dot{y} = g(x,y)$, you want to classify the stability of an equilibrium — but "near the fixed point" only means something once you know where the fixed point is, and "the local slope" only means something once you evaluate it *at* that point. Skip either step and the rest of the calculation is meaningless.',
          },
          { type: 'subheading', text: 'Why this order' },
          {
            type: 'p',
            text: 'You cannot linearise about a point you have not found — so the fixed point comes first. The partial derivatives of $f$ and $g$ are themselves functions of $x$ and $y$ until you plug numbers in, so differentiating comes next, and evaluating at $(x^*, y^*)$ comes right after — this is what turns "a matrix of formulas" into "a matrix of numbers" you can actually take eigenvalues of. Only once $J$ is a fixed numeric matrix does "eigenvalue" mean anything.',
          },
          {
            type: 'steps',
            items: [
              {
                text: 'Fixed points: solve simultaneously:',
                tex: 'f(x^*, y^*) = 0 \\quad \\text{and} \\quad g(x^*, y^*) = 0',
              },
              {
                text: 'Jacobian matrix — differentiate, then evaluate at the fixed point:',
                tex: 'J = \\begin{pmatrix} \\partial f/\\partial x & \\partial f/\\partial y \\\\ \\partial g/\\partial x & \\partial g/\\partial y \\end{pmatrix}\\Bigg|_{(x^*,\\, y^*)}',
              },
              {
                text: 'Characteristic equation — the eigenvalues of $J$ solve:',
                tex: '\\lambda^2 - \\text{tr}(J)\\,\\lambda + \\det(J) = 0',
                note: 'where $\\text{tr}(J) = \\lambda_1 + \\lambda_2$ and $\\det(J) = \\lambda_1 \\lambda_2$.',
              },
              { text: 'Classify from the stability table below — the signs of $\\lambda_1, \\lambda_2$ are the whole answer.' },
            ],
          },
          {
            type: 'trap',
            text: 'After differentiating $f$ and $g$, you have four expressions and it can feel like the hard part is over. The instinct is to read eigenvalue behaviour straight off those partial-derivative formulas. But they are still functions of $x$ and $y$ — plugging in different points would give different numbers, so nothing is fixed yet, and "eigenvalue" is not even defined for a matrix of formulas. Evaluate at $(x^*, y^*)$ first; only the resulting numeric matrix has eigenvalues you can classify.',
          },
          {
            type: 'summary',
            text: "The pipeline order isn't a convention to memorise — each step is a prerequisite for the next. You need a fixed point before 'near the fixed point' means anything; you need the Jacobian formulas before you can evaluate them; and you need numbers, not formulas, before 'eigenvalue' is even a meaningful question. Follow the chain and the classification at the end falls out automatically from a lookup table.",
          },
        ],
      },
      {
        id: 'ch2-stability-table',
        title: 'Stability Classification Table',
        tags: ['exam'],
        blocks: [
          {
            type: 'p',
            text: 'You have $\\text{tr}(J)$ and $\\det(J)$ from a $2\\times 2$ matrix — what do they tell you about the two eigenvalues without solving the quadratic every single time?',
          },
          {
            type: 'p',
            text: 'The characteristic equation is $\\lambda^2 - \\text{tr}(J)\\lambda + \\det(J) = 0$, so by the quadratic formula $\\lambda = \\frac{\\text{tr} \\pm \\sqrt{\\Delta}}{2}$ with $\\Delta = \\text{tr}(J)^2 - 4\\det(J)$. The sign of $\\Delta$ tells you whether the eigenvalues are real (spread apart, giving a node/saddle) or complex conjugates (giving a spiral); the signs of $\\text{tr}$ and $\\det$ then pin down growth vs. decay. That is the entire table below — it is a lookup shortcut for the quadratic formula, not a new rule.',
          },
          {
            type: 'table',
            headers: ['Condition', 'Classification'],
            rows: [
              [{ tex: '\\det(J) < 0' }, 'Saddle (always unstable)'],
              [{ tex: '\\text{tr} < 0,\\, \\det > 0,\\, \\Delta > 0' }, 'Stable node'],
              [{ tex: '\\text{tr} < 0,\\, \\det > 0,\\, \\Delta < 0' }, 'Stable spiral'],
              [{ tex: '\\text{tr} > 0,\\, \\det > 0,\\, \\Delta > 0' }, 'Unstable node'],
              [{ tex: '\\text{tr} > 0,\\, \\det > 0,\\, \\Delta < 0' }, 'Unstable spiral'],
              [{ tex: '\\text{tr} = 0,\\, \\det > 0' }, 'Centre (neutral)'],
            ],
          },
          {
            type: 'p',
            text: 'Why is $\\det(J) < 0$ always a saddle, regardless of $\\text{tr}$? $\\det(J) = \\lambda_1\\lambda_2$, so a negative determinant forces the eigenvalues to have opposite signs — one direction always grows, one always shrinks, no matter what the trace is doing.',
          },
          {
            type: 'p',
            text: 'Shortcut: if $J$ is upper or lower triangular, the eigenvalues are just the diagonal entries — no need to solve the quadratic at all, since a triangular matrix\'s characteristic polynomial factors immediately.',
          },
          {
            type: 'summary',
            text: 'This table is not a separate fact to memorise on top of the quadratic formula — it is the quadratic formula pre-digested. Once you know that the discriminant separates real eigenvalues (nodes and saddles) from complex ones (spirals), and that the trace and determinant are just the sum and product of the eigenvalues, every row of the table is something you could re-derive on the spot if you forgot it.',
          },
        ],
      },
      {
        id: 'ch2-ct1',
        title: 'CT1 Worked Example',
        tags: ['exam'],
        blocks: [
          {
            type: 'p',
            text: 'This is the pipeline from the previous section run end-to-end on a real system, with one shortcut worth noticing along the way.',
          },
          { type: 'p', text: 'System:' },
          {
            type: 'math',
            tex: '\\dot{x} = \\tfrac{1}{2}x - \\tfrac{1}{4}x^2 - \\tfrac{3}{4}xy, \\qquad \\dot{y} = y - y^2 - xy',
          },
          { type: 'p', text: 'Fixed point $(2, 0)$ — verify by substitution before doing anything else:' },
          {
            type: 'math',
            tex: 'f(2,0) = 1 - 1 - 0 = 0\\checkmark, \\qquad g(2,0) = 0 - 0 - 0 = 0\\checkmark',
          },
          { type: 'p', text: 'Now differentiate, and evaluate every partial derivative at $(2, 0)$:' },
          {
            type: 'math',
            tex: '\\frac{\\partial f}{\\partial x}\\Big|_{(2,0)} = \\tfrac{1}{2} - \\tfrac{1}{2}(2) - \\tfrac{3}{4}(0) = -\\tfrac{1}{2}',
          },
          {
            type: 'math',
            tex: '\\frac{\\partial f}{\\partial y}\\Big|_{(2,0)} = -\\tfrac{3}{4}(2) = -\\tfrac{3}{2}',
          },
          { type: 'math', tex: '\\frac{\\partial g}{\\partial x}\\Big|_{(2,0)} = -(0) = 0' },
          {
            type: 'math',
            tex: '\\frac{\\partial g}{\\partial y}\\Big|_{(2,0)} = 1 - 2(0) - (2) = -1',
          },
          { type: 'p', text: 'Assemble the Jacobian from those four numbers:' },
          {
            type: 'math',
            tex: 'J = \\begin{pmatrix} -\\tfrac{1}{2} & -\\tfrac{3}{2} \\\\ 0 & -1 \\end{pmatrix} \\quad \\leftarrow \\text{lower triangular}',
          },
          {
            type: 'p',
            text: 'Because $J$ is triangular, invoke the shortcut from the previous section instead of solving the quadratic — the eigenvalues are the diagonal entries directly:',
          },
          { type: 'math', tex: '\\lambda_1 = -\\tfrac{1}{2}, \\qquad \\lambda_2 = -1' },
          { type: 'p', text: 'Both eigenvalues are negative $\\implies$ stable node.' },
          {
            type: 'interpret',
            text: 'So what does "stable node" mean physically here? Trajectories starting near $(2, 0)$ approach it directly, without spiralling — the system returns to this equilibrium after any small perturbation, and it does so monotonically rather than overshooting.',
          },
          {
            type: 'summary',
            text: 'Nothing here is a new technique — it is the fixed-point-then-Jacobian-then-eigenvalues pipeline applied mechanically, with the triangular-matrix shortcut saving you from solving a quadratic. The payoff is a plain physical statement: both eigenvalues negative means any small disturbance from (2,0) dies out, and the triangular structure tells you it dies out without oscillation.',
          },
        ],
      },
    ],
  },

  // ───────────────────────────── CH3 ─────────────────────────────
  {
    id: 'ch3',
    number: 3,
    navLabel: 'Ch3 · Identifiability',
    title: 'Identifiability',
    sections: [
      {
        id: 'ch3-why',
        title: 'Why Does Identifiability Matter?',
        tags: ['why'],
        blocks: [
          {
            type: 'p',
            text: "Before fitting a model to data, you want to know: even with perfect, infinite, noise-free data, could you recover every parameter uniquely?",
          },
          { type: 'subheading', text: "Why not just collect more data and fit harder?" },
          {
            type: 'p',
            text: 'You might think a bigger dataset or a better optimiser eventually pins the parameters down. But if the model structure is such that two different parameter sets $\\mathbf{q}_1 \\neq \\mathbf{q}_2$ produce exactly the same observed output for every possible input, then no dataset — however large or clean — can tell them apart. The ambiguity is not statistical noise you can average away; it is baked into the equations themselves.',
          },
          {
            type: 'p',
            text: 'So the question has to be answered *before* you touch data, using only the model structure. That means algebraically checking whether the parameters can, in principle, be disentangled from what you actually observe.',
          },
          {
            type: 'summary',
            text: "More data and better fitting only help with noise — they cannot fix a model where different parameter values are mathematically indistinguishable from the outside. Identifiability analysis is the check you run before fitting, using the model's structure alone, to make sure the parameters you're about to estimate are even estimable in principle.",
          },
        ],
      },
      {
        id: 'ch3-reduction',
        title: 'System Reduction — The Method',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'The problem' },
          { type: 'p', text: 'Setup: you observe $x$ only; $y$ is hidden.' },
          {
            type: 'math',
            tex: '\\dot{x} = f(x, y, \\mathbf{q}), \\qquad \\dot{y} = g(x, y, \\mathbf{q})',
          },
          {
            type: 'p',
            text: "You want to know whether $\\mathbf{q}$ is recoverable from $x(t)$ alone. The obvious move is to just solve the first equation for $y$ algebraically — but that leaves $y$ expressed in terms of the unknown $\\mathbf{q}$ and still coupled to a second, unknown ODE for $y$. You haven't removed the hidden variable, you've just renamed it.",
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: "So don't stop at one algebraic substitution — eliminate $y$ completely by combining both equations, using differentiation to generate the extra equation you need. If you can end up with a single ODE purely in the observed variable $x$, its coefficients will be some combination of the original parameters. Checking identifiability then becomes an algebra question: can you invert that combination and recover each parameter separately?",
          },
          {
            type: 'steps',
            items: [
              { text: 'Isolate $y$ algebraically from the $\\dot{x}$ equation.' },
              { text: 'Differentiate $\\dot{x}$ to obtain $\\ddot{x}$ — this introduces $\\dot{y}$.' },
              {
                text: 'Substitute $\\dot{y}$ directly from the second equation (do NOT differentiate it again).',
              },
              { text: 'Substitute $y$ from Step 1 → a scalar ODE in $x$ only.' },
              {
                text: 'Let $z = \\dot{x}$, and rewrite as a first-order system:',
                tex: '\\dot{x} = z, \\qquad \\dot{z} = h(x, z, \\mathbf{q})',
              },
              {
                text: 'State the initial condition, which comes from the original $\\dot{x}$ equation at $t=0$:',
                tex: 'z(0) = \\dot{x}(0) = f(x_0, y_0, \\mathbf{q})',
              },
              {
                text: 'Check — do all parameters appear as independent coefficients? If yes → structurally identifiable.',
              },
            ],
          },
          {
            type: 'trap',
            text: "Once the reduced ODE's coefficients are written down and every parameter seems to show up somewhere, it's tempting to declare victory and stop — the differential equation is the star of the derivation, so it feels like the final answer. But $z(0) = f(x_0, y_0, \\mathbf{q})$ is a genuine extra equation, and it's often the only place the *last* remaining parameter appears on its own. Skip it and you can wrongly conclude a system is unidentifiable when one more equation — the initial condition — would have recovered the missing parameter.",
          },
          {
            type: 'summary',
            text: 'A single algebraic substitution never removes a hidden variable — it just relocates it. Differentiating and substituting again, twice, is what actually eliminates y for good, leaving one ODE purely in the observed variable whose coefficients are combinations of the true parameters. Checking identifiability then reduces to algebra: can those combinations be unscrambled back into the individual parameters, using both the differential equation and the initial condition it comes with?',
          },
        ],
      },
      {
        id: 'ch3-ct2',
        title: 'CT2 — Lotka-Volterra Full Reduction',
        tags: ['exam'],
        blocks: [
          {
            type: 'p',
            text: 'This runs the reduction method from the previous section on a real predator-prey system, start to finish.',
          },
          {
            type: 'math',
            tex: '\\dot{x} = Ax - Bxy, \\quad x(0)=x_0 \\qquad \\dot{y} = -Cy + Dxy, \\quad y(0)=y_0',
          },
          { type: 'p', text: 'Only $x$ is observed.' },
          { type: 'subheading', text: 'Step 1 — Isolate y:' },
          { type: 'math', tex: 'y = \\frac{Ax - \\dot{x}}{Bx}' },
          {
            type: 'p',
            text: 'This alone does not remove $y$ — it is still tangled with the unknown $\\dot y$ through the second equation. Differentiate to bring that second equation in.',
          },
          { type: 'subheading', text: 'Step 2 — Differentiate ẋ:' },
          { type: 'math', tex: '\\ddot{x} = A\\dot{x} - B\\dot{x}y - Bx\\dot{y}' },
          {
            type: 'subheading',
            text: 'Step 3 — Substitute ẏ = −Cy + Dxy (do not differentiate again):',
          },
          { type: 'math', tex: '\\ddot{x} = A\\dot{x} - B\\dot{x}y + BCxy - BDx^2y' },
          {
            type: 'p',
            text: 'Every remaining $y$ can now be replaced with the Step 1 expression, since nothing here needs $\\dot y$ any further:',
          },
          { type: 'subheading', text: 'Step 4 — Substitute y from Step 1:' },
          {
            type: 'math',
            tex: '\\ddot{x} = \\frac{\\dot{x}^2}{x} + Dx\\dot{x} - C\\dot{x} + ACx - ADx^2',
          },
          {
            type: 'p',
            text: '$y$ is gone entirely — this is a self-contained second-order ODE in $x$ alone. Convert it to a first-order system the standard way, by naming the derivative:',
          },
          { type: 'subheading', text: 'Step 5 — First-order system (z = ẋ):' },
          {
            type: 'math',
            tex: '\\dot{x} = z, \\qquad \\dot{z} = \\frac{z^2}{x} + Dxz - Cz + ACx - ADx^2',
          },
          { type: 'p', text: 'And the initial condition, from the original $\\dot x$ equation at $t=0$:' },
          { type: 'math', tex: 'z(0) = Ax_0 - Bx_0 y_0' },
          {
            type: 'p',
            text: 'Reading off coefficients: the ODE alone gives you $D-C$, $AC$, and $AD$ as combinations. That is three pieces of information for four unknowns — the ODE by itself is not enough. The initial condition $z(0)$ is the fourth equation, and it is the only place $B$ appears, so it recovers the last parameter.',
          },
          {
            type: 'interpret',
            text: 'So what does this mean for the ecology problem? Observing the predator population $x$ alone, together with known initial conditions, is enough to uniquely pin down all four parameters $A, B, C, D$ — the growth rate, predation rate, death rate, and conversion efficiency are all recoverable without ever measuring the prey population $y$ directly.',
          },
          {
            type: 'summary',
            text: 'The reduction eliminates y through two rounds of differentiation and substitution, leaving a second-order ODE in x whose coefficients bundle three of the four parameters together. That would leave one parameter unrecoverable from the differential equation alone — but the initial condition z(0) supplies exactly the missing equation, because it is the one place B shows up on its own. Together, the ODE and its initial condition make the whole system identifiable from x alone.',
          },
        ],
      },
    ],
  },

  // ───────────────────────────── CH4 ─────────────────────────────
  {
    id: 'ch4',
    number: 4,
    navLabel: 'Ch4 · Parameter Fitting',
    title: 'Parameter Fitting',
    sections: [
      {
        id: 'ch4-why',
        title: 'Why Least Squares?',
        tags: ['why'],
        blocks: [
          {
            type: 'p',
            text: 'You have noisy data $(t_i, y_i^{\\text{obs}})$ and a model $y = f(t, \\mathbf{q})$. You want the parameters $\\mathbf{q}$ that make the model match the data.',
          },
          { type: 'subheading', text: "Why not just solve for q exactly?" },
          {
            type: 'p',
            text: 'The obvious move is to set $f(t_i, \\mathbf{q}) = y_i^{\\text{obs}}$ for every data point and solve for $\\mathbf{q}$. But with $n$ noisy observations and only $p < n$ parameters, that is $n$ equations for $p$ unknowns — overdetermined. Noise means no single $\\mathbf{q}$ satisfies all $n$ equations simultaneously; the system is generally inconsistent, so "solve exactly" is not a well-posed request.',
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: 'So instead of demanding an exact solution, ask for the *best compromise*: define a single number that measures total mismatch across all data points, and choose $\\mathbf{q}$ to minimise it.',
          },
          {
            type: 'p',
            text: 'Why squares specifically, rather than absolute differences or something else? Squaring removes the sign, so an over-shoot and an under-shoot of the same size cannot cancel each other out and hide a bad fit. It also penalises large errors more heavily than small ones, which discourages the fit from tolerating one huge miss to shave a little off many small ones — and it matches the assumption of independent, normally-distributed measurement noise, under which minimising the sum of squares is the maximum-likelihood estimate.',
          },
          {
            type: 'summary',
            text: "You can't solve for parameters exactly when you have more noisy observations than unknowns — the system is simply inconsistent. Least squares sidesteps that by asking for the best compromise instead of an exact match, and squaring the mismatches is what makes 'best' well-defined: it prevents errors of opposite sign from cancelling and matches what you'd expect under ordinary random noise.",
          },
        ],
      },
      {
        id: 'ch4-gauss-newton',
        title: 'Gauss-Newton — Full Structure',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'The problem' },
          {
            type: 'p',
            text: 'You want to minimise $\\Phi(\\mathbf{q}) = \\sum_i r_i(\\mathbf{q})^2$ where $r_i(\\mathbf{q}) = y_i^{\\text{obs}} - f(t_i, \\mathbf{q})$. The obvious calculus move is to set $\\nabla\\Phi = 0$ and solve. But $f(t_i, \\mathbf{q})$ usually comes from solving an ODE — it is nonlinear in $\\mathbf{q}$ in general, so $\\nabla\\Phi = 0$ is itself a nonlinear system, exactly as hard as the problem you started with.',
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: "So don't try to solve the nonlinear problem in one shot — do what you'd do for any hard nonlinear equation: linearise locally and iterate. This is the same idea as Newton's method for finding a root of a single equation, applied here to a whole vector of residuals. Near a current guess $\\mathbf{q}_k$, approximate $f$ by its tangent plane in $\\mathbf{q}$-space; that makes the residuals linear in the *step* $\\Delta\\mathbf{q}$, and a linear least-squares problem has a closed-form solution.",
          },
          { type: 'subheading', text: 'Why this works' },
          {
            type: 'p',
            text: 'The local slope of the model with respect to each parameter is exactly the sensitivity function from Ch5:',
          },
          {
            type: 'math',
            tex: 'J_{ij} = \\frac{\\partial f(t_i, \\mathbf{q})}{\\partial q_j} = S_j(t_i)',
          },
          {
            type: 'p',
            text: 'Stacking these into an $n\\times p$ matrix $J$ turns "minimise the linearised quadratic in $\\Delta\\mathbf{q}$" into an ordinary linear least-squares problem, whose solution is the normal equations $(J^\\top J)\\Delta\\mathbf{q} = J^\\top \\mathbf{r}$. Solve that for the step, take it, and repeat with a new tangent approximation at the new point.',
          },
          { type: 'subheading', text: 'The derivation' },
          { type: 'p', text: 'Residuals — the mismatch between data and model at each point:' },
          { type: 'math', tex: 'r_i(\\mathbf{q}) = y_i^{\\text{obs}} - f(t_i, \\mathbf{q})' },
          { type: 'p', text: 'Objective — the total squared mismatch you are minimising:' },
          {
            type: 'math',
            tex: '\\Phi(\\mathbf{q}) = \\sum_{i=1}^{n} r_i^2 = \\mathbf{r}^\\top \\mathbf{r}',
          },
          { type: 'p', text: 'Sensitivity Jacobian — the local slope of the model in every parameter direction, at every data point:' },
          {
            type: 'math',
            tex: 'J_{ij} = \\frac{\\partial f(t_i, \\mathbf{q})}{\\partial q_j}',
          },
          { type: 'p', text: 'Update rule — the step that minimises the linearised (quadratic) approximation to $\\Phi$:' },
          {
            type: 'math',
            tex: '\\mathbf{q}_{k+1} = \\mathbf{q}_k + (J^\\top J)^{-1} J^\\top \\mathbf{r}',
          },
          { type: 'p', text: 'Iterate this update until $\\|\\mathbf{q}_{k+1} - \\mathbf{q}_k\\| < \\varepsilon$ — the linear approximation gets better as you approach the true minimum, so the steps shrink and converge.' },
          {
            type: 'trap',
            text: "This course uses the letter $J$ for two completely different matrices, and it is tempting to treat them as the same object because the notation matches. Ch2's Jacobian is the stability matrix $\\partial f/\\partial \\mathbf{x}$ — square, $n\\times n$, built from state variables, and its eigenvalues classify equilibria. Ch4's Jacobian is the sensitivity matrix $\\partial f/\\partial \\mathbf{q}$ — rectangular, $n\\times p$, built from parameters, and it feeds into $(J^\\top J)^{-1}J^\\top\\mathbf{r}$, not an eigenvalue calculation. Treating them as interchangeable — trying to take 'eigenvalues' of a rectangular sensitivity matrix, for instance — produces nonsense. Same letter, unrelated objects; let context, not notation, tell you which one you're using.",
          },
          {
            type: 'summary',
            text: "Setting the gradient of the sum-of-squares to zero is a nonlinear equation exactly as hard as the fitting problem itself, so Gauss-Newton sidesteps it by linearising the model locally and solving a linear least-squares problem for the step — then repeating from the new point. The sensitivity Jacobian, the same object from Ch5, is what makes that local linearisation possible: its columns are literally the slopes ∂f/∂q_j that a tangent-plane approximation needs.",
          },
        ],
      },
      {
        id: 'ch4-why-gn',
        title: 'Why Gauss-Newton, Not Newton?',
        tags: ['why'],
        blocks: [
          {
            type: 'p',
            text: "Newton's method for minimising $\\Phi$ needs the full Hessian $\\nabla^2\\Phi$ — but computing second derivatives of $f$ when $f$ is itself the solution of an ODE means solving for how sensitivities *change* with parameters, a much heavier calculation than the sensitivity equations of Ch5 already require.",
          },
          {
            type: 'p',
            text: 'Gauss-Newton avoids this by approximating the Hessian using only first derivatives, discarding the terms that involve second derivatives of $f$:',
          },
          { type: 'math', tex: '\\nabla^2 \\Phi \\approx 2 J^\\top J' },
          {
            type: 'p',
            text: 'This approximation is valid precisely when the residuals $r_i$ are small — i.e. when the fit is already reasonably good, which is exactly the regime you are in once you are iterating near the optimum. In exchange for that restriction, you only ever need first derivatives, meaning you only ever need to solve the sensitivity ODEs from Ch5, never a second, more expensive set of equations.',
          },
          {
            type: 'interpret',
            text: 'Levenberg-Marquardt blends Gauss-Newton (fast once you are close to the solution) with gradient descent (robust when you start far away, where the small-residual assumption fails). This is what `nls()` uses in R — it gets Gauss-Newton\'s speed near the answer without Gauss-Newton\'s fragility far from it.',
          },
          {
            type: 'summary',
            text: "Newton's method is the more powerful tool in principle, but it needs second derivatives that, for an ODE model, are expensive to obtain. Gauss-Newton trades a small amount of generality — it only works well once the residuals are already small — for needing nothing beyond the first-derivative sensitivities you were computing anyway. Levenberg-Marquardt is the practical compromise that keeps Gauss-Newton's cheapness while patching its one weakness.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── CH5 ─────────────────────────────
  {
    id: 'ch5',
    number: 5,
    navLabel: 'Ch5 · Sensitivity Analysis',
    title: 'Sensitivity Analysis',
    sections: [
      {
        id: 'ch5-core-idea',
        title: 'The Core Idea',
        tags: ['why'],
        blocks: [
          {
            type: 'p',
            text: 'You want $\\partial y/\\partial q$ — how much the output changes when a parameter $q$ changes by a little. The obstacle is that $y(t)$ is not a formula you can differentiate; it is defined only implicitly, as the solution of an ODE.',
          },
          { type: 'subheading', text: 'Why not just finite-difference it?' },
          {
            type: 'p',
            text: 'You could solve the ODE twice, once at $q$ and once at $q+h$, and approximate $\\partial y/\\partial q \\approx \\frac{y(t;q+h) - y(t;q)}{h}$. This works numerically, but it is expensive — a full solver run per parameter — and it is imprecise: too large an $h$ and you get truncation error, too small an $h$ and floating-point round-off dominates. It never gives you an exact expression, only a noisy approximation of one.',
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: 'So instead of differencing two solutions after solving, differentiate the ODE itself before solving — turn the question "how does the solution change with $q$" into a *new ODE* for that sensitivity, and solve it exactly, alongside the original equation, with the same solver.',
          },
          {
            type: 'summary',
            text: "You can't differentiate a function you don't have a formula for, and numerically differencing two solved trajectories is expensive and imprecise. The fix is to differentiate the governing ODE itself with respect to the parameter — this produces a brand-new, exact ODE for the sensitivity, which you solve directly instead of estimating from finite differences.",
          },
        ],
      },
      {
        id: 'ch5-derivation',
        title: 'Derivation of Sensitivity Equation',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'Why this works' },
          {
            type: 'p',
            text: "Start with the governing ODE and differentiate both sides with respect to $q$ — not with respect to $t$, since $q$ is what you're tracking sensitivity against:",
          },
          { type: 'math', tex: '\\frac{dy}{dt} = f(y, q)' },
          {
            type: 'math',
            tex: '\\frac{d}{dq}\\!\\left[\\frac{dy}{dt}\\right] = \\frac{d}{dq}[f(y,q)]',
          },
          {
            type: 'p',
            text: 'On the left, differentiation with respect to $t$ and with respect to $q$ commute, so you can swap their order — this turns "the $q$-derivative of a $t$-derivative" into "the $t$-derivative of a $q$-derivative", which is the quantity you actually want to track over time. On the right, $f$ depends on $q$ two ways at once — directly, and indirectly through $y(t,q)$ — so the chain rule produces two terms, not one:',
          },
          {
            type: 'math',
            tex: '\\frac{d}{dt}\\!\\left[\\frac{\\partial y}{\\partial q}\\right] = \\frac{\\partial f}{\\partial y} \\cdot \\frac{\\partial y}{\\partial q} + \\frac{\\partial f}{\\partial q}',
          },
          {
            type: 'p',
            text: 'Naming $S(t) = \\partial y/\\partial q$ turns this into an ODE for $S$ itself — exactly the "new ODE for the sensitivity" the previous section asked for:',
          },
          {
            type: 'math',
            boxed: true,
            tex: '\\dot{S} = \\frac{\\partial f}{\\partial y} \\cdot S + \\frac{\\partial f}{\\partial q}, \\qquad S(0) = \\frac{\\partial y_0}{\\partial q} = 0',
          },
          {
            type: 'p',
            text: 'Why $S(0) = 0$? The initial condition $y_0$ is a fixed number you chose, independent of $q$ — changing $q$ does not change where you started, so its derivative with respect to $q$ is zero.',
          },
          {
            type: 'trap',
            text: "The instinct is to differentiate $f(y,q)$ with respect to $q$ as if $y$ were just another constant sitting there, since it's easy to see $q$ appearing explicitly in the formula for $f$ and stop looking once you've differentiated that visible occurrence. But $y$ is a function of $q$ too — it's the solution of an ODE whose behaviour depends on $q$ — so the chain rule contributes a second, implicit term $(\\partial f/\\partial y)(\\partial y/\\partial q)$ that never appears explicitly in the formula for $f$. Dropping it understates how sensitive $y$ really is, because it ignores every way $q$ affects $y$ indirectly through the dynamics, not just directly through the formula.",
          },
          {
            type: 'summary',
            text: "Differentiating the ODE with respect to q, rather than trying to differentiate y(t) directly, works because differentiation in t and in q commute — so the left side becomes exactly d/dt of the sensitivity you want. The right side needs the chain rule because f depends on q both directly and through y, which is why the sensitivity equation always has two terms, and dropping the implicit one is the single most common mistake. The result is a linear ODE for S(t) that you solve alongside the original equation, starting from S(0)=0 because the initial condition itself does not depend on q.",
          },
        ],
      },
      {
        id: 'ch5-ct3',
        title: 'CT3 — Full Worked Solution',
        tags: ['exam'],
        blocks: [
          {
            type: 'p',
            text: 'This applies the sensitivity-equation machinery to the decay model from Ch1, where the ODE is simple enough to solve every part in closed form.',
          },
          { type: 'math', tex: '\\frac{dy}{dt} = -ky, \\quad y(0) = y_0' },
          { type: 'subheading', text: 'Part (a) — Derive Ṡ where S = ∂y/∂k:' },
          {
            type: 'p',
            text: 'Here $f(y,k) = -ky$, so $\\partial f/\\partial y = -k$ and $\\partial f/\\partial k = -y$ — apply the sensitivity equation directly:',
          },
          {
            type: 'math',
            tex: '\\dot{S} = \\frac{\\partial f}{\\partial y}S + \\frac{\\partial f}{\\partial k} = -kS - y, \\qquad S(0) = 0',
          },
          {
            type: 'subheading',
            text: 'Part (b) — Analytic solution (closed form exists, so differentiate directly):',
          },
          {
            type: 'p',
            text: "Because this particular ODE has a known closed-form solution, you don't need to solve the sensitivity ODE numerically — just differentiate the solution itself with respect to $k$, which must give the same $S(t)$:",
          },
          {
            type: 'math',
            tex: 'y = y_0 e^{-kt} \\implies S(t) = \\frac{\\partial y}{\\partial k} = -y_0 t e^{-kt}',
          },
          { type: 'subheading', text: 'Part (c) — Time of maximum sensitivity, set dS/dt = 0:' },
          {
            type: 'p',
            text: 'Sensitivity is not monotonic — it rises then falls, so the time of *maximum* sensitivity is where its own derivative vanishes:',
          },
          {
            type: 'math',
            tex: '\\frac{dS}{dt} = -y_0 e^{-kt} + y_0 kt e^{-kt} = 0 \\implies -1 + kt^* = 0 \\implies t^* = \\frac{1}{k}',
          },
          { type: 'subheading', text: 'Part (d) — Relative sensitivity:' },
          {
            type: 'p',
            text: 'Raw sensitivity $S$ mixes units with the size of $y$ itself; dividing by $y$ and multiplying by $k$ gives a dimensionless, comparable quantity:',
          },
          {
            type: 'math',
            tex: '\\sigma(t) = \\frac{k}{y} S(t) = \\frac{k}{y_0 e^{-kt}} \\cdot \\left(-y_0 t e^{-kt}\\right) = -kt',
          },
          {
            type: 'interpret',
            text: 'So what should you actually do with this? $|\\sigma|$ grows without bound as $t$ increases, meaning later measurements carry more information about $k$ than earlier ones — but $S(t)$ itself peaks and starts to fall after $t^* = 1/k$, so the best single time to measure for the most precise estimate of $k$ is right around $t^*$, not arbitrarily late.',
          },
          {
            type: 'summary',
            text: 'Every part of this problem is the same sensitivity equation viewed from a different angle: part (a) derives it directly, part (b) exploits the fact that this particular ODE has a closed-form solution to shortcut straight to S(t), part (c) treats S(t) as an ordinary function whose peak you find by calculus, and part (d) rescales S into a dimensionless quantity that is easier to compare across different problems. The payoff is practical — it tells you when to measure to learn the most about k.',
          },
        ],
      },
      {
        id: 'ch5-multi-parameter',
        title: 'General Multi-Parameter Case',
        tags: ['how'],
        blocks: [
          {
            type: 'p',
            text: 'The single-parameter derivation generalises directly once you have more than one state variable and more than one parameter: $\\frac{d\\mathbf{y}}{dt} = \\mathbf{f}(\\mathbf{y}, \\mathbf{q}),\\ \\mathbf{y}\\in\\mathbb{R}^n,\\ \\mathbf{q}\\in\\mathbb{R}^p$.',
          },
          {
            type: 'p',
            text: 'The same differentiate-the-ODE argument applies separately to each parameter $q_j$ — nothing in the earlier derivation actually depended on there being only one state or one parameter, so repeat it once per $q_j$, defining a sensitivity vector $\\mathbf{s}_j(t) = \\partial\\mathbf{y}/\\partial q_j \\in \\mathbb{R}^n$ each time:',
          },
          {
            type: 'math',
            tex: '\\dot{\\mathbf{s}}_j = \\frac{\\partial \\mathbf{f}}{\\partial \\mathbf{y}} \\mathbf{s}_j + \\frac{\\partial \\mathbf{f}}{\\partial q_j}, \\qquad \\mathbf{s}_j(0) = \\frac{\\partial \\mathbf{y}_0}{\\partial q_j}',
          },
          {
            type: 'p',
            text: 'Solve all $p$ of these sensitivity systems alongside the original ODE — one extra vector ODE per parameter. Stacking their columns side by side is exactly the sensitivity Jacobian $J$ that Gauss-Newton (Ch4) needs, which is why sensitivity analysis and parameter fitting are really one connected pipeline: solve for the $\\mathbf{s}_j$, assemble $J$, then run Gauss-Newton.',
          },
          {
            type: 'summary',
            text: 'Nothing new is required to go from one parameter to many — the same differentiate-and-name-it-S argument is repeated once per parameter, giving one extra vector ODE to solve alongside the state equations for each. Collecting all of these sensitivity vectors into a matrix produces exactly the J used in Gauss-Newton, which is the thread tying this chapter directly to the fitting procedure in Ch4.',
          },
        ],
      },
    ],
  },

  // ───────────────────────────── CH6 ─────────────────────────────
  {
    id: 'ch6',
    number: 6,
    navLabel: 'Ch6 · PDEs & Method of Lines',
    title: 'PDEs & Method of Lines',
    sections: [
      {
        id: 'ch6-why-mol',
        title: 'Why Method of Lines?',
        tags: ['why'],
        blocks: [
          {
            type: 'p',
            text: 'A PDE has two independent variables — time and space — but the ODE solvers you already have (and already trust) are built for a single independent variable.',
          },
          { type: 'subheading', text: 'Why not just discretise everything at once?' },
          {
            type: 'p',
            text: "You could put both time and space on a grid and update it step by step yourself — this is a standard finite-difference-in-time scheme. But then you own the numerical stability: an explicit time-stepping scheme for diffusion, for instance, blows up if the time step is too large relative to the square of the space step, and you have to work that limit out and enforce it by hand. You've traded a modelling problem for a numerical-stability engineering problem.",
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: "So discretise only space, and leave time continuous. Space becomes a finite set of grid points, but time stays a real variable — which means the PDE collapses into a large system of ODEs, one per spatial point, and you can hand the whole system to a general-purpose adaptive solver (lsode in R) that already manages stability and step size for you.",
          },
          {
            type: 'summary',
            text: 'A PDE resists standard ODE tools because it has two independent variables, but you only need to remove one of them to fit ODE machinery — not both. Discretising space while leaving time continuous turns the PDE into a large but ordinary system of ODEs, letting you reuse a robust adaptive solver instead of hand-building a stable time-stepping scheme from scratch.',
          },
        ],
      },
      {
        id: 'ch6-mol-derivation',
        title: 'MOL — The Derivation',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'Diffusion PDE:' },
          { type: 'math', tex: '\\frac{\\partial u}{\\partial t} = D \\frac{\\partial^2 u}{\\partial x^2}' },
          {
            type: 'p',
            text: 'Discretise $x$ into grid points $x_1, x_2, \\ldots, x_n$ with spacing $\\Delta x$, and keep $t$ continuous. The remaining question is: how do you approximate $\\partial^2 u/\\partial x^2$ using only the values at nearby grid points?',
          },
          {
            type: 'p',
            text: 'Taylor-expand $u$ one step forward and one step back from $x_i$:',
          },
          {
            type: 'math',
            tex: 'u_{i+1} = u_i + \\Delta x\\, u_i\' + \\tfrac{1}{2}\\Delta x^2 u_i\'\' + \\cdots, \\qquad u_{i-1} = u_i - \\Delta x\\, u_i\' + \\tfrac{1}{2}\\Delta x^2 u_i\'\' - \\cdots',
          },
          {
            type: 'p',
            text: 'Add the two expansions — the odd-order terms, including the first derivative you don\'t want, cancel by symmetry, leaving only even-order terms:',
          },
          { type: 'math', tex: 'u_{i+1} + u_{i-1} = 2u_i + \\Delta x^2 u_i\'\' + O(\\Delta x^4)' },
          { type: 'p', text: 'Solve for $u_i\'\'$ — this is exactly the second-derivative approximation you needed:' },
          {
            type: 'math',
            tex: '\\frac{\\partial^2 u}{\\partial x^2} \\approx \\frac{u_{i+1} - 2u_i + u_{i-1}}{\\Delta x^2}',
          },
          {
            type: 'p',
            text: 'Substituting this into the PDE turns it into $n$ separate ordinary differential equations, one per grid point, coupled only through their neighbours:',
          },
          {
            type: 'math',
            tex: '\\frac{du_i}{dt} = D\\, \\frac{u_{i+1} - 2u_i + u_{i-1}}{\\Delta x^2}, \\qquad i = 1, \\ldots, n',
          },
          {
            type: 'p',
            text: 'Apply the boundary conditions at $i=1$ and $i=n$ (where the neighbour formula would otherwise reach outside the grid), then hand the whole system to `lsode()` in R.',
          },
          {
            type: 'summary',
            text: 'The finite-difference formula for the second derivative is not an arbitrary approximation — it falls straight out of adding two Taylor expansions, which cancels the odd-order terms you don\'t want and isolates the second derivative you do. Substituting that formula into the PDE at every grid point converts one equation with two independent variables into a large but perfectly ordinary system of coupled ODEs, ready for any standard solver.',
          },
        ],
      },
      {
        id: 'ch6-wave-equation',
        title: 'Wave Equation — Second Order in Time',
        tags: ['how'],
        blocks: [
          {
            type: 'math',
            tex: '\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\frac{\\partial^2 u}{\\partial x^2}',
          },
          { type: 'subheading', text: 'The problem' },
          {
            type: 'p',
            text: 'This equation is second order in time, needing two initial conditions (position and velocity), but MOL as built above produces a system of *first-order* ODEs in $t$ — one derivative in time per equation, not two.',
          },
          {
            type: 'p',
            text: "You could discretise the time derivative directly too, with a second difference in time (a leapfrog-style scheme) — but that's the same trap as before: you'd be hand-building a time-stepping scheme with its own stability limit instead of reusing a general first-order solver.",
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: "This is the same trick used for any second-order ODE: introduce the velocity as a new unknown to turn one second-order equation into two first-order ones — exactly like rewriting $\\ddot x = -x$ as $\\dot x = v,\\ \\dot v = -x$ in ordinary mechanics. Define $v = \\partial u/\\partial t$:",
          },
          {
            type: 'math',
            tex: '\\frac{\\partial u}{\\partial t} = v, \\qquad \\frac{\\partial v}{\\partial t} = c^2 \\frac{\\partial^2 u}{\\partial x^2}',
          },
          {
            type: 'p',
            text: 'This is now first order in time, so MOL applies directly to the spatial derivative exactly as before:',
          },
          {
            type: 'math',
            tex: '\\frac{du_i}{dt} = v_i, \\qquad \\frac{dv_i}{dt} = c^2 \\frac{u_{i+1} - 2u_i + u_{i-1}}{\\Delta x^2}',
          },
          {
            type: 'p',
            text: 'Initial conditions: $u(x,0)$ is the given starting shape, and $v(x,0) = \\partial u/\\partial t|_{t=0} = 0$ if the wave starts at rest.',
          },
          {
            type: 'interpret',
            text: 'CT3 Q2 — two Gaussian pulses start at $x = \\pm 30$ with speed $c=1$. So what does that predict? Distance to close is $30$, speed is $1$, so they meet at $x=0$ when $t=30$ — a direct consequence of the wave speed being fixed at $c$, with no need to run the simulation to know the answer.',
          },
          {
            type: 'summary',
            text: 'A second-order-in-time PDE does not fit first-order MOL machinery directly, so the fix is the same reduction used for any second-order ODE: introduce velocity as a second unknown, turning one second-order equation into a pair of first-order ones. Once that reduction is done, MOL applies to the spatial part exactly as in the diffusion case — the time order was the only obstacle, and it is now gone.',
          },
        ],
      },
      {
        id: 'ch6-convergence',
        title: 'Convergence — What CT3 Q2 Really Tested',
        tags: ['exam'],
        blocks: [
          {
            type: 'p',
            text: 'A numerical solution can look reasonable and still be wrong — so how do you actually check it is trustworthy, rather than just plausible?',
          },
          {
            type: 'p',
            text: "It isn't enough to halve $\\Delta x$ and see the curve look 'similar'. The finite-difference derivation earlier dropped an $O(\\Delta x^2)$ error term, which makes a specific, checkable prediction: the error should shrink at a *known rate* as $\\Delta x \\to 0$, not just shrink. Verifying that rate — not just that the curve looks smoother — is the real test that the method is converging to the true solution rather than to some other, wrong, limit.",
          },
          {
            type: 'table',
            headers: ['Δx', 'Max error'],
            rows: [
              ['5', '0.2232'],
              ['0.5', '0.0040'],
              ['0.05', '0.00016'],
            ],
          },
          {
            type: 'p',
            text: 'Each tenfold reduction in $\\Delta x$ produces roughly a hundredfold reduction in error — squaring the improvement, exactly matching the $O(\\Delta x^2)$ prediction from the derivation.',
          },
          {
            type: 'interpret',
            label: 'Exam sentence',
            text: 'As $\\Delta x \\to 0$, the finite difference approximation to $\\partial^2 u/\\partial x^2$ improves, so the numerical solution converges to the analytic solution.',
          },
          {
            type: 'summary',
            text: 'A convergence check is not "does the picture look right" — it is "does the error shrink at the rate the derivation predicts". Because the central-difference formula was built by discarding an O(Δx²) term, halving Δx should roughly quarter the error and a tenfold reduction should give roughly a hundredfold one; the table matches that prediction almost exactly, which is what actually justifies trusting the numerical solution.',
          },
        ],
      },
    ],
  },

  // ───────────────────────────── CH7 ─────────────────────────────
  {
    id: 'ch7',
    number: 7,
    navLabel: 'Ch7 · Model Discrepancy & UQ',
    title: 'Model Discrepancy & UQ',
    sections: [
      {
        id: 'ch7-why',
        title: 'The Problem — Your Model is Wrong',
        tags: ['why'],
        blocks: [
          {
            type: 'p',
            text: 'After fitting $\\hat{\\mathbf{q}}$, you want to trust the confidence interval you report for it.',
          },
          { type: 'subheading', text: "Why can't you just trust the fit's own error bars?" },
          {
            type: 'p',
            text: 'The standard approach assumes the model is exactly correct apart from random measurement noise, and computes a confidence interval from that noise alone. But every model omits something — a linear-pendulum model ignores the true nonlinear restoring force, a well-mixed-tank model ignores real spatial gradients. That kind of mismatch between model and reality is not random: it is a systematic *pattern*, and an optimiser fitting to it will happily "explain" the pattern by quietly shifting $\\hat{\\mathbf{q}}$ away from its true value, rather than reporting the mismatch as unexplained error.',
          },
          {
            type: 'p',
            text: 'So the fix is to stop treating all mismatch as one thing. Split it explicitly into a systematic, deterministic piece — the model discrepancy — and a genuinely random piece — measurement noise — and account for the systematic piece instead of quietly absorbing it into $\\hat{\\mathbf{q}}$.',
          },
          {
            type: 'summary',
            text: "A confidence interval computed as if the model were exactly right, with only random noise around it, silently assumes away the possibility that the model itself is systematically wrong — and every model is, to some degree. Because that mismatch is patterned rather than random, an optimiser will bake it into the fitted parameters rather than flagging it, biasing q̂ and making the reported confidence interval falsely narrow. Naming the systematic piece explicitly, as model discrepancy, is what stops it from being silently absorbed.",
          },
        ],
      },
      {
        id: 'ch7-discrepancy-framework',
        title: 'Model Discrepancy Framework',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'Full data model:' },
          { type: 'math', tex: 'Y_i = f(x_i, \\mathbf{q}) + \\delta(x_i) + \\varepsilon_i' },
          { type: 'p', text: 'where:' },
          {
            type: 'list',
            items: [
              '$f(x_i, \\mathbf{q})$ = computer model (the ODE solution)',
              '$\\delta(x_i)$ = model discrepancy — missing physics, systematic rather than random',
              '$\\varepsilon_i$ = measurement noise — independent, mean zero',
            ],
          },
          {
            type: 'p',
            text: 'If you ignore $\\delta$ and fit as though $Y_i = f(x_i, \\mathbf{q}) + \\varepsilon_i$, the optimiser has only one place to put every discrepancy between model and data: inside $\\hat{\\mathbf{q}}$. Since $\\delta$ is systematic — not noise that averages out — this pushes $\\hat{\\mathbf{q}}$ away from its true value in a consistent direction, not a random one.',
          },
          {
            type: 'interpret',
            text: '$\\delta(x)$ is not random — it is systematic. Example: modelling a nonlinear pendulum as linear. The discrepancy $\\delta$ captures exactly the nonlinear correction your model structurally cannot produce, no matter how well you tune $\\mathbf{q}$.',
          },
          {
            type: 'summary',
            text: 'Splitting the residual into f(x,q), δ(x), and ε explicitly is what prevents the systematic part of the mismatch from masquerading as either "correct model" or "random noise" — it forces you to acknowledge that some of the gap between prediction and data reflects missing physics that no choice of q can fix.',
          },
        ],
      },
      {
        id: 'ch7-confidence-ellipses',
        title: 'Confidence Ellipses',
        tags: ['exam'],
        blocks: [
          { type: 'subheading', text: 'The problem' },
          {
            type: 'p',
            text: 'After fitting $\\hat{\\mathbf{q}}$, how much do you actually trust each parameter — and could errors in different parameters be related to each other?',
          },
          {
            type: 'p',
            text: 'The obvious approach reports a separate $\\pm$ error bar per parameter, as if each were independent. But parameters estimated from the *same* data are often correlated — in an exponential fit, for instance, a slightly larger amplitude paired with a slightly faster decay can reproduce almost the same curve as the original fit. Independent bars hide exactly this kind of trade-off between parameters.',
          },
          { type: 'subheading', text: 'The insight' },
          {
            type: 'p',
            text: 'So use the full covariance matrix, built from the same sensitivity Jacobian $J$ that Gauss-Newton (Ch4) already computes, rather than one number per parameter. A matrix naturally encodes how uncertainty in one parameter relates to uncertainty in another — and geometrically, that shows up as an ellipse in parameter space, not a simple interval.',
          },
          { type: 'p', text: 'After fitting $\\hat{\\mathbf{q}}$, uncertainty is captured by:' },
          {
            type: 'math',
            tex: '\\text{Cov}(\\hat{\\mathbf{q}}) \\approx \\sigma^2 (J^\\top J)^{-1}, \\qquad \\sigma^2 = \\frac{\\Phi(\\hat{\\mathbf{q}})}{n - p}',
          },
          { type: 'p', text: 'The confidence ellipse is the set of $\\mathbf{q}$ satisfying:' },
          {
            type: 'math',
            tex: '(\\mathbf{q} - \\hat{\\mathbf{q}})^\\top (J^\\top J)(\\mathbf{q} - \\hat{\\mathbf{q}}) \\leq c^2',
          },
          { type: 'p', text: "The ellipse's shape tells you:" },
          {
            type: 'list',
            items: [
              'Narrow axis → that parameter combination is well determined',
              'Wide axis → poorly determined',
              'Tilted → parameters are correlated (connects back to identifiability, Ch3)',
            ],
          },
          {
            type: 'summary',
            text: "A single ± error bar per parameter implicitly assumes each parameter's uncertainty is independent of the others, which is usually false when they are estimated from the same data. Building the covariance from J^T J instead captures both how uncertain each parameter is and how its uncertainty trades off against the others, and the ellipse's tilt is the geometric signature of that trade-off — the same underlying issue that identifiability analysis in Ch3 checks for in the extreme case.",
          },
        ],
      },
    ],
  },

  // ────────────────────────── EXAM SKELETONS ──────────────────────────
  {
    id: 'skeletons',
    number: null,
    navLabel: '⚡ Exam Skeletons',
    title: 'Exam Skeletons',
    sections: [
      {
        id: 'skeleton-intro',
        title: 'How to Use This Chapter',
        tags: ['exam'],
        blocks: [
          {
            type: 'p',
            text: "These are deliberately condensed — the WHY and the WHY-THIS-WORKS reasoning behind every line here already lives in Chapters 1–7. This is the recall layer for exam day: once you understand a method, you don't want the full derivation again, you want the fastest possible checklist that reconstructs it under time pressure.",
          },
        ],
      },
      {
        id: 'skeleton-ch2',
        title: 'Ch2 — Stability Analysis (skeleton)',
        tags: ['exam'],
        blocks: [
          {
            type: 'steps',
            items: [
              { tex: '\\text{Set } f=0, g=0 \\to \\text{solve for } (x^*, y^*)', inline: true },
              { tex: '\\text{Compute 4 partial derivatives of } f \\text{ and } g', inline: true },
              { tex: '\\text{Evaluate at } (x^*, y^*) \\to J \\text{ (numbers only)}', inline: true },
              {
                tex: '\\text{IF triangular} \\to \\lambda = \\text{diagonal entries. ELSE solve } \\lambda^2 - \\text{tr}(J)\\lambda + \\det(J) = 0',
                inline: true,
              },
              {
                tex: '\\det < 0 \\to \\text{saddle};\\quad \\text{tr}<0,\\det>0,\\Delta>0 \\to \\text{stable node};\\quad \\text{tr}<0,\\det>0,\\Delta<0 \\to \\text{stable spiral}',
                inline: true,
              },
              {
                tex: '\\text{Write: "Both eigenvalues [...] are [...] with negative real part} \\to \\text{[classification] — trajectories [approach/leave] fixed point [monotonically/spiralling]."}',
                inline: true,
              },
            ],
          },
        ],
      },
      {
        id: 'skeleton-ch3',
        title: 'Ch3 — System Reduction (skeleton)',
        tags: ['exam'],
        blocks: [
          {
            type: 'steps',
            items: [
              { tex: '\\text{Isolate } y \\text{ from equation 1}', inline: true },
              {
                tex: '\\text{Differentiate } \\dot{x} \\to \\ddot{x} \\text{ (introduces } \\dot{y}\\text{)}',
                inline: true,
              },
              { tex: '\\text{Substitute } \\dot{y} \\text{ from equation 2}', inline: true },
              {
                tex: '\\text{Substitute } y \\text{ from Step 1} \\to \\text{ODE in } x \\text{ only}',
                inline: true,
              },
              { tex: '\\text{Let } z = \\dot{x} \\to \\text{first-order system}', inline: true },
              { tex: '\\text{State } z(0) = \\dot{x}(0) = f(x_0, y_0)', inline: true },
              { tex: '\\text{Check all params appear as independent coefficients}', inline: true },
              { tex: '\\text{Write identifiability conclusion}', inline: true },
            ],
          },
        ],
      },
      {
        id: 'skeleton-ch4',
        title: 'Ch4 — Gauss-Newton (skeleton)',
        tags: ['exam'],
        blocks: [
          {
            type: 'steps',
            items: [
              { tex: 'r_i = y_i^{\\text{obs}} - f(t_i, \\mathbf{q})', inline: true },
              { tex: '\\Phi(\\mathbf{q}) = \\sum r_i^2 = \\mathbf{r}^\\top\\mathbf{r}', inline: true },
              {
                tex: 'J_{ij} = \\partial f(t_i,\\mathbf{q})/\\partial q_j \\quad \\text{(sensitivity function)}',
                inline: true,
              },
              {
                tex: '\\mathbf{q}_{k+1} = \\mathbf{q}_k + (J^\\top J)^{-1}J^\\top\\mathbf{r}',
                inline: true,
              },
              { tex: '\\text{Iterate until convergence}', inline: true },
              {
                tex: '\\text{Write: "Columns of } J \\text{ are sensitivity functions } S_j(t_i) = \\partial f/\\partial q_j\\text{."}',
                inline: true,
              },
            ],
          },
        ],
      },
      {
        id: 'skeleton-ch5',
        title: 'Ch5 — Sensitivity Equation (skeleton)',
        tags: ['exam'],
        blocks: [
          {
            type: 'steps',
            items: [
              { tex: 'S(t) = \\partial y/\\partial q', inline: true },
              {
                tex: '\\dot{S} = (\\partial f/\\partial y)\\cdot S + \\partial f/\\partial q, \\quad S(0) = 0',
                inline: true,
              },
              {
                tex: '\\text{If analytic solution exists: differentiate directly. Else: solve ODE numerically.}',
                inline: true,
              },
              { tex: '\\sigma(t) = (q/y)\\cdot S \\quad \\text{(relative sensitivity)}', inline: true },
              { tex: 't^* \\text{: set } dS/dt = 0 \\text{, solve}', inline: true },
              {
                tex: '\\text{Write: "}|S|\\text{ peaks at }t^* \\to \\text{measure here for best estimate of }q\\text{."}',
                inline: true,
              },
            ],
          },
        ],
      },
      {
        id: 'skeleton-ch6',
        title: 'Ch6 — Method of Lines (skeleton)',
        tags: ['exam'],
        blocks: [
          {
            type: 'steps',
            items: [
              {
                tex: '\\text{Discretise }x\\text{: }x_1,\\ldots,x_n\\text{ with spacing }\\Delta x',
                inline: true,
              },
              {
                tex: '\\partial^2 u/\\partial x^2 \\approx (u_{i+1}-2u_i+u_{i-1})/\\Delta x^2',
                inline: true,
              },
              { tex: '\\text{Result: }n\\text{ ODEs}', inline: true },
              { tex: '\\text{Apply BCs at }i=1\\text{ and }i=n', inline: true },
              { tex: '\\text{Solve with lsode() in R}', inline: true },
              {
                tex: '\\text{Write: "As }\\Delta x\\to 0\\text{, finite difference improves}\\to\\text{solution converges to analytic solution."}',
                inline: true,
              },
            ],
          },
        ],
      },
      {
        id: 'skeleton-interpretation-bank',
        title: 'Physical Interpretation Bank',
        tags: ['interpret'],
        blocks: [
          { type: 'p', text: 'Always end every answer with one of:' },
          {
            type: 'bank',
            items: [
              {
                label: 'Stability',
                tex: '\\text{"Trajectories approach }(x^*,y^*)\\text{ monotonically — system returns to equilibrium after perturbation."}',
              },
              {
                label: 'Sensitivity peak',
                tex: '\\text{"}S(t)\\text{ peaks at }t^*=1/k \\to \\text{ measure at this time for most precise parameter estimate."}',
              },
              {
                label: 'Relative sensitivity',
                tex: '\\text{"}\\sigma = -kt \\to \\text{ as }t\\text{ increases, measurements become more informative about }k\\text{."}',
              },
              {
                label: 'Identifiability',
                tex: '\\text{"All parameters appear independently}\\to\\text{observing }x\\text{ alone is sufficient to uniquely recover all parameters."}',
              },
              {
                label: 'MOL convergence',
                tex: '\\text{"Smaller }\\Delta x \\to \\text{better derivative approximation}\\to\\text{solution converges to true PDE solution."}',
              },
            ],
          },
        ],
      },
    ],
  },
]
