import TagBadge from './TagBadge'
import StepList from './StepList'
import InterpBox from './InterpBox'
import TrapBox from './TrapBox'
import { DisplayMath, InlineMath, RichText } from './MathBlock'

function Table({ headers, rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-max text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="border-b border-slate-200 px-4 py-2 font-semibold text-slate-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="odd:bg-white even:bg-slate-50/60">
              {row.map((cell, ci) => (
                <td key={ci} className="border-b border-slate-100 px-4 py-2 text-slate-700">
                  {typeof cell === 'string' ? cell : <InlineMath tex={cell.tex} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BulletList({ items }) {
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

function Bank({ items }) {
  return (
    <div className="my-5 space-y-4">
      {items.map((item, i) => (
        <InterpBox key={i} label={item.label} tex={item.tex} />
      ))}
    </div>
  )
}

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <RichText text={block.text} className="my-3 block leading-relaxed text-slate-700" />
    case 'subheading':
      return (
        <div className="mt-6 mb-2 text-sm font-semibold text-slate-500">
          <RichText text={block.text} />
        </div>
      )
    case 'math':
      return <DisplayMath tex={block.tex} boxed={block.boxed} />
    case 'steps':
      return <StepList items={block.items} />
    case 'table':
      return <Table headers={block.headers} rows={block.rows} />
    case 'list':
      return <BulletList items={block.items} />
    case 'interpret':
      return <InterpBox text={block.text} />
    case 'trap':
      return <TrapBox text={block.text} />
    case 'bank':
      return <Bank items={block.items} />
    default:
      return null
  }
}

export default function Section({ section }) {
  return (
    <section id={section.id} className="scroll-mt-24 border-b border-slate-100 py-8 last:border-none">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
        {section.tags?.map((tag) => <TagBadge key={tag} tag={tag} />)}
      </div>
      {section.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </section>
  )
}
