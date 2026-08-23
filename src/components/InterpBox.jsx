import { InlineMath, RichText } from './MathBlock'

export default function InterpBox({ text, tex, label }) {
  return (
    <div className="my-5 rounded-md border-l-4 border-purple-400 bg-purple-50 px-4 py-3">
      <div className="mb-1 text-xs font-bold tracking-wide text-purple-500 uppercase">
        {label ?? 'Interpret'}
      </div>
      {text && <RichText text={text} className="leading-relaxed text-purple-900" />}
      {tex && (
        <div className="text-purple-900">
          <InlineMath tex={tex} />
        </div>
      )}
    </div>
  )
}
