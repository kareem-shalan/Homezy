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
  const { isAuthenticated, logout } = useAuth()
  const visibleNavItems = navItems.filter((item) => item.auth === isAuthenticated)

  const getLinkClass = ({ isActive }) =>
    [
      'text-sm font-medium transition-colors',
      isActive ? 'text-primary-700' : 'text-neutral-600 hover:text-primary-700',
    ].join(' ')

  return (
    <header className="border-b border-neutral-100 bg-white/90 backdrop-blur">
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
            <Button
              variant="outline"
              className="px-4 py-2 text-sm cursor-pointer hover:bg-red-500 hover:text-white"
              onClick={() => {
                logout()
                navigate('/login') 
              }}
            >
              Logout
            </Button>
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
