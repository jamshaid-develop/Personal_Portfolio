import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowUpRight } from 'lucide-react'
import { optimizedImage } from '@/lib/images'

export const Route = createFileRoute('/')({
  component: Home,
})

const FEATURED_PHOTOS = [
  'https://picsum.photos/id/1015/800/1000',
  'https://picsum.photos/id/1050/800/1000',
  'https://picsum.photos/id/1059/800/1000',
]

function Home() {
  const featured = [...allProjects]
    .sort((a, b) => Number(b.year) - Number(a.year))
    .slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-6 animate-fade-up">
              Photographer &amp; Visual Designer — Oaxaca de Juárez
            </p>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight animate-fade-up [animation-delay:80ms]">
              I make images
              <br />
              that <span className="italic text-primary">sit still</span>
              <br />
              with you.
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-3 animate-fade-up [animation-delay:160ms]">
            <p className="text-muted-foreground leading-relaxed">
              I'm Odalys Marín — I shoot, design, and print. Ten years spent
              working between a camera and a layout grid, mostly for people
              who make things by hand.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-5 font-mono text-xs uppercase tracking-[0.15em] underline-swipe"
            >
              More about the work <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-24 md:mb-32">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {FEATURED_PHOTOS.map((src, i) => (
            <Link
              key={src}
              to="/gallery"
              className={`block overflow-hidden rounded-sm border border-border/60 group ${
                i === 1 ? 'mt-8 md:mt-14' : ''
              }`}
            >
              <img
                src={optimizedImage(src, { w: 600, h: 750, fit: 'cover', q: 78 })}
                alt="Photograph from the gallery"
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            to="/gallery"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground underline-swipe"
          >
            View full gallery →
          </Link>
        </div>
      </section>

      {/* Featured work */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-24 md:mb-32">
        <div className="flex items-end justify-between mb-10 border-b border-border pb-6">
          <h2 className="font-display text-3xl md:text-4xl">Recent work</h2>
          <Link
            to="/projects"
            className="hidden sm:inline font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground underline-swipe"
          >
            All projects →
          </Link>
        </div>

        <div className="space-y-0">
          {featured.map((project, i) => (
            <Link
              key={project._meta.path}
              to="/projects"
              className="group grid md:grid-cols-12 gap-4 md:gap-8 items-center py-8 border-b border-border/60"
            >
              <span className="md:col-span-1 font-mono text-xs text-muted-foreground">
                0{i + 1}
              </span>
              <div className="md:col-span-3 overflow-hidden rounded-sm">
                <img
                  src={optimizedImage(project.image, { w: 400, h: 300, fit: 'cover', q: 75 })}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="md:col-span-5 font-display text-2xl md:text-3xl group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <span className="md:col-span-2 font-mono text-xs text-muted-foreground uppercase tracking-wide">
                {project.role}
              </span>
              <span className="md:col-span-1 font-mono text-xs text-muted-foreground text-right">
                {project.year}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
