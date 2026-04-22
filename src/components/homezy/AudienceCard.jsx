const AudienceCard = ({ item, onClick, isActive = false }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className={[
        'w-full rounded-2xl border bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        isActive ? 'border-primary-600 ring-2 ring-primary-200' : 'border-neutral-200',
      ].join(' ')}
      aria-label={`Filter by ${item.title}`}
    >
      <h3 className="text-xl font-bold text-primary-800">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-primary-700">{isActive ? 'Active filter' : 'Apply filter'}</span>
    </button>
  )
}

export default AudienceCard
