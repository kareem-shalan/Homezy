const modes = [
  {
    id: 'self',
    label: 'Search by Myself',
    description: 'Choose your own category-specific housing options.',
    eyebrow: 'Custom path',
    accent: 'from-slate-900 to-blue-700',
  },
  {
    id: 'university',
    label: 'Search by University',
    description: 'Pick a university and show nearby listings on the map.',
    eyebrow: 'Campus path',
    accent: 'from-blue-600 to-cyan-400',
  },
]

const SafeModeSelector = ({ selectedMode, onModeSelect }) => {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Step 2</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">Choose search mode</h3>
        </div>
        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
          {selectedMode ? 'Path selected' : '2 options'}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => onModeSelect(mode.id)}
            className={[
              'group relative overflow-hidden rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-100',
              selectedMode === mode.id ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100' : 'border-slate-200 bg-slate-50',
            ].join(' ')}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${mode.accent}`} />
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{mode.eyebrow}</p>
            <h4 className="mt-2 text-lg font-black text-slate-950">{mode.label}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">{mode.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs font-bold">
              <span className={selectedMode === mode.id ? 'text-blue-700' : 'text-slate-400'}>
                {selectedMode === mode.id ? 'Active route' : 'Tap to continue'}
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-slate-500 shadow-sm transition group-hover:translate-x-0.5">
                &gt;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SafeModeSelector
