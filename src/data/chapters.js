// All exam-prep content as structured data, consumed by ChapterView / Section.
// Block types: p, subheading, math, steps, table, list, interpret, trap, bank.

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
            text: "An ODE models how a quantity changes over time. You don't need to know where the system is — you only need the rule for how it moves. Everything follows from that rule plus an initial condition.",
          },
        ],
      },
      {
        id: 'ch1-separable',
        title: 'Separable ODEs',
        tags: ['how'],
        blocks: [
          { type: 'math', tex: '\\frac{dy}{dt} = f(t) \\cdot g(y)' },
          { type: 'subheading', text: 'Separate variables and integrate both sides:' },
          { type: 'math', tex: '\\int \\frac{dy}{g(y)} = \\int f(t)\\, dt' },
          { type: 'subheading', text: 'Example — radioactive decay:' },
          {
            type: 'math',
            tex: '\\frac{dy}{dt} = -ky \\implies \\int \\frac{dy}{y} = \\int -k\\, dt \\implies \\ln|y| = -kt + C',
          },
          { type: 'math', tex: '\\implies y(t) = y_0 e^{-kt}' },
          {
            type: 'interpret',
            text: 'Exponential decay — $y$ halves every $\\frac{\\ln 2}{k}$ time units. The parameter $k$ controls the rate.',
          },
        ],
      },
      {
        id: 'ch1-integrating-factor',
        title: 'Integrating Factor',
        tags: ['how'],
        blocks: [
          { type: 'subheading', text: 'Standard form:' },
          { type: 'math', tex: '\\frac{dy}{dt} + P(t)y = Q(t)' },
          {
            type: 'p',
            text: 'Why this works — we want the left side to equal $\\frac{d}{dt}(\\mu y)$:',
          },
          { type: 'math', tex: '\\frac{d}{dt}(\\mu y) = \\mu \\dot{y} + \\dot{\\mu} y' },
          { type: 'p', text: 'Matching gives $\\dot{\\mu} = \\mu P(t)$, so:' },
          { type: 'math', tex: '\\mu(t) = e^{\\int P(t)\\, dt}' },
          { type: 'p', text: 'Then:' },
          {
            type: 'math',
            tex: '\\frac{d}{dt}(\\mu y) = \\mu Q(t) \\implies \\mu y = \\int \\mu Q\\, dt + C \\implies y = \\frac{1}{\\mu}\\left[\\int \\mu Q\\, dt + C\\right]',
          },
          { type: 'trap', text: 'Forgetting to divide by $\\mu$ at the end.' },
        ],
      },
      {
        id: 'ch1-painting-forgery',
        title: 'Ex2 — Painting Forgery (Prof Chris pattern)',
        tags: ['exam'],
        blocks: [
          { type: 'subheading', text: 'Model:' },
          {
            type: 'math',
            tex: '\\frac{dy}{dt} = -\\lambda y + r(t), \\quad \\lambda = 3.151 \\times 10^{-2}',
          },
          { type: 'p', text: 'Integrating factor $\\mu = e^{\\lambda t}$:' },
          { type: 'math', tex: '\\frac{d}{dt}(e^{\\lambda t} y) = r e^{\\lambda t}' },
          { type: 'math', tex: '\\implies e^{\\lambda t} y = \\frac{r}{\\lambda} e^{\\lambda t} + C' },
          { type: 'math', tex: '\\implies y(t) = \\frac{r}{\\lambda} + Ce^{-\\lambda t}' },
          {
            type: 'p',
            text: 'Use current measurements $\\lambda y = 8.5,\\, r = 0.8$ to back-calculate $\\lambda y_0$ for a 300-year-old painting.',
          },
          {
            type: 'interpret',
            text: 'If the painting is genuine, $\\lambda y_0$ must lie in the range 0–200. A value far outside this range conclusively proves forgery.',
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
            text: 'Most nonlinear ODEs have no analytic solution. But near a fixed point, the nonlinear system behaves like a linear one. The Jacobian captures the local slope — eigenvalues tell you whether small perturbations grow (unstable) or shrink (stable).',
          },
        ],
      },
      {
        id: 'ch2-pipeline',
        title: 'The Pipeline — Always This Order',
        tags: ['how'],
        blocks: [
          { type: 'p', text: 'Given system $\\dot{x} = f(x,y),\\quad \\dot{y} = g(x,y)$:' },
          {
            type: 'steps',
            items: [
              {
                text: 'Fixed points: solve simultaneously:',
                tex: 'f(x^*, y^*) = 0 \\quad \\text{and} \\quad g(x^*, y^*) = 0',
              },
              {
                text: 'Jacobian matrix:',
                tex: 'J = \\begin{pmatrix} \\partial f/\\partial x & \\partial f/\\partial y \\\\ \\partial g/\\partial x & \\partial g/\\partial y \\end{pmatrix}\\Bigg|_{(x^*,\\, y^*)}',
              },
              {
                text: 'Characteristic equation:',
                tex: '\\lambda^2 - \\text{tr}(J)\\,\\lambda + \\det(J) = 0',
                note: 'where $\\text{tr}(J) = \\lambda_1 + \\lambda_2$ and $\\det(J) = \\lambda_1 \\lambda_2$.',
              },
              { text: 'Classify from stability table.' },
            ],
          },
          {
            type: 'trap',
            text: 'Always evaluate $J$ AT the fixed point after differentiating. The partial derivatives are functions — plug in $(x^*, y^*)$ to get pure numbers.',
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
            text: 'Conditions (where $\\Delta = \\text{tr}(J)^2 - 4\\det(J)$):',
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
            text: 'Shortcut: If $J$ is upper or lower triangular, eigenvalues = diagonal entries directly. Do NOT solve the quadratic.',
          },
        ],
      },
      {
        id: 'ch2-ct1',
        title: 'CT1 Worked Example',
        tags: ['exam'],
        blocks: [
          { type: 'p', text: 'System:' },
          {
            type: 'math',
            tex: '\\dot{x} = \\tfrac{1}{2}x - \\tfrac{1}{4}x^2 - \\tfrac{3}{4}xy, \\qquad \\dot{y} = y - y^2 - xy',
          },
          { type: 'p', text: 'Fixed point $(2, 0)$ — verify by substitution:' },
          {
            type: 'math',
            tex: 'f(2,0) = 1 - 1 - 0 = 0\\checkmark, \\qquad g(2,0) = 0 - 0 - 0 = 0\\checkmark',
          },
          { type: 'p', text: 'Partial derivatives evaluated at $(2, 0)$:' },
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
          { type: 'p', text: 'Jacobian:' },
          {
            type: 'math',
            tex: 'J = \\begin{pmatrix} -\\tfrac{1}{2} & -\\tfrac{3}{2} \\\\ 0 & -1 \\end{pmatrix} \\quad \\leftarrow \\text{lower triangular}',
          },
          { type: 'p', text: 'Eigenvalues = diagonal entries directly:' },
          { type: 'math', tex: '\\lambda_1 = -\\tfrac{1}{2}, \\qquad \\lambda_2 = -1' },
          { type: 'p', text: 'Both negative → Stable node.' },
          {
            type: 'interpret',
            text: 'Trajectories approach $(2, 0)$ monotonically — the system returns to equilibrium after any small perturbation.',
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
            text: 'Before fitting, ask — even with perfect infinite data, could you recover all parameters uniquely? If not, no amount of data or fitting will help. The problem is in the model structure itself.',
          },
        ],
      },
      {
        id: 'ch3-reduction',
        title: 'System Reduction — The Method',
        tags: ['how'],
        blocks: [
          { type: 'p', text: 'Setup: observe $x$ only, $y$ is hidden.' },
          {
            type: 'math',
            tex: '\\dot{x} = f(x, y, \\mathbf{q}), \\qquad \\dot{y} = g(x, y, \\mathbf{q})',
          },
          {
            type: 'steps',
            items: [
              { text: 'Isolate $y$ algebraically from the $\\dot{x}$ equation.' },
              { text: 'Differentiate $\\dot{x}$ to obtain $\\ddot{x}$ — this introduces $\\dot{y}$.' },
              {
                text: 'Substitute $\\dot{y}$ directly from the second equation (do NOT differentiate it again).',
              },
              { text: 'Substitute $y$ from Step 1 → scalar ODE in $x$ only.' },
              {
                text: 'Let $z = \\dot{x}$, rewrite as first-order system:',
                tex: '\\dot{x} = z, \\qquad \\dot{z} = h(x, z, \\mathbf{q})',
              },
              {
                text: 'State initial condition:',
                tex: 'z(0) = \\dot{x}(0) = f(x_0, y_0, \\mathbf{q})',
              },
              {
                text: 'Check — do all parameters appear as independent coefficients? If yes → structurally identifiable.',
              },
            ],
          },
          {
            type: 'trap',
            text: 'The IC $z(0)$ often provides the equation to recover the last parameter. Without it, the system may not be identifiable.',
          },
        ],
      },
      {
        id: 'ch3-ct2',
        title: 'CT2 — Lotka-Volterra Full Reduction',
        tags: ['exam'],
        blocks: [
          {
            type: 'math',
            tex: '\\dot{x} = Ax - Bxy, \\quad x(0)=x_0 \\qquad \\dot{y} = -Cy + Dxy, \\quad y(0)=y_0',
          },
          { type: 'p', text: 'Only $x$ is observed.' },
          { type: 'subheading', text: 'Step 1 — Isolate y:' },
          { type: 'math', tex: 'y = \\frac{Ax - \\dot{x}}{Bx}' },
          { type: 'subheading', text: 'Step 2 — Differentiate ẋ:' },
          { type: 'math', tex: '\\ddot{x} = A\\dot{x} - B\\dot{x}y - Bx\\dot{y}' },
          { type: 'subheading', text: 'Step 3 — Substitute ẏ = −Cy + Dxy:' },
          { type: 'math', tex: '\\ddot{x} = A\\dot{x} - B\\dot{x}y + BCxy - BDx^2y' },
          { type: 'subheading', text: 'Step 4 — Substitute y from Step 1:' },
          {
            type: 'math',
            tex: '\\ddot{x} = \\frac{\\dot{x}^2}{x} + Dx\\dot{x} - C\\dot{x} + ACx - ADx^2',
          },
          { type: 'subheading', text: 'Step 5 — First-order system (z = ẋ):' },
          {
            type: 'math',
            tex: '\\dot{x} = z, \\qquad \\dot{z} = \\frac{z^2}{x} + Dxz - Cz + ACx - ADx^2',
          },
          { type: 'math', tex: 'z(0) = Ax_0 - Bx_0 y_0' },
          {
            type: 'p',
            text: 'Identifiability: ODE coefficients give $D-C$, $AC$, $AD$. IC gives $B$. All four parameters $A, B, C, D$ are independently recoverable.',
          },
          {
            type: 'interpret',
            text: 'Observing predator $x$ alone, with known initial conditions, uniquely determines all four ecological parameters.',
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
            text: 'You have noisy data. The model never fits exactly. Least squares finds parameters that minimise total squared error — squaring removes sign and penalises large errors more than small ones.',
          },
        ],
      },
      {
        id: 'ch4-gauss-newton',
        title: 'Gauss-Newton — Full Structure',
        tags: ['how'],
        blocks: [
          {
            type: 'p',
            text: 'Data: $n$ observations $(t_i, y_i^{\\text{obs}})$. Model: $y = f(t, \\mathbf{q}),\\; \\mathbf{q} \\in \\mathbb{R}^p$.',
          },
          { type: 'subheading', text: 'Residuals:' },
          { type: 'math', tex: 'r_i(\\mathbf{q}) = y_i^{\\text{obs}} - f(t_i, \\mathbf{q})' },
          { type: 'subheading', text: 'Objective function:' },
          {
            type: 'math',
            tex: '\\Phi(\\mathbf{q}) = \\sum_{i=1}^{n} r_i^2 = \\mathbf{r}^\\top \\mathbf{r}',
          },
          { type: 'subheading', text: 'Sensitivity Jacobian ($n \\times p$ matrix):' },
          {
            type: 'math',
            tex: 'J_{ij} = \\frac{\\partial f(t_i, \\mathbf{q})}{\\partial q_j} = S_j(t_i)',
          },
          { type: 'subheading', text: 'Update rule:' },
          {
            type: 'math',
            tex: '\\mathbf{q}_{k+1} = \\mathbf{q}_k + (J^\\top J)^{-1} J^\\top \\mathbf{r}',
          },
          { type: 'p', text: 'Iterate until $\\|\\mathbf{q}_{k+1} - \\mathbf{q}_k\\| < \\varepsilon$.' },
          {
            type: 'trap',
            text: 'Two different $J$ matrices in this course. Ch2 Jacobian = stability matrix $\\partial f/\\partial \\mathbf{x}$ (square, $n \\times n$). Ch4 Jacobian = sensitivity matrix $\\partial f/\\partial \\mathbf{q}$ (rectangular, $n \\times p$). Same letter, completely different objects.',
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
            text: "Newton's method requires $\\nabla^2 \\Phi$ (full Hessian) — expensive. Gauss-Newton approximates:",
          },
          { type: 'math', tex: '\\nabla^2 \\Phi \\approx 2 J^\\top J' },
          {
            type: 'p',
            text: 'Valid when residuals $r_i$ are small (good fit). Only first derivatives needed → solve sensitivity ODEs from Ch5.',
          },
          {
            type: 'interpret',
            text: 'Levenberg-Marquardt blends Gauss-Newton (fast near solution) with gradient descent (robust far away). This is what nls() uses in R.',
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
            text: 'You want $\\partial y/\\partial q$ — how much does output change when parameter $q$ changes? But $y(t)$ is defined implicitly by an ODE. So you differentiate the ODE itself with respect to $q$. This gives a new ODE for $S = \\partial y/\\partial q$. Solve it alongside the original.',
          },
        ],
      },
      {
        id: 'ch5-derivation',
        title: 'Derivation of Sensitivity Equation',
        tags: ['how'],
        blocks: [
          { type: 'p', text: 'Start with:' },
          { type: 'math', tex: '\\frac{dy}{dt} = f(y, q)' },
          { type: 'p', text: 'Differentiate both sides with respect to $q$:' },
          {
            type: 'math',
            tex: '\\frac{d}{dq}\\!\\left[\\frac{dy}{dt}\\right] = \\frac{d}{dq}[f(y,q)]',
          },
          { type: 'p', text: 'Swap order on left (differentiation commutes):' },
          {
            type: 'math',
            tex: '\\frac{d}{dt}\\!\\left[\\frac{\\partial y}{\\partial q}\\right] = \\frac{\\partial f}{\\partial y} \\cdot \\frac{\\partial y}{\\partial q} + \\frac{\\partial f}{\\partial q}',
          },
          { type: 'p', text: 'Define $S(t) = \\partial y/\\partial q$. Result:' },
          {
            type: 'math',
            boxed: true,
            tex: '\\dot{S} = \\frac{\\partial f}{\\partial y} \\cdot S + \\frac{\\partial f}{\\partial q}, \\qquad S(0) = \\frac{\\partial y_0}{\\partial q} = 0',
          },
          {
            type: 'p',
            text: 'Why $S(0) = 0$? The initial condition $y_0$ is a fixed number, independent of $q$ — so its derivative with respect to $q$ is zero.',
          },
          {
            type: 'trap',
            text: 'The right-hand side has TWO terms from the chain rule — explicit $\\partial f/\\partial q$ AND implicit $(\\partial f/\\partial y)(\\partial y/\\partial q)$. Missing the implicit term is the most common error.',
          },
        ],
      },
      {
        id: 'ch5-ct3',
        title: 'CT3 — Full Worked Solution',
        tags: ['exam'],
        blocks: [
          { type: 'math', tex: '\\frac{dy}{dt} = -ky, \\quad y(0) = y_0' },
          { type: 'subheading', text: 'Part (a) — Derive Ṡ where S = ∂y/∂k:' },
          {
            type: 'math',
            tex: '\\frac{d}{dk}[-ky] = -y - k\\frac{\\partial y}{\\partial k}',
          },
          { type: 'math', tex: '\\implies \\dot{S} = -y - kS, \\qquad S(0) = 0' },
          {
            type: 'subheading',
            text: 'Part (b) — Analytic solution (closed form exists, differentiate directly):',
          },
          {
            type: 'math',
            tex: 'y = y_0 e^{-kt} \\implies S(t) = \\frac{\\partial y}{\\partial k} = -y_0 t e^{-kt}',
          },
          { type: 'subheading', text: 'Part (c) — Time of maximum sensitivity, set dS/dt = 0:' },
          {
            type: 'math',
            tex: '\\frac{dS}{dt} = -y_0 e^{-kt} + y_0 kt e^{-kt} = 0 \\implies -1 + kt^* = 0 \\implies t^* = \\frac{1}{k}',
          },
          { type: 'subheading', text: 'Part (d) — Relative sensitivity:' },
          {
            type: 'math',
            tex: '\\sigma(t) = \\frac{k}{y} S(t) = \\frac{k}{y_0 e^{-kt}} \\cdot \\left(-y_0 t e^{-kt}\\right) = -kt',
          },
          {
            type: 'interpret',
            text: '$|\\sigma|$ increases with $t$ → later measurements are more informative about $k$. Measure near $t^* = 1/k$ for the most precise parameter estimate.',
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
            text: 'System: $\\frac{d\\mathbf{y}}{dt} = \\mathbf{f}(\\mathbf{y}, \\mathbf{q}),\\quad \\mathbf{y} \\in \\mathbb{R}^n,\\; \\mathbf{q} \\in \\mathbb{R}^p$.',
          },
          {
            type: 'p',
            text: 'For each parameter $q_j$, define sensitivity vector $\\mathbf{s}_j(t) = \\partial \\mathbf{y}/\\partial q_j \\in \\mathbb{R}^n$:',
          },
          {
            type: 'math',
            tex: '\\dot{\\mathbf{s}}_j = \\frac{\\partial \\mathbf{f}}{\\partial \\mathbf{y}} \\mathbf{s}_j + \\frac{\\partial \\mathbf{f}}{\\partial q_j}, \\qquad \\mathbf{s}_j(0) = \\frac{\\partial \\mathbf{y}_0}{\\partial q_j}',
          },
          {
            type: 'p',
            text: 'Solve all $p$ sensitivity systems alongside the original ODE. Stack columns → Sensitivity Jacobian $J$ for Gauss-Newton fitting (Ch4).',
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
            text: 'PDEs have two independent variables — time and space. MOL strategy: discretise space, leave time continuous. This converts the PDE into a large system of ODEs — then use your existing ODE solver (lsode in R).',
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
            text: 'Discretise $x$: $x_1, x_2, \\ldots, x_n$ with spacing $\\Delta x$. Keep $t$ continuous.',
          },
          {
            type: 'p',
            text: 'Second derivative approximation (finite difference — why this formula?) It is the limit of [forward slope minus backward slope] divided by $\\Delta x$:',
          },
          {
            type: 'math',
            tex: '\\frac{\\partial^2 u}{\\partial x^2} \\approx \\frac{u_{i+1} - 2u_i + u_{i-1}}{\\Delta x^2}',
          },
          { type: 'p', text: 'Result — system of $n$ ODEs:' },
          {
            type: 'math',
            tex: '\\frac{du_i}{dt} = D\\, \\frac{u_{i+1} - 2u_i + u_{i-1}}{\\Delta x^2}, \\qquad i = 1, \\ldots, n',
          },
          {
            type: 'p',
            text: 'Apply boundary conditions at $i=1$ and $i=n$. Solve with lsode() in R.',
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
          {
            type: 'p',
            text: 'Problem: second order in time needs two ICs. Fix: introduce $v = \\partial u/\\partial t$:',
          },
          {
            type: 'math',
            tex: '\\frac{\\partial u}{\\partial t} = v, \\qquad \\frac{\\partial v}{\\partial t} = c^2 \\frac{\\partial^2 u}{\\partial x^2}',
          },
          { type: 'p', text: 'Apply MOL to spatial derivatives:' },
          {
            type: 'math',
            tex: '\\frac{du_i}{dt} = v_i, \\qquad \\frac{dv_i}{dt} = c^2 \\frac{u_{i+1} - 2u_i + u_{i-1}}{\\Delta x^2}',
          },
          {
            type: 'p',
            text: 'ICs: $u(x,0) = \\text{given shape},\\quad v(x,0) = \\partial u/\\partial t\\big|_{t=0} = 0$.',
          },
          {
            type: 'interpret',
            text: 'CT3 Q2 — two Gaussian pulses start at $x = \\pm 30$ with speed $c=1$. They meet at $x=0$ when $t=30$. Physical reasoning: distance = 30, speed = 1, time = 30.',
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
            text: 'As $\\Delta x \\to 0$, error $\\propto \\Delta x^2$ (second-order accurate):',
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
            text: '$10\\times$ smaller $\\Delta x \\implies \\approx 100\\times$ smaller error.',
          },
          {
            type: 'interpret',
            label: 'Exam sentence',
            text: 'As $\\Delta x \\to 0$, the finite difference approximation to $\\partial^2 u/\\partial x^2$ improves, so the numerical solution converges to the analytic solution.',
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
            text: 'Every model omits something. If you ignore this and fit parameters, the fitted parameters absorb the model error — they become biased. Confidence intervals become too narrow, falsely suggesting precision.',
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
              '$f(x_i, \\mathbf{q})$ = computer model (ODE solution)',
              '$\\delta(x_i)$ = model discrepancy (missing physics — systematic)',
              '$\\varepsilon_i$ = measurement noise (iid, mean zero)',
            ],
          },
          {
            type: 'p',
            text: 'If you ignore $\\delta$ and fit $Y_i = f(x_i, \\mathbf{q}) + \\varepsilon_i$, then $\\hat{\\mathbf{q}}$ absorbs $\\delta \\implies$ biased parameters.',
          },
          {
            type: 'interpret',
            text: '$\\delta(x)$ is not random — it is systematic. Example: modelling a nonlinear pendulum as linear. The discrepancy $\\delta$ captures the nonlinear correction your model misses.',
          },
        ],
      },
      {
        id: 'ch7-confidence-ellipses',
        title: 'Confidence Ellipses',
        tags: ['exam'],
        blocks: [
          { type: 'p', text: 'After fitting $\\hat{\\mathbf{q}}$, uncertainty is captured by:' },
          {
            type: 'math',
            tex: '\\text{Cov}(\\hat{\\mathbf{q}}) \\approx \\sigma^2 (J^\\top J)^{-1}, \\qquad \\sigma^2 = \\frac{\\Phi(\\hat{\\mathbf{q}})}{n - p}',
          },
          { type: 'p', text: 'Confidence ellipse — the set of $\\mathbf{q}$ satisfying:' },
          {
            type: 'math',
            tex: '(\\mathbf{q} - \\hat{\\mathbf{q}})^\\top (J^\\top J)(\\mathbf{q} - \\hat{\\mathbf{q}}) \\leq c^2',
          },
          { type: 'p', text: 'Shape tells you:' },
          {
            type: 'list',
            items: [
              'Narrow axis → that parameter combination is well determined',
              'Wide axis → poorly determined',
              'Tilted → parameters are correlated (connects back to identifiability, Ch3)',
            ],
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
