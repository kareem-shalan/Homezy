import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from './Button'
import Container from './Container'
import { useAuth } from '../context'

const navItems = [
  { label: 'Home', to: '/home', auth: true },
  { label: 'Properties', to: '/properties', auth: true },
  { label: 'Student Hub', to: '/student', auth: true },
  { label: 'Login', to: '/login', auth: false },
  { label: 'Register', to: '/register', auth: false },
]

const Navbar = ({ showSwitchRole = true }) => {
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const visibleNavItems = navItems.filter((item) => item.auth === isAuthenticated)
  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || 'U'

  const getLinkClass = ({ isActive }) =>
    [
      'text-sm font-medium transition-colors',
      isActive ? 'text-primary-700' : 'text-neutral-600 hover:text-primary-700',
    ].join(' ')

  return (
    <header className="relative z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to={isAuthenticated ? '/home' : '/login'} className="text-2xl flex items-center justify-between gap-3 font-bold text-primary-800">
          <img src="/Logo.png" alt="Homezy" className="h-[100px] w-full object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {visibleNavItems.map((item) => (
            <NavLink key={item.label} to={item.to} className={getLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {showSwitchRole ? (
          isAuthenticated ? (
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1 pl-1 pr-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-primary-700 text-sm font-black text-white">
                  {user?.avatar ? <img src={user.avatar} alt={user.fullName} className="h-full w-full object-cover" /> : userInitial}
                </span>
                <span className="hidden max-w-28 truncate text-sm font-bold text-neutral-700 sm:block">{user?.fullName}</span>
              </button>

              {isUserMenuOpen ? (
                <div
                  className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-2xl ring-1 ring-black/5"
                  role="menu"
                >
                  <div className="border-b border-neutral-100 bg-neutral-50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-primary-700 text-sm font-black text-white">
                        {user?.avatar ? <img src={user.avatar} alt={user.fullName} className="h-full w-full object-cover" /> : userInitial}
                      </span>
                      <span className="rounded-full bg-success/10 px-2 py-1 text-[11px] font-bold text-success">Logged in</span>
                    </div>
                    <p className="truncate text-sm font-bold text-neutral-900">{user?.fullName}</p>
                    <p className="truncate text-xs text-neutral-500">{user?.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      navigate('/profile')
                    }}
                    className="block w-full px-4 py-3 text-left text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-primary-700"
                    role="menuitem"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      logout()
                      navigate('/login')
                    }}
                    className="block w-full border-t border-neutral-100 px-4 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Button variant="outline" className="px-4 py-2 text-sm" onClick={() => navigate('/login')}>
              Login
            </Button>
          )
        ) : (
          <div className="w-24" />
        )}
      </Container>
    </header>
  )
}

export default Navbar
