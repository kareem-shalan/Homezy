import { universities } from '../../data/homezy/universities'

const SafeUniversitySelect = ({ selectedUniversityId, onUniversitySelect }) => {
  return (
    <div className="rounded-4xl border border-slate-200 bg-linear-to-br from-white to-blue-50/60 p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Step 3</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">Choose university</h3>
        </div>
        <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm">
          {selectedUniversityId ? 'Campus locked' : `${universities.length} campuses`}
        </span>
      </div>

      <label className="block">
        <span className="text-sm font-bold text-slate-700">University</span>
        <select
          value={selectedUniversityId || ''}
          onChange={(event) => onUniversitySelect(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Select a university</option>
          {universities.map((university) => (
            <option key={university.id} value={university.id}>
              {university.name} - {university.city}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {universities.slice(0, 4).map((university) => (
          <button
            key={university.id}
            type="button"
            onClick={() => onUniversitySelect(university.id)}
            className={[
              'rounded-2xl border px-3 py-2 text-left text-xs font-bold transition hover:-translate-y-0.5 hover:shadow-md',
              selectedUniversityId === university.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-600',
            ].join(' ')}
          >
            {university.name}
            <span className="block text-[11px] font-semibold text-slate-400">{university.city}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SafeUniversitySelect
