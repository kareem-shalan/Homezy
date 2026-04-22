import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Container, Footer, Navbar, PropertyCard } from '../components'
import AudienceSection from '../components/homezy/AudienceSection'
import { properties } from '../data/properties'

const audienceTypeMap = {
  students: ['Student Housing', 'Apartment'],
  families: ['Luxury Villa', 'Duplex'],
  foreigners: ['Apartment', 'Duplex', 'Luxury Villa'],
}

const HomePage = () => {
  const [selectedAudience, setSelectedAudience] = useState('all')

  const filteredProperties = useMemo(() => {
    if (selectedAudience === 'all') {
      return properties
    }

    const allowedTypes = audienceTypeMap[selectedAudience] || []
    return properties.filter((item) => allowedTypes.includes(item.type))
  }, [selectedAudience])

  const featured = useMemo(() => filteredProperties.slice(0, 3), [filteredProperties])
  const nearUniversity = useMemo(
    () => filteredProperties.filter((item) => item.type === 'Student Housing' || item.type === 'Apartment'),
    [filteredProperties],
  )

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <main>
        <section className="pb-12 pt-8">
          <Container className="grid items-center gap-6 lg:grid-cols-2">
            <Card className="p-6 lg:p-8">
              <Badge variant="primary">Premium Collection</Badge>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-primary-800 sm:text-5xl">
                Curating Modern Egyptian Living
              </h1>
              <p className="mt-4 max-w-lg text-neutral-600">
                Discover premium homes with verified quality standards, sustainability labels, and tailored options for
                families and students.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/properties">
                  <Button>Search Properties</Button>
                </Link>
                <Link to="/student">
                  <Button variant="outline">Student Hub</Button>
                </Link>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"
                alt="Luxury property"
                className="h-[380px] w-full object-cover"
              />
            </Card>
          </Container>
        </section>

        <section className="py-10">
          <Container>
            <AudienceSection selectedAudience={selectedAudience} onAudienceChange={setSelectedAudience} />
          </Container>
        </section>

        <section className="py-10">
          <Container>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-800">Featured Sustainable Homes</h2>
              <Link to="/properties" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                View all listings
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((property) => (
                <Link key={property.id} to={`/properties/${property.id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
            {!featured.length ? <p className="mt-3 text-sm text-neutral-600">No properties found for this audience yet.</p> : null}
          </Container>
        </section>

        <section className="py-10">
          <Container className="grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1200&q=80"
                alt="Advisor"
                className="h-full w-full object-cover"
              />
            </Card>
            <Card className="p-6">
              <Badge variant="primary">Advisory</Badge>
              <h2 className="mt-4 text-3xl font-bold text-primary-800">VIP Advisory & Personalized Search</h2>
              <p className="mt-4 text-neutral-600">
                Work with our property advisors for curated options, legal guidance, and a faster closing experience.
              </p>
              <Button className="mt-6">Book Consultation</Button>
            </Card>
          </Container>
        </section>

        <section className="pb-6 pt-10">
          <Container>
            <h2 className="mb-4 text-2xl font-bold text-primary-800">Verified Near Universities</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nearUniversity.map((property) => (
                <Link key={property.id} to={`/properties/${property.id}`}>
                  <PropertyCard property={property} compact />
                </Link>
              ))}
            </div>
            {!nearUniversity.length ? (
              <p className="mt-3 text-sm text-neutral-600">No nearby-university listings for this selected audience.</p>
            ) : null}
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
