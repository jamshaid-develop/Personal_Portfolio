import { createFileRoute } from '@tanstack/react-router'
import { optimizedImage } from '@/lib/images'

export const Route = createFileRoute('/about')({
  component: About,
})

const SKILLS = [
  'Film & Digital Photography',
  'Editorial Layout',
  'Brand Identity',
  'Risograph Printing',
  'Photo Editing',
  'Signage & Environmental Graphics',
]

const TIMELINE = [
  { year: '2016', text: 'Started shooting weddings and small-run zines out of a borrowed darkroom in Puebla.' },
  { year: '2019', text: 'Opened a two-person design studio focused on packaging for independent makers.' },
  { year: '2022', text: 'Published Peninsula Field Guide — first full editorial project, shot solo over eleven months.' },
  { year: '2025', text: 'Studio now based in Oaxaca de Juárez, taking on identity, editorial, and photography work worldwide.' },
]

function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-24">
        <div className="md:col-span-5">
          <div className="relative">
            <img
              src={optimizedImage('https://picsum.photos/id/1027/900/1100', {
                w: 700,
                h: 850,
                fit: 'cover',
                q: 82,
              })}
              alt="Odalys Marín at the studio worktable"
              className="w-full rounded-sm border border-border/60"
            />
            <div className="absolute -bottom-5 -right-5 hidden md:block bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] px-4 py-3 rounded-sm">
              10 yrs behind the lens
            </div>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">
            About
          </p>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95] mb-6">
            Slow work,
            <br />
            made on purpose.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm Odalys Marín, a photographer and visual designer working
            between Oaxaca de Juárez and wherever the next project happens to
            be. Most of my clients make things with their hands — potters,
            small hotels, chamber musicians, publishers — and I try to design
            at the same pace they work.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            That usually means shooting on location instead of in a studio,
            printing on paper stock you can feel, and turning down projects
            that need to move faster than the work can be done well.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-24 md:mb-28 border-t border-border pt-10">
        <h2 className="font-display text-2xl mb-6">What I do</h2>
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full border border-border text-sm font-mono uppercase tracking-wide text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-border pt-10">
        <h2 className="font-display text-2xl mb-10">A rough timeline</h2>
        <div className="space-y-0">
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className="grid md:grid-cols-12 gap-4 py-6 border-b border-border/60 animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="md:col-span-2 font-display text-3xl text-primary">
                {item.year}
              </span>
              <p className="md:col-span-10 text-muted-foreground leading-relaxed max-w-2xl">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
