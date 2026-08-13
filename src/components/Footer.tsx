import { Link } from '@tanstack/react-router'
import { Instagram, Github, Mail } from 'lucide-react'

const SOCIALS = [
  { href: 'https://instagram.com/odalysmarin.studio', label: 'Instagram', icon: Instagram },
  { href: 'https://github.com/odalysmarin', label: 'GitHub', icon: Github },
  { href: 'mailto:hello@odalysmarin.studio', label: 'Email', icon: Mail },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border mt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row gap-8 md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl">
            Let's make something worth looking at twice.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-3 font-mono text-xs uppercase tracking-[0.18em] text-primary underline-swipe"
          >
            Start a conversation →
          </Link>
        </div>

        <div className="flex items-center gap-5">
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-8 flex flex-col md:flex-row gap-2 justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
        <span>© {new Date().getFullYear()} Odalys Marín Studio</span>
        <span>Based in Oaxaca de Juárez, working worldwide</span>
      </div>
    </footer>
  )
}
