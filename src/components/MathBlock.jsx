import katex from 'katex'
import { useMemo } from 'react'

export function InlineMath({ tex }) {
  const html = useMemo(
    () => katex.renderToString(tex, { throwOnError: false, displayMode: false }),
    [tex],
  )
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export function DisplayMath({ tex, boxed = false }) {
  const html = useMemo(
    () => katex.renderToString(tex, { throwOnError: false, displayMode: true }),
    [tex],
  )
  return (
    <div
      className={
        boxed
          ? 'my-5 overflow-x-auto rounded-lg border-2 border-amber-300 bg-amber-50/60 px-4 py-4'
          : 'my-5 overflow-x-auto'
      }
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

/**
 * Renders prose that may contain inline math delimited by single $...$.
 */
export function RichText({ text, className = '' }) {
  const parts = useMemo(() => {
    const segments = []
    const regex = /\$([^$]+)\$/g
    let lastIndex = 0
    let match
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'text', value: text.slice(lastIndex, match.index) })
      }
      segments.push({ type: 'math', value: match[1] })
      lastIndex = regex.lastIndex
    }
    if (lastIndex < text.length) {
      segments.push({ type: 'text', value: text.slice(lastIndex) })
    }
    return segments
  }, [text])

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.type === 'math' ? (
          <InlineMath key={i} tex={part.value} />
        ) : (
          <span key={i}>{part.value}</span>
        ),
      )}
    </span>
  )
}
