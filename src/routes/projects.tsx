import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ExternalLink, Github } from 'lucide-react'
import { optimizedImage } from '@/lib/images'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const projects = [...allProjects].sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="mb-16 md:mb-20 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
          Selected Work
        </p>
        <h1 className="font-display text-5xl md:text-6xl leading-[0.95] mb-5">
          Projects
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Branding, editorial, and print work made for clients who care about
          the details as much as I do.
        </p>
      </div>

      <div className="space-y-24 md:space-y-32">
        {projects.map((project, i) => (
          <article
            key={project._meta.path}
            className={`grid md:grid-cols-12 gap-6 md:gap-10 items-center ${
              i % 2 === 1 ? 'md:[&>*:first-child]:col-start-8' : ''
            }`}
          >
            <div
              className={`md:col-span-7 overflow-hidden rounded-sm border border-border/60 ${
                i % 2 === 1 ? 'md:col-start-6' : ''
              }`}
            >
              <img
                src={optimizedImage(project.image, { w: 1000, h: 750, fit: 'cover', q: 80 })}
                srcSet={`${optimizedImage(project.image, { w: 700, h: 525, fit: 'cover', q: 78 })} 700w, ${optimizedImage(project.image, { w: 1100, h: 825, fit: 'cover', q: 80 })} 1100w`}
                sizes="(min-width: 768px) 58vw, 100vw"
                alt={project.title}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className={`md:col-span-5 ${
                i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''
              }`}
            >
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
                <span>{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{project.role}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                {project.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono uppercase tracking-wide px-3 py-1 rounded-full border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary underline-swipe"
                  >
                    <ExternalLink size={15} />
                    View project
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground underline-swipe"
                  >
                    <Github size={15} />
                    Source
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
