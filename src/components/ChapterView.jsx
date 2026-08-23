import Section from './Section'

export default function ChapterView({ chapter }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <div className="mb-8">
        {chapter.number != null && (
          <div className="mb-1 text-sm font-semibold tracking-wide text-slate-400">
            CHAPTER {chapter.number}
          </div>
        )}
        <h1 className="text-3xl font-bold text-slate-900">{chapter.title}</h1>
      </div>
      <div>
        {chapter.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}
