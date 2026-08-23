import { DisplayMath, InlineMath, RichText } from './MathBlock'

export default function StepList({ items }) {
  return (
    <ol className="my-5 space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            {item.text && <RichText text={item.text} className="text-slate-800" />}
            {item.tex &&
              (item.inline ? (
                <div className="mt-1 overflow-x-auto">
                  <InlineMath tex={item.tex} />
                </div>
              ) : (
                <DisplayMath tex={item.tex} />
              ))}
            {item.note && (
              <RichText text={item.note} className="mt-1 block text-sm text-slate-500" />
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
