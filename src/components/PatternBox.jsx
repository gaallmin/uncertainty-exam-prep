import { RichText } from './MathBlock'

export default function PatternBox({ text }) {
  return (
    <div className="my-5 rounded-md border-l-4 border-emerald-400 bg-emerald-50 px-4 py-3">
      <div className="mb-1 text-xs font-bold tracking-wide text-emerald-600 uppercase">
        The Pattern
      </div>
      <RichText text={text} className="leading-relaxed text-emerald-900" />
    </div>
  )
}
