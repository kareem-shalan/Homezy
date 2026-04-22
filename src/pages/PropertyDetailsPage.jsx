import { Link, useParams } from 'react-router-dom'
import { Badge, Button, Card, Container, Footer, Navbar } from '../components'
import { properties } from '../data/properties'

const PropertyDetailsPage = () => {
  const { id } = useParams()
  const property = properties.find((item) => item.id === id) || properties[0]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <main className="py-8">
        <Container className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <img src={property.image} alt={property.title} className="h-[420px] w-full object-cover" />
            </Card>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{property.location}</p>
              <h1 className="mt-2 text-4xl font-bold text-primary-800">{property.title}</h1>
              <p className="mt-3 max-w-2xl text-neutral-600">
                A meticulously curated living space designed for modern comfort, strong investment value, and immediate
                move-in readiness.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4">
                <p className="text-sm text-neutral-500">Bedrooms</p>
                <p className="text-2xl font-bold text-primary-800">{property.beds}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-neutral-500">Bathrooms</p>
                <p className="text-2xl font-bold text-primary-800">{property.baths}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-neutral-500">Area</p>
                <p className="text-2xl font-bold text-primary-800">{property.area}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-neutral-500">Certification</p>
                <p className="text-2xl font-bold text-primary-800">Grade A</p>
              </Card>
            </div>

            <Card className="p-5">
              <h2 className="text-2xl font-bold text-primary-800">Premium Facilities</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Ultra-High Fiber Internet</Badge>
                <Badge>24/7 Resident Gym</Badge>
                <Badge>Underground Parking</Badge>
                <Badge>Solar Backup Power</Badge>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-2xl font-bold text-primary-800">Student Voices</h2>
              <p className="mt-3 text-sm text-neutral-600">
                "The stay here is surprisingly quiet despite being so close to the main road. The fiber internet is
                rock solid for my rendering projects."
              </p>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <p className="text-sm text-neutral-500">Starting from</p>
              <p className="text-3xl font-bold text-primary-800">{property.price}</p>
              <Button className="mt-4 w-full">Book a Viewing</Button>
              <Button variant="outline" className="mt-2 w-full">
                Contact Broker
              </Button>
            </Card>

            <Card className="p-5">
              <h3 className="text-xl font-bold text-primary-800">Location Snapshot</h3>
              <p className="mt-3 text-sm text-neutral-600">+12% yearly property value growth</p>
              <p className="mt-1 text-sm text-neutral-600">86/100 livability score</p>
            </Card>

            <Link to="/properties" className="inline-block text-sm font-semibold text-primary-700 hover:text-primary-800">
              Back to listings
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default PropertyDetailsPage
