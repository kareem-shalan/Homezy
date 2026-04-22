import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Container, Footer, Input, Navbar, PropertyCard } from '../components'
import { properties } from '../data/properties'

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

      <main className="py-8">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Premium Collection</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-4xl font-bold text-primary-800">Properties in Egypt</h1>
            <div className="flex gap-2">
              <Button variant={gridView ? 'primary' : 'outline'} onClick={() => setGridView(true)}>
                Grid View
              </Button>
              <Button variant={!gridView ? 'primary' : 'outline'} onClick={() => setGridView(false)}>
                View on Map
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
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
                <Button className="mt-4 w-full bg-white text-primary-800 hover:bg-neutral-100">Explore Eco-Homes</Button>
              </Card>
            </Card>

            {gridView ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredProperties.map((property) => (
                  <Link key={property.id} to={`/properties/${property.id}`}>
                    <PropertyCard property={property} />
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="flex min-h-[620px] items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-primary-800">Map view placeholder</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Integrate your map provider here (Google Maps, Mapbox, or Leaflet).
                  </p>
                </div>
              </Card>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default PropertiesPage
