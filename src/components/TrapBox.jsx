import { RichText } from './MathBlock'

export default function TrapBox({ text }) {
  return (
    <div className="my-5 rounded-md border-l-4 border-red-400 bg-red-50 px-4 py-3">
      <div className="mb-1 text-xs font-bold tracking-wide text-red-500 uppercase">Trap</div>
      <RichText text={text} className="leading-relaxed text-red-900" />
    </div>
  )
}
