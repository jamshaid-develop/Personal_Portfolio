import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/projects', label: 'Work' },
  { to: '/contact', label: 'Contact' },
] as const

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between py-6">
        <Link
          to="/"
          className="font-display text-lg tracking-tight text-foreground"
        >
          Odalys&nbsp;Marín
          <span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="underline-swipe pb-1 hover:text-foreground transition-colors [&.active]:text-foreground"
              activeOptions={{ exact: link.to === '/' }}
              activeProps={{ className: 'active text-foreground' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-6 flex flex-col gap-5 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: 'text-foreground' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
