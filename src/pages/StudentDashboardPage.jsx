import { Link } from 'react-router-dom'
import { Badge, Button, Card, Container, Footer, Navbar } from '../components'
import PageTransition from '../components/homezy/animations/PageTransition'
import ScaleHover from '../components/homezy/animations/ScaleHover'
import SlideUp from '../components/homezy/animations/SlideUp'
import { useAuth } from '../context'

const bookingHistory = [
  {
    property: 'Gardenia Heights Hub',
    type: 'Semester Lease',
    period: 'Sep 2023 - Jan 2024',
    paid: 'EGP 60,000',
    status: 'Completed',
  },
  {
    property: 'Rehab Student Suites',
    type: 'Monthly Flex',
    period: 'Feb 2024 - Jul 2024',
    paid: 'EGP 15,000 / mo',
    status: 'Active',
  },
]

const savedUnits = [
  { name: 'Tagamoa Studio', distance: '10 min walk to AUC', price: 'EGP 12,500/mo' },
  { name: 'The Village Duplex', distance: '18 min shuttle', price: 'EGP 18,000/mo' },
]

const StudentDashboardPage = () => {
  const { user } = useAuth()
  const displayName = user?.fullName || 'Kareem Shalan'
  const university = user?.university || 'Tanta University'
  const location = user?.location || 'Tanta, Egypt'
  const avatar = user?.avatar || '/MyPhoto.jpg'
  const cover = user?.cover || '/HomezyLogo.jpeg'

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <PageTransition>
        <main className="py-8">
        <Container className="space-y-6">
          <SlideUp>
            <Card className="relative overflow-hidden p-6 text-white">
              <img
                src={cover}
                alt="Profile cover"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-900/75" />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <img
                  src={avatar}
                  alt={displayName}
                    className="h-20 w-20 rounded-xl border-2 border-white object-cover"
                  />
                  <div>
                    <Badge variant="success">Verified Student</Badge>
                  <h1 className="mt-2 text-4xl font-bold">{displayName}</h1>
                  <p className="text-sm text-white/90">{university} • {location}</p>
                  </div>
                </div>
                <ScaleHover glow>
                <Link to="/profile">
                  <Button variant="outline" className="border-white bg-white text-primary-800 hover:bg-neutral-100">
                    Edit Profile
                  </Button>
                </Link>
                </ScaleHover>
              </div>
            </Card>
          </SlideUp>

          <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <SlideUp delay={0.08}>
              <Card className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-primary-800">Roommate Matching</h2>
                  <Badge variant="success">Matching Active</Badge>
                </div>
                <p className="text-sm text-neutral-600">Based on your shared living preferences</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <ScaleHover>
                    <Card className="border border-neutral-100 p-4">
                      <h3 className="font-semibold text-primary-800">Lifestyle</h3>
                      <p className="mt-2 text-sm text-neutral-600">Morning person: Yes</p>
                      <p className="text-sm text-neutral-600">Study atmosphere: Quiet</p>
                    </Card>
                  </ScaleHover>
                  <ScaleHover>
                    <Card className="border border-neutral-100 p-4">
                      <h3 className="font-semibold text-primary-800">Eco-Habits</h3>
                      <p className="mt-2 text-sm text-neutral-600">Waste sorting: Active</p>
                      <p className="text-sm text-neutral-600">Energy conscious: High</p>
                    </Card>
                  </ScaleHover>
                </div>

                <h3 className="mt-6 text-lg font-bold text-primary-800">Potential Matches</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {['Youssef F.', 'Nour M.', 'Ahmed K.'].map((name) => (
                    <Badge key={name}>{name}</Badge>
                  ))}
                </div>
              </Card>
            </SlideUp>

            <SlideUp delay={0.14}>
              <Card className="p-5">
                <h2 className="text-2xl font-bold text-primary-800">Saved Near Campus</h2>
                <div className="mt-4 space-y-3">
                  {savedUnits.map((unit, index) => (
                    <SlideUp key={unit.name} delay={index * 0.06}>
                      <ScaleHover>
                        <Card className="border border-neutral-100 p-3">
                          <p className="font-semibold text-neutral-800">{unit.name}</p>
                          <p className="text-xs text-neutral-500">{unit.distance}</p>
                          <p className="mt-1 font-semibold text-primary-800">{unit.price}</p>
                        </Card>
                      </ScaleHover>
                    </SlideUp>
                  ))}
                </div>
                <ScaleHover className="mt-4" glow>
                  <Button variant="outline" className="w-full">
                    View All Saved
                  </Button>
                </ScaleHover>
              </Card>
            </SlideUp>
          </section>

          <SlideUp>
            <Card className="overflow-x-auto p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-primary-800">Booking History</h2>
                <div className="flex gap-2">
                  <Badge variant="primary">Upcoming</Badge>
                  <Badge>Past</Badge>
                </div>
              </div>
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500">
                    <th className="pb-3">Property</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Period</th>
                    <th className="pb-3">Total Paid</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingHistory.map((item) => (
                    <tr key={item.property} className="border-b border-neutral-100 text-sm">
                      <td className="py-4 font-semibold text-neutral-800">{item.property}</td>
                      <td className="py-4 text-neutral-600">{item.type}</td>
                      <td className="py-4 text-neutral-600">{item.period}</td>
                      <td className="py-4 font-semibold text-primary-800">{item.paid}</td>
                      <td className="py-4">
                        <Badge variant={item.status === 'Completed' ? 'success' : 'primary'}>{item.status}</Badge>
                      </td>
                      <td className="py-4 font-semibold text-primary-700">
                        {item.status === 'Completed' ? 'View Contract' : 'Manage Booking'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </SlideUp>
        </Container>
        </main>
      </PageTransition>

      <Footer />
    </div>
  )
}

export default StudentDashboardPage
