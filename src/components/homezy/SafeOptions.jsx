const optionsByCategory = {
  students: [
    { id: 'coliving', label: 'Coliving', description: 'Shared apartment with matched residents and flexible services.' },
    { id: 'share-time', label: 'Share Time', description: 'Short-term shared stay for flexible academic schedules.' },
    { id: 'vip-hotels', label: 'VIP Hotels', description: 'Premium hotels with student-focused services.' },
  ],
  families: [
    { id: 'buy', label: 'Buy', description: 'Family-ready properties for ownership.' },
    { id: 'rent', label: 'Rent', description: 'Flexible rental homes in safe neighborhoods.' },
  ],
}

const foreignerProfiles = [
  { id: 'student', label: 'Student', description: 'International student housing options.' },
  { id: 'worker', label: 'Worker', description: 'Broker-ready and work-nearby apartments.' },
  { id: 'tourist', label: 'Tourist', description: 'Tourism stays, hotels, chalets, and attraction-side units.' },
]

const optionsByForeignerProfile = {
  student: [
    { id: 'nearby-work-university', label: 'Nearby work/university', description: 'Close to campus or daily routes.' },
    { id: 'broker-ready', label: 'Broker-ready apartments', description: 'Move-in-ready apartments with broker support.' },
    { id: 'coliving', label: 'Coliving', description: 'Shared housing with international residents.' },
  ],
  worker: [
    { id: 'nearby-work-university', label: 'Nearby work/university', description: 'Near offices, transit, and business zones.' },
    { id: 'broker-ready', label: 'Broker-ready apartments', description: 'Professionally managed lease-ready units.' },
    { id: 'coliving', label: 'Coliving', description: 'Flexible shared living for professionals.' },
  ],
  tourist: [
    { id: 'entertainment-compounds', label: 'Entertainment housing (compounds)', description: 'Compound stays near leisure services.' },
    { id: 'hotels-chalets', label: 'Hotels / Chalets (with stars)', description: 'Premium tourist-ready stays.' },
    { id: 'nearby-attractions', label: 'Nearby attractions', description: 'Homes close to landmarks and attractions.' },
  ],
}

const SafeOptions = ({ category, foreignerProfile, selectedOption, onForeignerProfileSelect, onOptionSelect }) => {
  const options =
    category === 'foreigners'
      ? optionsByForeignerProfile[foreignerProfile] || []
      : optionsByCategory[category] || []

  if (!category) return null

  return (
    <div className="rounded-4xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Step 3</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">
            {category === 'foreigners' && !foreignerProfile ? 'Choose foreigner profile' : 'Choose option'}
          </h3>
        </div>
        <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm">
          {selectedOption ? 'Option selected' : 'Personalize search'}
        </span>
      </div>

      {category === 'foreigners' && !foreignerProfile ? (
        <div className="grid gap-3 md:grid-cols-3">
          {foreignerProfiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => onForeignerProfileSelect(profile.id)}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">Profile</span>
              <h4 className="mt-3 text-lg font-black text-slate-950">{profile.label}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{profile.description}</p>
            </button>
          ))}
        </div>
      ) : null}

      {category === 'foreigners' && foreignerProfile ? (
        <button
          type="button"
          onClick={() => onForeignerProfileSelect('')}
          className="mb-4 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
        >
          Change foreigner profile
        </button>
      ) : null}

      <div className="grid gap-3 md:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onOptionSelect(option.id)}
            className={[
              'rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-100',
              selectedOption === option.id ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100' : 'border-slate-200 bg-white shadow-sm',
            ].join(' ')}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">Option</span>
              <span className={selectedOption === option.id ? 'text-xs font-bold text-blue-700' : 'text-xs font-bold text-slate-400'}>
                {selectedOption === option.id ? 'Selected' : 'Available'}
              </span>
            </div>
            <h4 className="text-lg font-black text-slate-950">{option.label}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SafeOptions
