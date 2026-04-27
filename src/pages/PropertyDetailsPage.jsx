import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge, Button, Card, Container, Footer, Input, Navbar } from '../components'
import PageTransition from '../components/homezy/animations/PageTransition'
import ScaleHover from '../components/homezy/animations/ScaleHover'
import SlideUp from '../components/homezy/animations/SlideUp'
import { useAuth } from '../context'
import { properties } from '../data/properties'

const locationSnapshotMetrics = [
  {
    label: 'Value Growth',
    value: '+12%',
    detail: 'yearly property value growth',
    progress: 72,
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    label: 'Livability',
    value: '86',
    suffix: '/100',
    detail: 'livability score',
    progress: 86,
    accent: 'from-blue-400 to-primary-700',
  },
]

const REQUESTS_STORAGE_KEY = 'homezy_property_requests'

const getTodayInputValue = () => new Date().toISOString().slice(0, 10)

const savePropertyRequest = (request) => {
  try {
    const existing = JSON.parse(localStorage.getItem(REQUESTS_STORAGE_KEY) || '[]')
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify([request, ...existing]))
  } catch {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify([request]))
  }
}

const ActionModal = ({ isOpen, title, eyebrow, children, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-linear-to-r from-primary-800 via-primary-700 to-blue-700 p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-100">{eyebrow}</p>
              <h3 className="mt-1 text-2xl font-black">{title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg font-bold transition hover:bg-white/20"
              aria-label="Close modal"
            >
              x
            </button>
          </div>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

const PropertyDetailsPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const property = properties.find((item) => item.id === id) || properties[0]
  const brokerOwner = property.brokerOwner
  const [activeModal, setActiveModal] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [bookingValues, setBookingValues] = useState({
    fullName: user?.fullName || '',
    phone: '',
    date: getTodayInputValue(),
    time: '12:00',
  })
  const [contactValues, setContactValues] = useState({
    fullName: user?.fullName || '',
    phone: '',
    message: `Hi, I am interested in ${property.title}. Please contact me with more details.`,
  })
  const [formErrors, setFormErrors] = useState({})

  const updateBookingValue = (event) => {
    const { name, value } = event.target
    setBookingValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const updateContactValue = (event) => {
    const { name, value } = event.target
    setContactValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const openModal = (modalName) => {
    setActiveModal(modalName)
    setSuccessMessage('')
    setFormErrors({})
  }

  const closeModal = () => {
    setActiveModal('')
    setSuccessMessage('')
    setFormErrors({})
  }

  const submitBooking = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!bookingValues.fullName.trim()) nextErrors.fullName = 'Name is required.'
    if (!bookingValues.phone.trim()) nextErrors.phone = 'Phone number is required.'
    if (!bookingValues.date) nextErrors.date = 'Viewing date is required.'
    if (!bookingValues.time) nextErrors.time = 'Viewing time is required.'

    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors)
      return
    }

    savePropertyRequest({
      id: crypto.randomUUID(),
      type: 'booking',
      propertyId: property.id,
      propertyTitle: property.title,
      brokerOwnerId: brokerOwner.id,
      brokerOwnerName: brokerOwner.name,
      createdAt: new Date().toISOString(),
      ...bookingValues,
    })
    setSuccessMessage(`Viewing booked for ${bookingValues.date} at ${bookingValues.time}.`)
  }

  const submitContact = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!contactValues.fullName.trim()) nextErrors.fullName = 'Name is required.'
    if (!contactValues.phone.trim()) nextErrors.phone = 'Phone number is required.'
    if (!contactValues.message.trim()) nextErrors.message = 'Message is required.'

    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors)
      return
    }

    savePropertyRequest({
      id: crypto.randomUUID(),
      type: 'broker-contact',
      propertyId: property.id,
      propertyTitle: property.title,
      brokerOwnerId: brokerOwner.id,
      brokerOwnerName: brokerOwner.name,
      createdAt: new Date().toISOString(),
      ...contactValues,
    })
    setSuccessMessage('Broker request sent. Our team will contact you shortly.')
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <PageTransition>
        <main className="py-8">
        <Container className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <SlideUp>
              <ScaleHover>
                <Card className="overflow-hidden">
                  <img src={property.image} alt={property.title} className="h-[420px] w-full object-cover" />
                </Card>
              </ScaleHover>
            </SlideUp>

            <SlideUp delay={0.08}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{property.location}</p>
                <h1 className="mt-2 text-4xl font-bold text-primary-800">{property.title}</h1>
                <p className="mt-3 max-w-2xl text-neutral-600">
                  A meticulously curated living space designed for modern comfort, strong investment value, and immediate
                  move-in readiness.
                </p>
              </div>
            </SlideUp>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Bedrooms', property.beds],
                ['Bathrooms', property.baths],
                ['Area', property.area],
                ['Certification', 'Grade A'],
              ].map(([label, value], index) => (
                <SlideUp key={label} delay={index * 0.05}>
                  <ScaleHover>
                    <Card className="p-4">
                      <p className="text-sm text-neutral-500">{label}</p>
                      <p className="text-2xl font-bold text-primary-800">{value}</p>
                    </Card>
                  </ScaleHover>
                </SlideUp>
              ))}
            </div>

            <SlideUp>
              <Card className="p-5">
                <h2 className="text-2xl font-bold text-primary-800">Premium Facilities</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>Ultra-High Fiber Internet</Badge>
                  <Badge>24/7 Resident Gym</Badge>
                  <Badge>Underground Parking</Badge>
                  <Badge>Solar Backup Power</Badge>
                </div>
              </Card>
            </SlideUp>

            <SlideUp>
              <Card className="p-5">
                <h2 className="text-2xl font-bold text-primary-800">Student Voices</h2>
                <p className="mt-3 text-sm text-neutral-600">
                  "The stay here is surprisingly quiet despite being so close to the main road. The fiber internet is
                  rock solid for my rendering projects."
                </p>
              </Card>
            </SlideUp>
          </div>

          <div className="space-y-4">
            <SlideUp delay={0.12}>
              <Card className="p-5">
                <p className="text-sm text-neutral-500">Starting from</p>
                <p className="text-3xl font-bold text-primary-800">{property.price}</p>
                <ScaleHover className="mt-4" glow>
                  <Button className="w-full" onClick={() => openModal('booking')}>
                    Book a Viewing
                  </Button>
                </ScaleHover>
                <ScaleHover className="mt-2">
                  <Button variant="outline" className="w-full" onClick={() => openModal('contact')}>
                    Contact Broker
                  </Button>
                </ScaleHover>
              </Card>
            </SlideUp>

            <SlideUp delay={0.15}>
              <Card className="overflow-hidden p-5">
                <div className="flex items-start gap-3">
                  <img
                    src={brokerOwner.avatar}
                    alt={brokerOwner.name}
                    className="h-14 w-14 rounded-2xl object-cover ring-2 ring-primary-100"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-lg font-black text-primary-800">{brokerOwner.name}</h3>
                      {brokerOwner.verified ? (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-700">
                          Verified
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs font-semibold text-neutral-500">{brokerOwner.role}</p>
                    <p className="mt-1 text-sm font-bold text-neutral-700">{brokerOwner.company}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-neutral-50 p-3 text-center">
                  <div>
                    <p className="text-lg font-black text-primary-800">{brokerOwner.rating}</p>
                    <p className="text-[11px] font-semibold text-neutral-500">Rating</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-primary-800">{brokerOwner.dealsClosed}</p>
                    <p className="text-[11px] font-semibold text-neutral-500">Deals</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-primary-800">{brokerOwner.responseTime}</p>
                    <p className="text-[11px] font-semibold text-neutral-500">Reply</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <a className="block font-semibold text-primary-700 hover:text-primary-800" href={`tel:${brokerOwner.phone}`}>
                    {brokerOwner.phone}
                  </a>
                  <a className="block font-semibold text-primary-700 hover:text-primary-800" href={`mailto:${brokerOwner.email}`}>
                    {brokerOwner.email}
                  </a>
                </div>
              </Card>
            </SlideUp>

            <SlideUp delay={0.18}>
              <Card className="overflow-hidden p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Area Intelligence</p>
                    <h3 className="mt-1 text-xl font-bold text-primary-800">Location Snapshot</h3>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Strong</span>
                </div>

                <div className="mt-5 space-y-3">
                  {locationSnapshotMetrics.map((metric, index) => (
                    <ScaleHover key={metric.label}>
                      <div className="rounded-2xl border border-neutral-100 bg-linear-to-br from-white to-neutral-50 p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="grid h-16 w-16 shrink-0 place-items-center rounded-full p-1"
                            style={{
                              background: `conic-gradient(#0f766e ${metric.progress}%, #e5e7eb ${metric.progress}% 100%)`,
                            }}
                          >
                            <div className="grid h-full w-full place-items-center rounded-full bg-white">
                              <span className="text-lg font-black text-primary-800">
                                {metric.value}
                                {metric.suffix ? <span className="text-[10px] font-bold text-neutral-400">{metric.suffix}</span> : null}
                              </span>
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-bold text-neutral-900">{metric.label}</p>
                              <p className="text-xs font-semibold text-neutral-500">#{index + 1}</p>
                            </div>
                            <p className="mt-1 text-xs text-neutral-500">{metric.detail}</p>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
                              <div
                                className={`h-full rounded-full bg-linear-to-r ${metric.accent}`}
                                style={{ width: `${metric.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScaleHover>
                  ))}
                </div>
              </Card>
            </SlideUp>

            <ScaleHover>
              <Link
                to="/properties"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-primary-100 bg-white px-5 py-3 text-sm font-black text-primary-800 shadow-sm transition hover:border-primary-300 hover:bg-primary-50 hover:shadow-md"
              >
                <span aria-hidden="true">&larr;</span>
                Back to listings
              </Link>
            </ScaleHover>
          </div>
        </Container>
        </main>
      </PageTransition>

      <ActionModal isOpen={activeModal === 'booking'} eyebrow="Private viewing" title="Book a Viewing" onClose={closeModal}>
        {successMessage ? (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-lg font-black text-emerald-800">Request confirmed</p>
            <p className="mt-2 text-sm leading-6 text-emerald-700">{successMessage}</p>
            <Button className="mt-4 w-full" onClick={closeModal}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submitBooking} className="space-y-4" noValidate>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm font-bold text-neutral-900">{property.title}</p>
              <p className="mt-1 text-xs text-neutral-500">{property.location}</p>
              <p className="mt-2 text-xs font-bold text-primary-700">
                Viewing handled by {brokerOwner.name} · {brokerOwner.company}
              </p>
            </div>

            <Input
              id="bookingFullName"
              name="fullName"
              label="Full Name"
              value={bookingValues.fullName}
              onChange={updateBookingValue}
              error={formErrors.fullName}
            />
            <Input
              id="bookingPhone"
              name="phone"
              label="Phone Number"
              placeholder="01xxxxxxxxx"
              value={bookingValues.phone}
              onChange={updateBookingValue}
              error={formErrors.phone}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                id="bookingDate"
                name="date"
                type="date"
                label="Preferred Date"
                min={getTodayInputValue()}
                value={bookingValues.date}
                onChange={updateBookingValue}
                error={formErrors.date}
              />
              <Input
                id="bookingTime"
                name="time"
                type="time"
                label="Preferred Time"
                value={bookingValues.time}
                onChange={updateBookingValue}
                error={formErrors.time}
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Confirm Viewing
              </Button>
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </ActionModal>

      <ActionModal isOpen={activeModal === 'contact'} eyebrow="Broker concierge" title="Contact Broker" onClose={closeModal}>
        {successMessage ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-lg font-black text-blue-800">Message sent</p>
            <p className="mt-2 text-sm leading-6 text-blue-700">{successMessage}</p>
            <Button className="mt-4 w-full" onClick={closeModal}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submitContact} className="space-y-4" noValidate>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm font-bold text-neutral-900">Ask about {property.title}</p>
              <p className="mt-1 text-xs text-neutral-500">
                {brokerOwner.name} from {brokerOwner.company} will follow up with price, visit, and paperwork details.
              </p>
            </div>

            <Input
              id="contactFullName"
              name="fullName"
              label="Full Name"
              value={contactValues.fullName}
              onChange={updateContactValue}
              error={formErrors.fullName}
            />
            <Input
              id="contactPhone"
              name="phone"
              label="Phone Number"
              placeholder="01xxxxxxxxx"
              value={contactValues.phone}
              onChange={updateContactValue}
              error={formErrors.phone}
            />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Message</span>
              <textarea
                name="message"
                value={contactValues.message}
                onChange={updateContactValue}
                rows={4}
                className={[
                  'w-full rounded-md border bg-white px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200',
                  formErrors.message ? 'border-error focus-visible:ring-error/20' : 'border-neutral-200',
                ].join(' ')}
              />
              {formErrors.message ? <p className="mt-1 text-xs text-error">{formErrors.message}</p> : null}
            </label>
            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Send to Broker
              </Button>
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </ActionModal>

      <Footer />
    </div>
  )
}

export default PropertyDetailsPage
