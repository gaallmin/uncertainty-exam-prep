import { useEffect, useState } from 'react'
import { DisplayMath, InlineMath, RichText } from './MathBlock'
import StepList from './StepList'

function Prose({ text }) {
  return <RichText text={text} className="my-3 block leading-relaxed text-slate-700" />
}

function Subheading({ text }) {
  return (
    <div className="mt-6 mb-2 text-sm font-semibold text-slate-500">
      <RichText text={text} />
    </div>
  )
}

function Bullets({ items }) {
  return (
    <ul className="my-4 list-disc space-y-1.5 pl-5 text-slate-700">
      {items.map((item, i) => (
        <li key={i}>
          <RichText text={item} />
        </li>
      ))}
    </ul>
  )
}

function Callout({ label, color, children }) {
  const colors = {
    red: 'border-red-400 bg-red-50 text-red-500',
    blue: 'border-blue-400 bg-blue-50 text-blue-600',
  }
  const bodyColors = {
    red: 'text-red-900',
    blue: 'text-blue-900',
  }
  return (
    <div className={`my-4 rounded-md border-l-4 px-4 py-3 ${colors[color]}`}>
      <div className="mb-1 text-xs font-bold tracking-wide uppercase">{label}</div>
      <div className={`leading-relaxed ${bodyColors[color]}`}>{children}</div>
    </div>
  )
}

function MistakeBox({ text }) {
  return (
    <Callout label="🔴 가장 흔한 실수" color="red">
      <RichText text={text} />
    </Callout>
  )
}

function CheckLine({ ok, tex, note }) {
  return (
    <div
      className={`my-1.5 flex flex-wrap items-center gap-2 rounded-md px-3 py-2 text-sm ${
        ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
      }`}
    >
      <span>{ok ? '✅' : '❌'}</span>
      <InlineMath tex={tex} />
      <span>{note}</span>
    </div>
  )
}

function TemplateBox({ label, text }) {
  return (
    <div className="my-4 rounded-md border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
      <div className="mb-1 text-xs font-bold tracking-wide text-amber-600 uppercase">{label}</div>
      <RichText
        text={text}
        className="block leading-relaxed whitespace-pre-line text-amber-900 italic"
      />
    </div>
  )
}

const templates = [
  {
    label: 'STABILITY',
    text: 'Both eigenvalues $\\lambda_1 = [\\cdot]$, $\\lambda_2 = [\\cdot]$ are real and negative,\nso $(x^*, y^*)$ is a stable node —\ntrajectories approach the fixed point monotonically.',
  },
  {
    label: 'SPIRAL',
    text: 'Eigenvalues are complex with negative real part,\nso $(x^*, y^*)$ is a stable spiral —\ntrajectories wind toward the fixed point.',
  },
  {
    label: 'SADDLE',
    text: '$\\det(J) < 0$, so $(x^*, y^*)$ is a saddle point —\nstable along one direction, unstable along the other.',
  },
  {
    label: 'SENSITIVITY PEAK',
    text: '$|S(t)|$ peaks at $t^* = 1/k$ — this is the optimal time\nto measure $y$ for most precise estimation of $k$.',
  },
  {
    label: 'RELATIVE SENSITIVITY',
    text: '$\\sigma(t) = -kt$ — as $t$ increases, measurements\nbecome more informative about $k$.',
  },
  {
    label: 'IDENTIFIABILITY',
    text: 'All parameters appear as independent coefficients\nin the reduced ODE and initial conditions —\nthe system is structurally identifiable from $x$ data alone.',
  },
  {
    label: 'MOL CONVERGENCE',
    text: 'As $\\Delta x \\to 0$, the finite difference approximation\nimproves → numerical solution converges to analytic solution.\nError $\\propto \\Delta x^2$ (second-order accurate).',
  },
  {
    label: 'FORGERY',
    text: '$\\lambda y_0 \\approx 98{,}147$ far exceeds the expected range $0$–$200$\nfor a 300-year-old painting → conclusively a forgery.',
  },
]

