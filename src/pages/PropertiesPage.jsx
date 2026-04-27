import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Badge, Button, Card, Container, Footer, Input, Navbar, PropertyCard } from '../components'
import PageTransition from '../components/homezy/animations/PageTransition'
import ScaleHover from '../components/homezy/animations/ScaleHover'
import SlideUp from '../components/homezy/animations/SlideUp'
import { properties } from '../data/properties'

const makePropertyIcon = (index) => {
  return L.divIcon({
    className: '',
    html: `<span style="align-items:center;background:#0f766e;border:3px solid #ffffff;border-radius:9999px;box-shadow:0 10px 22px rgba(15,23,42,.3);color:#ffffff;display:flex;font-size:12px;font-weight:800;height:34px;justify-content:center;width:34px;">${index + 1}</span>`,
    iconAnchor: [17, 17],
    iconSize: [34, 34],
  })
}

const PropertyMapViewport = ({ properties }) => {
  const map = useMap()

  useEffect(() => {
    if (!properties.length) {
      map.setView([30.0444, 31.2357], 6)
      return
    }

    const bounds = L.latLngBounds(properties.map((property) => [property.lat, property.lng]))
    map.fitBounds(bounds, { maxZoom: 12, padding: [42, 42] })
  }, [map, properties])

  return null
}

const PropertiesMap = ({ properties }) => {
  const markerIcons = useMemo(
    () =>
      properties.map((property, index) => ({
        id: property.id,
        icon: makePropertyIcon(index),
      })),
    [properties],
  )

  return (
    <Card className="overflow-hidden p-0">
      <div className="h-[620px]">
        <MapContainer center={[30.0444, 31.2357]} zoom={6} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PropertyMapViewport properties={properties} />
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
              icon={markerIcons.find((markerIcon) => markerIcon.id === property.id)?.icon}
            >
              <Popup>
                <div className="min-w-48">
                  <p className="font-bold text-slate-950">{property.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{property.location}</p>
                  <p className="mt-2 text-sm font-bold text-primary-700">{property.price}</p>
                  <Link className="mt-2 inline-block text-xs font-bold text-blue-700" to={`/properties/${property.id}`}>
                    View details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  )
}

const PropertiesPage = () => {
  const [region, setRegion] = useState('')
  const [selectedTypes, setSelectedTypes] = useState(['Luxury Villa'])
  const [gridView, setGridView] = useState(true)

  const propertyTypes = ['Luxury Villa', 'Apartment', 'Duplex', 'Student Housing']

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const regionMatch = !region || property.location.toLowerCase().includes(region.toLowerCase())
      const typeMatch = selectedTypes.length ? selectedTypes.includes(property.type) : true
      return regionMatch && typeMatch
    })
  }, [region, selectedTypes])

  const toggleType = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]))
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <PageTransition>
        <main className="py-8">
        <Container>
          <SlideUp>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Premium Collection</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-4xl font-bold text-primary-800">Properties in Egypt</h1>
              <div className="flex gap-2">
                <ScaleHover glow>
                  <Button variant={gridView ? 'primary' : 'outline'} onClick={() => setGridView(true)}>
                    Grid View
                  </Button>
                </ScaleHover>
                <ScaleHover glow>
                  <Button variant={!gridView ? 'primary' : 'outline'} onClick={() => setGridView(false)}>
                    View on Map
                  </Button>
                </ScaleHover>
              </div>
            </div>
          </SlideUp>

          <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
            <SlideUp delay={0.08}>
              <Card className="h-fit p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-primary-800">Refine Search</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setRegion('')
                      setSelectedTypes([])
                    }}
                    className="text-xs font-semibold text-neutral-500 hover:text-primary-700"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-4">
                  <Input
                    id="region"
                    label="Region"
                    placeholder="New Cairo, Maadi..."
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                  />

                  <div>
                    <p className="mb-2 text-sm font-semibold text-neutral-700">Property Type</p>
                    <div className="space-y-2">
                      {propertyTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 rounded-md bg-neutral-100 px-3 py-2 text-sm">
                          <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-semibold text-neutral-700">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="success">Solar Powered</Badge>
                      <Badge>Smart Home</Badge>
                      <Badge>Private Pool</Badge>
                      <Badge>Gym</Badge>
                    </div>
                  </div>
                </div>

                <Card className="mt-6 bg-primary-700 p-4 text-white">
                  <h3 className="text-lg font-bold">Sustainable Living</h3>
                  <p className="mt-2 text-sm text-white/90">
                    Discover properties with A-grade eco-certification and zero-waste initiatives.
                  </p>
                  <ScaleHover glow>
                    <Button className="mt-4 w-full bg-white text-primary-800 hover:bg-neutral-100">Explore Eco-Homes</Button>
                  </ScaleHover>
                </Card>
              </Card>
            </SlideUp>

            {gridView ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredProperties.map((property, index) => (
                  <SlideUp key={property.id} delay={index * 0.04}>
                    <ScaleHover>
                      <Link to={`/properties/${property.id}`}>
                        <PropertyCard property={property} />
                      </Link>
                    </ScaleHover>
                  </SlideUp>
                ))}
              </div>
            ) : (
              <SlideUp>
                <PropertiesMap properties={filteredProperties} />
              </SlideUp>
            )}
          </div>
        </Container>
        </main>
      </PageTransition>

      <Footer />
    </div>
  )
}

export default PropertiesPage
