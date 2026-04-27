import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(price)
}

const makeMarkerIcon = (index, selected) => {
  const size = selected ? 34 : 30
  const background = selected ? '#fde047' : '#ffffff'
  const color = selected ? '#0f172a' : '#1d4ed8'
  const ring = selected ? '0 0 0 6px rgba(253, 224, 71, 0.35)' : '0 8px 18px rgba(15, 23, 42, 0.24)'

  return L.divIcon({
    className: '',
    html: `<span style="align-items:center;background:${background};border-radius:9999px;box-shadow:${ring};color:${color};display:flex;font-size:12px;font-weight:800;height:${size}px;justify-content:center;width:${size}px;">${index + 1}</span>`,
    iconAnchor: [size / 2, size / 2],
    iconSize: [size, size],
  })
}

const MapViewport = ({ center, listings, selectedListing }) => {
  const map = useMap()

  useEffect(() => {
    if (selectedListing) {
      map.setView([selectedListing.lat, selectedListing.lng], Math.max(map.getZoom(), 13), { animate: true })
      return
    }

    if (listings.length) {
      const bounds = L.latLngBounds(listings.map((listing) => [listing.lat, listing.lng]))
      map.fitBounds(bounds, { maxZoom: 13, padding: [36, 36] })
      return
    }

    map.setView([center.lat, center.lng], 7)
  }, [center.lat, center.lng, listings, map, selectedListing])

  return null
}

const SafeMapView = ({ center, listings = [], selectedListingId, onMarkerSelect }) => {
  const mapCenter = center || { lat: 30.0444, lng: 31.2357, name: 'Egypt' }
  const selectedListing = listings.find((listing) => listing.id === selectedListingId) || listings[0]
  const activeListing = listings.find((listing) => listing.id === selectedListingId) || null
  const mapQuery = selectedListing
    ? `${selectedListing.lat},${selectedListing.lng}`
    : `${mapCenter.lat},${mapCenter.lng}`
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
  const markerIcons = useMemo(
    () =>
      listings.map((listing, index) => ({
        id: listing.id,
        icon: makeMarkerIcon(index, selectedListingId === listing.id),
      })),
    [listings, selectedListingId],
  )

  return (
    <div className="h-full min-h-[360px] rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Map</p>
          <h3 className="mt-1 text-xl font-bold">{mapCenter.name || 'Selected Area'}</h3>
          <p className="mt-1 text-xs text-slate-300">
            Center: {mapCenter.lat?.toFixed?.(4)}, {mapCenter.lng?.toFixed?.(4)}
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{listings.length} markers</span>
      </div>

      <div className="mt-5 h-72 overflow-hidden rounded-2xl bg-slate-900 text-slate-950">
        <MapContainer
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={listings.length ? 11 : 7}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapViewport center={mapCenter} listings={listings} selectedListing={activeListing} />
          {listings.map((listing, index) => (
            <Marker
              key={listing.id}
              position={[listing.lat, listing.lng]}
              icon={markerIcons.find((markerIcon) => markerIcon.id === listing.id)?.icon}
              eventHandlers={{
                click: () => onMarkerSelect?.(listing.id),
              }}
            >
              <Popup>
                <div className="min-w-44">
                  <p className="font-bold text-slate-950">{index + 1}. {listing.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{listing.location}</p>
                  <p className="mt-2 text-sm font-bold text-blue-700">{formatPrice(listing.price)}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {selectedListing ? (
        <div className="mt-4 rounded-2xl bg-white/10 p-4">
          <p className="text-sm font-bold">{selectedListing.title}</p>
          <p className="mt-1 text-xs text-slate-300">{selectedListing.location}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-yellow-200">{formatPrice(selectedListing.price)}</span>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-blue-50"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-xs leading-5 text-slate-300">Choose filters to show listing markers on the map.</p>
      )}
    </div>
  )
}

export default SafeMapView
