import { useMemo, useState } from 'react'
import { universities } from '../../data/homezy/universities'
import { getSafeListings } from '../../services/homezy/safeListingService'

export const useAudienceFlow = () => {
  const [category, setCategory] = useState('')
  const [mode, setMode] = useState('')
  const [universityId, setUniversityId] = useState('')
  const [foreignerProfile, setForeignerProfile] = useState('')
  const [option, setOption] = useState('')
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', type: 'all' })
  const [selectedListingId, setSelectedListingId] = useState('')

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory)
    setMode('')
    setUniversityId('')
    setForeignerProfile('')
    setOption('')
    setFilters({ minPrice: '', maxPrice: '', type: 'all' })
    setSelectedListingId('')
  }

  const selectMode = (nextMode) => {
    setMode(nextMode)
    setUniversityId('')
    setForeignerProfile('')
    setOption('')
    setFilters({ minPrice: '', maxPrice: '', type: 'all' })
    setSelectedListingId('')
  }

  const selectUniversity = (nextUniversityId) => {
    setUniversityId(nextUniversityId)
    setSelectedListingId('')
  }

  const selectForeignerProfile = (nextProfile) => {
    setForeignerProfile(nextProfile)
    setOption('')
    setSelectedListingId('')
  }

  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
    setSelectedListingId('')
  }

  const resetFlow = () => {
    setCategory('')
    setMode('')
    setUniversityId('')
    setForeignerProfile('')
    setOption('')
    setFilters({ minPrice: '', maxPrice: '', type: 'all' })
    setSelectedListingId('')
  }

  const canShowListings = useMemo(() => {
    if (!category || !mode) return false
    if (mode === 'university') return Boolean(universityId)
    if (category === 'foreigners') return Boolean(foreignerProfile && option)
    return Boolean(option)
  }, [category, foreignerProfile, mode, option, universityId])

  const listings = useMemo(() => {
    if (!canShowListings) return []

    return getSafeListings({
      category,
      mode,
      universityId,
      foreignerProfile,
      option,
      filters,
    })
  }, [canShowListings, category, filters, foreignerProfile, mode, option, universityId])

  const selectedUniversity = useMemo(() => {
    return universities.find((university) => university.id === universityId) || null
  }, [universityId])

  const mapCenter = useMemo(() => {
    if (selectedUniversity) {
      return selectedUniversity
    }

    const firstListing = listings[0]
    if (firstListing) {
      return { name: firstListing.location, lat: firstListing.lat, lng: firstListing.lng }
    }

    return { name: 'Egypt', lat: 30.0444, lng: 31.2357 }
  }, [listings, selectedUniversity])

  const filterTypes = useMemo(() => {
    const types = [...new Set(listings.map((listing) => listing.type))]
    return ['all', ...types]
  }, [listings])

  return {
    category,
    mode,
    universityId,
    foreignerProfile,
    selectedUniversity,
    option,
    filters,
    filterTypes,
    listings,
    mapCenter,
    selectedListingId,
    canShowListings,
    selectCategory,
    selectMode,
    selectUniversity,
    selectForeignerProfile,
    setOption,
    setSelectedListingId,
    updateFilter,
    resetFlow,
  }
}
