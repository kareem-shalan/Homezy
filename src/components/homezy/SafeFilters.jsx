const SafeFilters = ({ filters, filterTypes = [], locationLabel, onFilterChange }) => {
  return (
    <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-linear-to-r from-slate-950 via-blue-950 to-slate-900 p-5 text-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Smart filters</p>
            <h3 className="mt-1 text-2xl font-black">Refine your match</h3>
            <p className="mt-2 text-sm text-slate-300">
              Local filters only{locationLabel ? `, centered around ${locationLabel}` : ''}.
            </p>
          </div>
          <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {filterTypes.length} types
          </span>
        </div>
      </div>

      <div className="grid gap-3 p-5 md:grid-cols-3">
        <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Min price</span>
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(event) => onFilterChange('minPrice', event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="0"
          />
        </label>

        <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Max price</span>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(event) => onFilterChange('maxPrice', event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Any"
          />
        </label>

        <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Type</span>
          <select
            value={filters.type}
            onChange={(event) => onFilterChange('type', event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {filterTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All types' : type}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

export default SafeFilters
