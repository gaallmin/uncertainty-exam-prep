import { useState } from 'react'
import { Block } from './Section'
import { RichText } from './MathBlock'
import PatternBox from './PatternBox'
import ExamSentenceBox from './ExamSentenceBox'

function QuestionBox({ text }) {
  return (
    <div className="my-4 whitespace-pre-line rounded-md border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm leading-relaxed text-slate-700">
      {text}
    </div>
  )
}

export default function ProblemCard({ problem, reviewed, onToggleReviewed }) {
  const [copied, setCopied] = useState(false)

  const handleVariant = async () => {
    try {
      await navigator.clipboard.writeText(problem.variantPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <article
      id={problem.id}
      className="scroll-mt-24 my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-white">
            {problem.source}
          </span>
          <h3 className="text-lg font-bold text-slate-900">{problem.topic}</h3>
        </div>
        <label className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-500">
          <input
            type="checkbox"
            checked={reviewed}
            onChange={onToggleReviewed}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          Reviewed
        </label>
      </div>

      <QuestionBox text={problem.question} />

      <div className="my-4 rounded-md bg-blue-50 px-4 py-2.5 text-sm">
        <span className="font-bold text-blue-700">Problem type: </span>
        <RichText text={problem.problemType} className="text-blue-900" />
      </div>

      <div>
        {problem.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      <PatternBox text={problem.pattern} />
      <ExamSentenceBox text={problem.examSentence} />

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleVariant}
          className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Try a variant →
        </button>
        {copied && (
          <span className="text-xs font-medium text-emerald-600">
            Copied — paste into chat
          </span>
        )}
      </div>
    </article>
  )
}
