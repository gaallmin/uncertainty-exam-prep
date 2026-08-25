import { useMemo, useState } from 'react'
import ProblemCard from './ProblemCard'
import { RichText } from './MathBlock'
import { decisionGuide, twoAlwaysSignals, problemGroups } from '../data/profChrisProblems'

function DecisionGuide() {
  return (
    <div className="mb-10 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="mb-1 text-lg font-bold text-slate-900">
        How to identify problem type in 10 seconds
      </h2>
      <p className="mb-4 text-sm text-slate-600">
        Read the question. Find the first key signal below and jump straight to that skeleton.
      </p>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-max text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="border-b border-slate-200 px-4 py-2 font-semibold text-slate-700">
                Signal
              </th>
              <th className="border-b border-slate-200 px-4 py-2 font-semibold text-slate-700">
                Problem type / skeleton
              </th>
            </tr>
          </thead>
          <tbody>
            {decisionGuide.map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-slate-50/60">
                <td className="border-b border-slate-100 px-4 py-2 font-mono text-xs text-slate-700">
                  {row.signal}
                </td>
                <td className="border-b border-slate-100 px-4 py-2 text-slate-700">
                  <RichText text={row.type} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 rounded-md border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
        <div className="mb-1 text-xs font-bold tracking-wide text-amber-600 uppercase">
          Two signals that always mean the same thing
        </div>
        <ul className="list-disc space-y-1 pl-5 text-amber-900">
          {twoAlwaysSignals.map((s, i) => (
            <li key={i}>
              <RichText text={s} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ProfChrisProblemsView() {
  const allProblems = useMemo(() => problemGroups.flatMap((g) => g.problems), [])
  const [reviewed, setReviewed] = useState(() => new Set())

  const toggle = (id) => {
    setReviewed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <div className="mb-6">
        <div className="mb-1 text-sm font-semibold tracking-wide text-slate-400">
          EVERY REAL QUESTION, SOLVED
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Prof Chris Problems</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Every actual question from class tests and exercises, solved step by step using the
          exam skeleton structure. Each card teaches the reusable pattern, not just the answer.
        </p>
        <div className="mt-4 inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white">
          Reviewed {reviewed.size}/{allProblems.length} problems
        </div>
      </div>

      <DecisionGuide />

      {problemGroups.map((group) => (
        <div key={group.id} className="mb-8">
          <h2 className="mb-1 border-b border-slate-200 pb-2 text-sm font-bold tracking-wide text-slate-400 uppercase">
            {group.label}
          </h2>
          {group.problems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              reviewed={reviewed.has(problem.id)}
              onToggleReviewed={() => toggle(problem.id)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