function CollapsibleSection({ id, emoji, title, opened, onOpen, accent = 'red', children }) {
  const [expanded, setExpanded] = useState(false)
  const borderColor = accent === 'amber' ? 'border-l-amber-400' : 'border-l-red-400'

  const toggle = () => {
    setExpanded((e) => !e)
    if (!opened) onOpen(id)
  }

  return (
    <div
      className={`mb-4 overflow-hidden rounded-xl border border-l-4 border-slate-200 bg-white ${borderColor}`}
    >
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="font-bold text-slate-900">
          {emoji} {title}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {opened && <span>✅</span>}
          <span className="text-xs text-slate-400">{expanded ? '▲' : '▼'}</span>
        </span>
      </button>
      {expanded && <div className="border-t border-slate-100 px-5 pt-3 pb-5">{children}</div>}
    </div>
  )
}

function CountdownTimer() {
  const [targetTime, setTargetTime] = useState(null)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSetTime = () => {
    const input = window.prompt('시험까지 몇 시간 남았나요? (예: 3 또는 2.5)')
    if (input === null) return
    const hours = parseFloat(input)
    if (!Number.isNaN(hours) && hours > 0) {
      setTargetTime(Date.now() + hours * 3600 * 1000)
    }
  }

  let label = '⏰ 클릭해서 시험 시간 설정'
  let urgent = false
  if (targetTime != null) {
    const diffMs = targetTime - now
    if (diffMs <= 0) {
      label = '⏰ 시험 시간입니다!'
      urgent = true
    } else {
      const totalMinutes = Math.floor(diffMs / 60000)
      const hrs = Math.floor(totalMinutes / 60)
      const mins = totalMinutes % 60
      label = `시험까지 ${hrs}시간 ${mins}분`
      urgent = totalMinutes < 60
    }
  }

  return (
    <button
      onClick={handleSetTime}
      className={`mb-6 w-full rounded-xl border-2 px-5 py-4 text-center text-2xl font-extrabold transition ${
        urgent
          ? 'animate-pulse border-red-500 bg-red-50 text-red-600'
          : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  )
}

export default function CramView() {
  const [opened, setOpened] = useState(() => new Set())

  const markOpened = (id) => {
    setOpened((prev) => new Set(prev).add(id))
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 pb-28 sm:px-10">
      <div className="mb-6">
        <div className="mb-1 text-sm font-semibold tracking-wide text-slate-400">
          마지막 순간 정리
        </div>
        <h1 className="text-3xl font-bold text-slate-900">🚨 3시간 크램</h1>
      </div>

      <CountdownTimer />

      <div className="mb-6 inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white">
        {opened.size}/6 섹션 확인함
      </div>

      <CollapsibleSection
        id="s1"
        emoji="🔴"
        title="d 표기법 — 제일 헷갈리는 것"
        opened={opened.has('s1')}
        onOpen={markOpened}
      >
        <Prose text="$\frac{dR}{dS}$, $R'$, $\dot{R}$ → 모두 같은 말. “R을 S로 미분”" />

        <Subheading text="분리변수 과정 — 왜 dR이 위로 가나" />
        <Prose text="출발:" />
        <DisplayMath tex="\frac{dR}{dS} = n\frac{R}{S}" />
        <Prose text="Step 1: 양변을 R로 나누기" />
        <DisplayMath tex="\frac{1}{R}\frac{dR}{dS} = \frac{n}{S}" />
        <Prose text="Step 2: 양변에 dS 곱하기" />
        <DisplayMath tex="\frac{dR}{R} = n\frac{dS}{S}" />
        <Prose text="→ dR은 원래 분자에 있었고, R은 나눠서 분모로 내려온 것." />
        <Prose text="→ dS는 원래 분모에 있었는데, 곱해서 오른쪽 분자로 올라온 것." />

        <Subheading text="OK vs NOT OK — 이것만 기억" />
        <CheckLine ok tex="\frac{dR}{dS}" note=": S로 미분. OK" />
        <CheckLine ok tex="\frac{dR}{R}" note=": dR이 위, R이 아래. OK" />
        <CheckLine ok tex="dR = n\frac{R}{S}dS" note=": dS를 위로 올린 것. OK" />
        <CheckLine ok={false} tex="\frac{S}{dS}" note=": 변화량이 분모에 단독으로. 불가능" />
        <CheckLine ok={false} tex="\frac{1}{dR}" note=": 변화량으로 나누기. 불가능" />
        <CheckLine
          ok={false}
          tex="\frac{dR \cdot dS}{\text{anything}}"
          note=": d끼리 곱하기. 불가능"
        />

        <Callout label="규칙" color="blue">
          <RichText text="$d$가 붙은 것은 분자에만 단독으로 올 수 있어. 적분 기호 $\int (\cdot)\, dR$ 의 $dR$이랑 같은 역할." />
        </Callout>

        <Subheading text="저 적분은 t에 대한 적분이 아니야" />
        <Prose text="$\int \frac{dR}{R}$ = R에 대한 적분 = $\ln|R|$" />
        <Prose text="$\int \frac{dS}{S}$ = S에 대한 적분 = $\ln|S|$" />
        <Prose text="각각 자기 변수에 대해 적분하는 것." />
      </CollapsibleSection>

      <CollapsibleSection
        id="s2"
        emoji="🔴"
        title="Integrating Factor — 왜 μ를 곱하는가"
        opened={opened.has('s2')}
        onOpen={markOpened}
      >
        <Prose text="문제:" />
        <DisplayMath tex="\frac{dy}{dt} + P(t)y = Q(t)" />
        <Prose text="→ 분리변수 불가 (y와 t가 더하기로 엮여있음)" />
        <Prose text="→ 직접 적분 불가 (y가 우변에 있어서 순환)" />
        <Prose text="아이디어: 왼쪽을 “하나의 미분”으로 만들면 바로 적분 가능." />

        <Subheading text="곱의 미분법 (이미 알고 있는 것)" />
        <DisplayMath tex="\frac{d}{dt}(\mu y) = \frac{d\mu}{dt} y + \mu \frac{dy}{dt}" />
        <Prose text="우리 왼쪽 $\mu\frac{dy}{dt} + \mu P(t)y$와 비교:" />
        <Prose text="두 번째 항을 맞추려면: $\frac{d\mu}{dt} = \mu P(t)$" />
        <Prose text="이 조건을 선택하는 순간 왼쪽이 $\frac{d}{dt}(\mu y)$가 됨." />

        <Subheading text="$\frac{d\mu}{dt} = \mu P(t)$ 풀기 (분리변수)" />
        <DisplayMath tex="\frac{d\mu}{\mu} = P(t)dt" />
        <DisplayMath tex="\mu = e^{\int P(t)dt}" />

        <Subheading text="결과" />
        <DisplayMath tex="\frac{d}{dt}(\mu y) = \mu Q(t)" />
        <DisplayMath tex="\mu y = \int \mu Q(t)dt + C" />
        <DisplayMath tex="y = \frac{1}{\mu}\left[\int \mu Q(t)dt + C\right]" />

        <Subheading text="Ex2 Painting Forgery에 적용" />
        <Prose text="$\frac{dy}{dt} + \lambda y = r$ → $P(t) = \lambda$, $Q(t) = r$" />
        <Prose text="$\mu = e^{\lambda t}$" />
        <DisplayMath tex="\frac{d}{dt}(e^{\lambda t}y) = re^{\lambda t}" />
        <DisplayMath tex="e^{\lambda t}y = \frac{r}{\lambda}e^{\lambda t} + C" />
        <DisplayMath tex="y = \frac{r}{\lambda} + Ce^{-\lambda t}" />
        <Prose text="Back-calculation: $\lambda y_0 \approx 98{,}147 \gg 200$ → 위조!" />
      </CollapsibleSection>

      <CollapsibleSection
        id="s3"
        emoji="🔴"
        title="Jacobian — 왜 고정점에서 계산하나"
        opened={opened.has('s3')}
        onOpen={markOpened}
      >
        <Prose text="1D 비유 (이미 아는 것):" />
        <DisplayMath tex="f(x) \approx f(x^*) + f'(x^*)(x-x^*)" />
        <Prose text="→ $f'(x^*)$가 기울기 = 하나의 숫자" />

        <Subheading text="2D로 확장" />
        <Prose text="시스템 $\dot{x}=f(x,y)$, $\dot{y}=g(x,y)$에서 “기울기”는 숫자 하나가 아니라 4개의 편미분 → 행렬이 됨" />
        <DisplayMath tex="J = \begin{pmatrix} \dfrac{\partial f}{\partial x} & \dfrac{\partial f}{\partial y} \\[4pt] \dfrac{\partial g}{\partial x} & \dfrac{\partial g}{\partial y} \end{pmatrix}\Bigg|_{(x^*,y^*)}" />

        <Subheading text="왜 고정점에서 계산하나?" />
        <Prose text="편미분을 하면 x, y가 있는 식이 나와." />
        <Prose text="고정점 대입 전 = 함수 (숫자가 아님)" />
        <Prose text="고정점 대입 후 = 숫자 행렬 → eigenvalue 계산 가능" />

        <MistakeBox text="편미분을 구하고 고정점을 안 대입하는 것. 반드시: 미분 먼저 → 그 다음 $(x^*,y^*)$ 대입." />

        <Subheading text="Triangular matrix 단축키" />
        <DisplayMath tex="J = \begin{pmatrix} a & b \\ 0 & d \end{pmatrix}" />
        <Prose text="→ eigenvalue = $a$, $d$ (대각선 바로 읽기). 이차방정식 풀 필요 없음." />

        <Subheading text="Stability 판단 (순서대로)" />
        <StepList
          items={[
            { text: '$\\det(J) < 0$ → Saddle. 끝.' },
            { text: '$\\text{tr}(J) < 0$, $\\det > 0$ → Stable (node or spiral)' },
            { text: '$\\Delta = \\text{tr}^2 - 4\\det > 0$ → Node (실수 eigenvalue)' },
            { text: '$\\Delta < 0$ → Spiral (복소수 eigenvalue)' },
          ]}
        />

        <Subheading text="고등학교 연결" />
        <Bullets
          items={[
            'tr(J) = 대각합 = $\\lambda_1 + \\lambda_2$',
            'det(J) = 행렬식 = $\\lambda_1 \\lambda_2$',
            '$\\Delta$ = 판별식 ($b^2-4ac$와 같은 역할)',
          ]}
        />
      </CollapsibleSection>

      <CollapsibleSection
        id="s4"
        emoji="🔴"
        title="Sensitivity — 왜 ODE를 미분하나"
        opened={opened.has('s4')}
        onOpen={markOpened}
      >
        <Prose text="목표: $S(t) = \frac{\partial y}{\partial k}$ — 파라미터가 바뀌면 y가 얼마나 바뀌나?" />

        <Subheading text="왜 직접 못 구하나?" />
        <Prose text="y(t)가 공식이 아니라 ODE로 정의돼 있어서. → ODE 자체를 k로 미분해야 함." />

        <Subheading text="유도" />
        <DisplayMath tex="\frac{dy}{dt} = f(y, k)" />
        <Prose text="양변을 k로 미분:" />
        <DisplayMath tex="\frac{d}{dk}\left[\frac{dy}{dt}\right] = \frac{d}{dk}[f(y,k)]" />
        <Prose text="왼쪽: 순서 바꾸기 (commute)" />
        <DisplayMath tex="\frac{d}{dt}\left[\frac{\partial y}{\partial k}\right] = \frac{\partial f}{\partial y}\cdot\frac{\partial y}{\partial k} + \frac{\partial f}{\partial k}" />
        <Prose text="$S = \frac{\partial y}{\partial k}$로 정의하면:" />
        <DisplayMath tex="\dot{S} = \frac{\partial f}{\partial y}\cdot S + \frac{\partial f}{\partial k}, \quad S(0)=0" />

        <MistakeBox text="우변 미분할 때 chain rule을 빠뜨리는 것. $f(y,k)$를 k로 미분하면 두 항: explicit $\frac{\partial f}{\partial k}$ + implicit $\frac{\partial f}{\partial y}\cdot S$" />

        <Subheading text="CT3 예제" />
        <Prose text="$\frac{dy}{dt} = -ky$, $S = \frac{\partial y}{\partial k}$" />
        <DisplayMath tex="\frac{d}{dk}[-ky] = -y - k\frac{\partial y}{\partial k}" />
        <Prose text="→ $\dot{S} = -y - kS$, $S(0)=0$" />
        <Prose text="Analytic shortcut (공식 있을 때): $y = y_0 e^{-kt}$ → 직접 미분:" />
        <DisplayMath tex="S(t) = \frac{\partial y}{\partial k} = -y_0 t e^{-kt}" />
        <Prose text="$t^*$ 찾기: $\frac{dS}{dt}=0$ → $t^* = \frac{1}{k}$" />
        <Prose text="Relative sensitivity: $\sigma = \frac{k}{y}S = -kt$ → t가 클수록 k를 더 정확하게 측정 가능" />
      </CollapsibleSection>

      <CollapsibleSection
        id="s5"
        emoji="🔴"
        title="System Reduction — 왜 미분하고 대입하나"
        opened={opened.has('s5')}
        onOpen={markOpened}
      >
        <Prose text="목표: 2개 변수 → 1개 변수로 줄이기 (observable만 남기기)" />

        <Subheading text="왜 필요한가?" />
        <Prose text="x만 측정 가능하고 y는 모를 때. y가 들어있으면 fitting 불가. → y를 완전히 없애야 함." />

        <Subheading text="왜 ẋ을 미분하나?" />
        <Prose text="$\dot{x} = f(x,y)$에 y가 있어. $\dot{x}$를 미분하면 $\dot{x}y$가 나오고, 그게 $\dot{y} = g(x,y)$로 대체 가능. → y와 $\dot{y}$ 둘 다 x와 $\dot{x}$로 표현 가능 → y 완전 제거." />

        <Subheading text="CT2 순서" />
        <StepList
          items={[
            { text: '$\\dot{x} = Ax - Bxy$ → $y = \\dfrac{Ax-\\dot{x}}{Bx}$' },
            { text: '$\\ddot{x}$를 구함 ($\\dot{x}$ 미분, $\\dot{y}$ 나옴)' },
            { text: '$\\dot{y} = -Cy + Dxy$ 대입' },
            { text: '$y = \\dfrac{Ax-\\dot{x}}{Bx}$ 대입' },
            { text: '$z = \\dot{x}$로 치환 → first-order system' },
            { text: '$z(0) = Ax_0 - Bx_0y_0$' },
          ]}
        />

        <MistakeBox text="y를 없애는 게 목표인데 $\dot{y}$ 식을 또 미분하는 것. $\dot{y}$는 주어진 식에서 바로 가져와. 미분 금지." />

        <Subheading text="Identifiability" />
        <Prose text="scalar ODE의 계수들 → 파라미터 조합. IC z(0) → 마지막 파라미터 복원. 모든 파라미터가 독립적으로 나오면 → identifiable" />
      </CollapsibleSection>

      <CollapsibleSection
        id="s6"
        emoji="🟡"
        title="시험 답안 템플릿 (외워야 하는 문장들)"
        opened={opened.has('s6')}
        onOpen={markOpened}
        accent="amber"
      >
        {templates.map((t) => (
          <TemplateBox key={t.label} label={t.label} text={t.text} />
        ))}
      </CollapsibleSection>

      <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 py-3 text-center text-lg font-bold text-slate-900 backdrop-blur md:left-64">
        시험 화이팅! 🔥
      </div>
    </div>
  )
}
