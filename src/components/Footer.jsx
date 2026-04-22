import Container from './Container'

const links = ['About Us', 'Safety Standards', 'Eco-Living Initiatives', 'Help Center', 'Privacy']

const Footer = () => {
  return (
    <footer className="mt-16 rounded-t-3xl bg-neutral-100 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-2xl font-bold text-primary-800">Homezy</p>
          <p className="mt-2 max-w-xs text-sm text-neutral-600">
            © 2026 Homezy. Curating Modern Egyptian Living.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm text-neutral-600">
          {links.map((link) => (
            <a key={link} href="#" className="hover:text-primary-700">
              {link}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  )
}

export default Footer
