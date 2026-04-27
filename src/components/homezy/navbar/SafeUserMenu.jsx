import { useState } from 'react'
import useAuth from '../../../hooks/homezy/useAuth'

const SafeUserMenu = ({ onLoginClick, onProfileClick }) => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return (
      <button
        type="button"
        onClick={onLoginClick}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md active:scale-[0.98]"
      >
        Login / Register
      </button>
    )
  }

  const fallbackInitial = user.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
      >
        <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-linear-to-br from-blue-700 to-slate-950 text-sm font-black text-white">
          {user.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : fallbackInitial}
        </span>
        <span className="hidden max-w-28 truncate text-sm font-black text-slate-800 sm:block">{user.name}</span>
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-100 p-4">
            <p className="truncate text-sm font-black text-slate-950">{user.name}</p>
            <p className="truncate text-xs font-semibold text-slate-500">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              onProfileClick?.()
            }}
            className="block w-full px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
          >
            Profile
          </button>

          <button
            type="button"
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            className="block w-full px-4 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default SafeUserMenu
