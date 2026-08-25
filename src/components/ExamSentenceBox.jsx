import { RichText } from './MathBlock'

export default function ExamSentenceBox({ text }) {
  return (
    <div className="my-5 rounded-md border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
      <div className="mb-1 text-xs font-bold tracking-wide text-amber-600 uppercase">
        Exam Sentence
      </div>
      <RichText text={text} className="leading-relaxed text-amber-900 italic" />
    </div>
  )
}
