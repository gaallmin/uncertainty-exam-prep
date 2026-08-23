export default function Sidebar({ chapters, activeId, onSelect, visited }) {
  return (
    <>
      <nav className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-y-auto px-4 py-6">
          <div className="mb-6 px-2">
            <div className="text-xs font-bold tracking-widest text-slate-400">ACM41000</div>
            <div className="text-sm font-semibold text-slate-700">Uncertainty Quantification</div>
          </div>
          <ul className="space-y-1">
            {chapters.map((ch) => (
              <li key={ch.id}>
                <button
                  onClick={() => onSelect(ch.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    activeId === ch.id
                      ? 'bg-slate-900 font-semibold text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{ch.navLabel ?? ch.title}</span>
                  {visited.has(ch.id) && (
                    <span className={activeId === ch.id ? 'text-emerald-300' : 'text-emerald-500'}>
                      ✓
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="flex gap-1.5 overflow-x-auto px-3 py-2">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onSelect(ch.id)}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                activeId === ch.id
                  ? 'bg-slate-900 font-semibold text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {visited.has(ch.id) && <span className="mr-1 text-emerald-400">✓</span>}
              {ch.navLabel ?? ch.title}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
