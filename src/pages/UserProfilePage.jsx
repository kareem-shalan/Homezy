import { useState } from 'react'
import { Badge, Button, Card, Container, Footer, Input, Navbar } from '../components'
import AvatarUpload from '../components/homezy/profile/AvatarUpload'
import CoverUpload from '../components/homezy/profile/CoverUpload'
import PageTransition from '../components/homezy/animations/PageTransition'
import SlideUp from '../components/homezy/animations/SlideUp'
import { useAuth } from '../context'

const DEFAULT_COVER = '/HomezyLogo.jpeg'

const getProfileCompletion = (user) => {
  const fields = [user?.fullName, user?.email, user?.phoneNumber, user?.university, user?.location, user?.avatar, user?.cover]
  return Math.round((fields.filter(Boolean).length / fields.length) * 100)
}

const UserProfilePage = () => {
  const { user, updateUser } = useAuth()
  const coverImage = user?.cover || DEFAULT_COVER
  const completion = getProfileCompletion(user)
  const [values, setValues] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    university: user?.university || '',
    location: user?.location || '',
  })
  const [message, setMessage] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setMessage('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    updateUser(values)
    setMessage('Profile updated successfully.')
  }

  const saveAvatar = (avatar) => {
    updateUser({ avatar })
    setMessage('Avatar photo updated.')
  }

  const saveCover = (cover) => {
    updateUser({ cover })
    setMessage('Cover photo updated.')
  }

  return (
    <div className="min-h-screen ">
      <Navbar />

      <PageTransition>
        <main className="py-8">
          <Container className="space-y-6">
            <SlideUp>
              <Card className="overflow-hidden border border-amber-200/20 bg-slate-950 shadow-2xl ">
                <div className="relative h-[360px] bg-linear-to-br from-slate-950 via-blue-950 to-amber-900">
                  <img src={coverImage} alt="Profile cover" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.16)_0%,transparent_32%,rgba(251,191,36,0.14)_72%,transparent_100%)]" />

                  <div className="absolute inset-x-5 bottom-5 rounded-4xl 15 p-5 text-white shadow-2xl ">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-4xl bg-linear-to-br from-amber-300 via-white to-amber-600 opacity-80 blur-sm" />
                          <div className="relative grid h-28 w-28 place-items-center overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/15 shadow-2xl">
                            {user?.avatar ? (
                              <img src={user.avatar} alt={user.fullName} className="h-full w-full object-cover" />
                            ) : (
                              <span className="text-5xl font-black">{user?.fullName?.charAt(0)?.toUpperCase() || 'U'}</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-amber-200/40 bg-amber-300/15 px-3 py-1 text-xs font-black uppercase tracking-widest text-amber-100">
                              Golden Profile
                            </span>
                            <Badge variant="success">Active</Badge>
                          </div>
                          <h1 className="mt-3 bg-linear-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
                            {user?.fullName}
                          </h1>
                          <p className="mt-2 text-sm font-semibold text-white/80">{user?.email}</p>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px]">
                        {[
                          ['Complete', `${completion}%`],
                          ['Role', user?.role || 'Member'],
                          ['Status', 'Verified'],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md">
                            <p className="text-lg font-black text-amber-100">{value}</p>
                            <p className="text-[11px] font-bold uppercase tracking-wide text-white/60">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </SlideUp>

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <SlideUp delay={0.08}>
                <Card className="overflow-hidden border border-amber-100 bg-white shadow-2xl shadow-amber-100/30">
                  <div className="border-b border-amber-100 bg-linear-to-r from-amber-50 via-white to-slate-50 p-6">
                    <p className="text-xs font-black uppercase tracking-widest text-blue-700 ">Identity Vault</p>
                    <h2 className="mt-2 text-3xl font-black text-slate-950">Personal Data</h2>
                    <p className="mt-2 text-sm text-neutral-600">Update the profile data used across Homezy.</p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-4 p-6" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input id="fullName" name="fullName" label="Full Name" value={values.fullName} onChange={onChange} />
                      <Input id="email" name="email" label="Email" value={values.email} onChange={onChange} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input id="phoneNumber" name="phoneNumber" label="Phone Number" value={values.phoneNumber} onChange={onChange} />
                      <Input id="university" name="university" label="University" value={values.university} onChange={onChange} />
                    </div>
                    <Input id="location" name="location" label="Location" value={values.location} onChange={onChange} />

                    {message ? (
                      <div className="rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm font-semibold text-success">
                        {message}
                      </div>
                    ) : null}

                    <Button type="submit" className="w-full bg-linear-to-r cursor-pointer from-white-950 via-blue-600 to-white-600 hover:from-black hover:via-blue-500 hover:to-blue-600">
                      Save Profile Data
                    </Button>
                  </form>
                </Card>
              </SlideUp>

              <SlideUp delay={0.12}>
                <div className="space-y-5">
                  <AvatarUpload user={{ ...user, name: user?.fullName }} onSave={saveAvatar} />
                  <CoverUpload user={{ ...user, name: user?.fullName }} onSave={saveCover} />
                </div>
              </SlideUp>
            </div>
          </Container>
        </main>
      </PageTransition>

      <Footer />
    </div>
  )
}

export default UserProfilePage
