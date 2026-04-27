import ScaleHover from './animations/ScaleHover'
import SlideUp from './animations/SlideUp'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(price)
}

const SafeListingGrid = ({ listings, selectedListingId, onListingSelect }) => {
  if (!listings.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No listings found</h3>
        <p className="mt-2 text-sm text-slate-500">Try another option or adjust the local price range.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {listings.map((listing, index) => (
        <SlideUp key={listing.id} delay={index * 0.05}>
          <ScaleHover>
            <button
              type="button"
              onClick={() => onListingSelect?.(listing.id)}
              className={[
                'w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100',
                selectedListingId === listing.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200',
              ].join(' ')}
            >
              <img src={listing.image} alt={listing.title} className="h-44 w-full object-cover" />

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-950">{listing.title}</h3>
                  <p className="shrink-0 text-sm font-bold text-blue-700">{formatPrice(listing.price)}</p>
                </div>

                <p className="mt-2 text-sm text-slate-600">{listing.location}</p>
                <p className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {listing.type}
                </p>
              </div>
            </button>
          </ScaleHover>
        </SlideUp>
      ))}
    </div>
  )
}

export default SafeListingGrid
