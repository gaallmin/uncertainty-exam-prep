const TAG_STYLES = {
  why: 'bg-blue-50 text-blue-700 ring-blue-200',
  how: 'bg-green-50 text-green-700 ring-green-200',
  trap: 'bg-red-50 text-red-700 ring-red-200',
  exam: 'bg-amber-50 text-amber-700 ring-amber-200',
  interpret: 'bg-purple-50 text-purple-700 ring-purple-200',
}

const TAG_LABELS = {
  why: 'Why',
  how: 'How',
  trap: 'Trap',
  exam: 'Exam',
  interpret: 'Interpret',
}

export default function TagBadge({ tag }) {
  const style = TAG_STYLES[tag] ?? 'bg-slate-100 text-slate-600 ring-slate-200'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style}`}
    >
      {TAG_LABELS[tag] ?? tag}
    </span>
  )
}
