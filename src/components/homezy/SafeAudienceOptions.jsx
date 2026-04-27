const OptionButton = ({ children, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100',
        isActive ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-700',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

const SafeAudienceOptions = ({
  category,
  foreignerType,
  foreignerTypeOptions,
  availableOptions,
  selectedOption,
  language,
  languageOptions,
  onForeignerTypeSelect,
  onOptionSelect,
  onLanguageSelect,
}) => {
  if (!category) return null

  const showForeignerTypes = category === 'foreigners' && !foreignerType
  const showLanguageFilter = category === 'foreigners' && ['Students', 'Workers'].includes(foreignerType)

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 2</p>
        <h3 className="mt-1 text-2xl font-bold text-slate-950">
          {showForeignerTypes ? 'Choose foreigner profile' : 'Choose an option'}
        </h3>
      </div>

      {showForeignerTypes ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {foreignerTypeOptions.map((type) => (
            <OptionButton key={type} isActive={foreignerType === type} onClick={() => onForeignerTypeSelect(type)}>
              {type}
            </OptionButton>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availableOptions.map((option) => (
              <OptionButton key={option} isActive={selectedOption === option} onClick={() => onOptionSelect(option)}>
                {option}
              </OptionButton>
            ))}
          </div>

          {showLanguageFilter ? (
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Language filter</p>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onLanguageSelect(item)}
                    className={[
                      'rounded-full border px-3 py-1.5 text-sm font-semibold',
                      language === item ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700',
                    ].join(' ')}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default SafeAudienceOptions
