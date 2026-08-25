import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import ChapterView from './components/ChapterView'
import ProfChrisProblemsView from './components/ProfChrisProblemsView'
import { chapters } from './data/chapters'

export default function App() {
  const [activeId, setActiveId] = useState(chapters[0].id)
  const [visited, setVisited] = useState(() => new Set([chapters[0].id]))

  const activeChapter = chapters.find((c) => c.id === activeId) ?? chapters[0]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeId])

  const handleSelect = (id) => {
    setActiveId(id)
    setVisited((prev) => new Set(prev).add(id))
  }

  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      <Sidebar chapters={chapters} activeId={activeId} onSelect={handleSelect} visited={visited} />
      <main className="min-w-0 flex-1">
        {activeChapter.custom === 'prof-chris-problems' ? (
          <ProfChrisProblemsView />
        ) : (
          <ChapterView chapter={activeChapter} />
        )}
      </main>
    </div>
  )
}
