import useAuth from '../../../hooks/homezy/useAuth'
import AvatarUpload from './AvatarUpload'
import CoverUpload from './CoverUpload'

const DEFAULT_COVER = '/HomezyLogo.jpeg'

const ProfilePage = () => {
  const { user, updateUser } = useAuth()

  if (!user) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Homezy Profile</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Login required</h1>
        <p className="mt-2 text-sm text-slate-500">Register or login to manage your avatar and cover photo.</p>
      </section>
    )
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="relative h-56 bg-linear-to-br from-slate-950 via-blue-900 to-emerald-700">
        <img src={user.cover || DEFAULT_COVER} alt={`${user.name} cover`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/30" />
        <div className="absolute -bottom-14 left-6 flex items-end gap-4">
          <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-xl">
            {user.avatar ? (
              <img src={user.avatar} alt={`${user.name} avatar`} className="h-full w-full object-cover" />
            ) : (
              <span className="text-4xl font-black text-slate-400">{user.name?.charAt(0)?.toUpperCase()}</span>
            )}
          </div>
          <div className="pb-4 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">Homezy User</p>
            <h1 className="text-3xl font-black">{user.name}</h1>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-20">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Name</p>
            <p className="mt-1 font-black text-slate-950">{user.name}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 font-black text-slate-950">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <AvatarUpload user={user} onSave={(avatar) => updateUser({ avatar })} />
          <CoverUpload user={user} onSave={(cover) => updateUser({ cover })} />
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
