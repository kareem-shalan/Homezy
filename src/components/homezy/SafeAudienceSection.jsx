import { useAudienceFlow } from '../../hooks/homezy/useAudienceFlow'
import SafeFilters from './SafeFilters'
import SafeListingGrid from './SafeListingGrid'
import SafeMapView from './SafeMapView'
import SafeModeSelector from './SafeModeSelector'
import SafeOptions from './SafeOptions'
import SafeUniversitySelect from './SafeUniversitySelect'
import ScaleHover from './animations/ScaleHover'
import SlideUp from './animations/SlideUp'

const categories = [
  {
    id: 'students',
    title: 'Students',
    description: 'University-centered housing, coliving, share-time stays, and hotels.',
    metric: 'Campus-ready',
    accent: 'from-blue-500 to-cyan-400',
    initial: 'S',
  },
  {
    id: 'families',
    title: 'Families',
    description: 'Buy or rent family-focused homes with safe neighborhoods and amenities.',
    metric: 'Secure living',
    accent: 'from-emerald-500 to-teal-400',
    initial: 'F',
  },
  {
    id: 'foreigners',
    title: 'Foreigners',
    description: 'Relocation, work, student, and tourism-ready housing flows.',
    metric: 'Relocation flow',
    accent: 'from-violet-500 to-fuchsia-400',
    initial: 'G',
  },
]

const getStepStatus = (isActive) => (isActive ? 'Active' : 'Ready')

const SafeAudienceSection = () => {
  const flow = useAudienceFlow()

  return (
    <section className="relative w-full overflow-hidden rounded-4xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Audience Flow
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Category to listings</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            A premium multi-step search that guides each audience from intent to verified listings and map-ready results.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Local filters', 'Map markers', 'Smart categories'].map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {item}
              </span>
            ))}
          </div>
        </div>

        {flow.category ? (
          <button
            type="button"
            onClick={flow.resetFlow}
            className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
          >
            Reset
          </button>
        ) : null}
      </div>

      <div className="relative mt-6 rounded-4xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-blue-50/60 p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Step 1</p>
            <h3 className="mt-1 text-2xl font-black text-slate-950">Choose category</h3>
          </div>
          <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm">
            {getStepStatus(Boolean(flow.category))}
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {categories.map((category, index) => (
            <SlideUp key={category.id} delay={index * 0.06}>
              <ScaleHover glow>
                <button
                  type="button"
                  onClick={() => flow.selectCategory(category.id)}
                  className={[
                    'group relative h-full overflow-hidden rounded-3xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-100',
                    flow.category === category.id
                      ? 'border-blue-500 bg-white shadow-xl shadow-blue-100'
                      : 'border-slate-200 bg-white/90 shadow-sm hover:border-blue-200',
                  ].join(' ')}
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${category.accent}`} />
                  <div className="flex items-start justify-between gap-3">
                    <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-linear-to-br ${category.accent} text-lg font-black text-white shadow-lg`}>
                      {category.initial}
                    </span>
                    <span
                      className={[
                        'rounded-full px-2.5 py-1 text-xs font-bold',
                        flow.category === category.id ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500',
                      ].join(' ')}
                    >
                      {flow.category === category.id ? 'Selected' : category.metric}
                    </span>
                  </div>
                  <h4 className="mt-4 text-xl font-black text-slate-950">{category.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${category.accent} transition-all duration-500`}
                      style={{ width: flow.category === category.id ? '100%' : '42%' }}
                    />
                  </div>
                </button>
              </ScaleHover>
            </SlideUp>
          ))}
        </div>
      </div>

      <div className="relative mt-5">
        {flow.category ? <SafeModeSelector selectedMode={flow.mode} onModeSelect={flow.selectMode} /> : null}
      </div>

      <div className="relative mt-5">
        {flow.mode === 'university' ? (
          <SafeUniversitySelect selectedUniversityId={flow.universityId} onUniversitySelect={flow.selectUniversity} />
        ) : null}

        {flow.mode === 'self' ? (
          <SafeOptions
            category={flow.category}
            foreignerProfile={flow.foreignerProfile}
            selectedOption={flow.option}
            onForeignerProfileSelect={flow.selectForeignerProfile}
            onOptionSelect={flow.setOption}
          />
        ) : null}
      </div>

      {flow.canShowListings ? (
        <div className="mt-5 space-y-5">
          <SafeFilters
            filters={flow.filters}
            filterTypes={flow.filterTypes}
            locationLabel={flow.selectedUniversity?.name}
            onFilterChange={flow.updateFilter}
          />

          <div>
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 4</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-950">Listings + Map</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
              <SafeListingGrid
                listings={flow.listings}
                selectedListingId={flow.selectedListingId}
                onListingSelect={flow.setSelectedListingId}
              />
              <SafeMapView
                center={flow.mapCenter}
                listings={flow.listings}
                selectedListingId={flow.selectedListingId}
                onMarkerSelect={flow.setSelectedListingId}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default SafeAudienceSection
