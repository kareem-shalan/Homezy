import { useEffect, useState } from 'react'
import AudienceCard from './AudienceCard'
import { getAudienceItems } from '../../services/homezyAudienceService'

const AudienceSection = ({ selectedAudience = 'all', onAudienceChange }) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadItems = async () => {
      setIsLoading(true)
      setError('')
      try {
        const data = await getAudienceItems()
        if (mounted) {
          setItems(data)
        }
      } catch {
        if (mounted) {
          setError('Unable to load target audience data.')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadItems()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="w-full rounded-3xl bg-neutral-50 p-6 sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Target Audience</p>
        <h2 className="mt-2 text-3xl font-bold text-primary-800">Built for every lifestyle</h2>
      </div>

      {isLoading ? <p className="text-sm text-neutral-600">Loading audience segments...</p> : null}
      {error ? (
        <div className="rounded-lg border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">{error}</div>
      ) : null}

      {!isLoading && !error ? (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <AudienceCard
              key={item.id}
              item={item}
              onClick={() => onAudienceChange?.(item.id)}
              isActive={selectedAudience === item.id}
            />
          ))}
        </div>
      ) : null}
      {selectedAudience !== 'all' ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => onAudienceChange?.('all')}
            className="text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            Clear filter
          </button>
        </div>
      ) : null}
    </section>
  )
}

export default AudienceSection
