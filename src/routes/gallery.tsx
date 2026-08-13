import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { X } from 'lucide-react'
import { optimizedImage } from '@/lib/images'

type Photo = {
  id: string
  src: string
  alt: string
  category: string
  aspect: 'tall' | 'wide' | 'square'
}

const PHOTOS: Array<Photo> = [
  { id: '1015', src: 'https://picsum.photos/id/1015/900/1200', alt: 'River bend cutting through canyon walls at dusk', category: 'Landscape', aspect: 'tall' },
  { id: '1025', src: 'https://picsum.photos/id/1025/1200/900', alt: 'Dog resting on a sunlit wooden porch', category: 'Portraits', aspect: 'wide' },
  { id: '1035', src: 'https://picsum.photos/id/1035/900/1200', alt: 'Pine forest fog rolling over a ridge', category: 'Landscape', aspect: 'tall' },
  { id: '1041', src: 'https://picsum.photos/id/1041/1000/1000', alt: 'Weathered stone archway at midday', category: 'Street', aspect: 'square' },
  { id: '1043', src: 'https://picsum.photos/id/1043/1200/900', alt: 'Tide pool detail with kelp and barnacles', category: 'Still Life', aspect: 'wide' },
  { id: '1047', src: 'https://picsum.photos/id/1047/900/1200', alt: 'Narrow stairwell lit by a single window', category: 'Street', aspect: 'tall' },
  { id: '1050', src: 'https://picsum.photos/id/1050/1000/1000', alt: 'Ceramic bowls stacked on a linen cloth', category: 'Still Life', aspect: 'square' },
  { id: '1059', src: 'https://picsum.photos/id/1059/1200/900', alt: 'Portrait lit by low window light', category: 'Portraits', aspect: 'wide' },
  { id: '1062', src: 'https://picsum.photos/id/1062/900/1200', alt: 'Terraced hillside at first light', category: 'Landscape', aspect: 'tall' },
  { id: '1069', src: 'https://picsum.photos/id/1069/1000/1000', alt: 'Citrus halves on a marble slab', category: 'Still Life', aspect: 'square' },
  { id: '1074', src: 'https://picsum.photos/id/1074/1200/900', alt: 'Market stall awning catching afternoon sun', category: 'Street', aspect: 'wide' },
  { id: '1080', src: 'https://picsum.photos/id/1080/900/1200', alt: 'Portrait against a plaster wall', category: 'Portraits', aspect: 'tall' },
]

const CATEGORIES = ['All', 'Portraits', 'Landscape', 'Still Life', 'Street'] as const

export const Route = createFileRoute('/gallery')({
  component: Gallery,
})

function Gallery() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const [active, setActive] = useState<Photo | null>(null)

  const visible = PHOTOS.filter((p) => filter === 'All' || p.category === filter)

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
            Selected Frames
          </p>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95]">
            Gallery
          </h1>
        </div>
        <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
          Twelve frames pulled from five years of shooting on location —
          portraits, landscape, still life, and street work. Click any image
          to view it full-frame.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 font-mono text-xs uppercase tracking-[0.15em]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border transition-colors cursor-pointer ${
              filter === cat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
        {visible.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setActive(photo)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm border border-border/60 bg-card animate-fade-up cursor-zoom-in"
            style={{ animationDelay: `${(i % 6) * 60}ms` }}
          >
            <img
              src={optimizedImage(photo.src, { w: 700, q: 80 })}
              srcSet={`${optimizedImage(photo.src, { w: 500, q: 78 })} 500w, ${optimizedImage(photo.src, { w: 900, q: 80 })} 900w`}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              alt={photo.alt}
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {photo.category}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 md:p-12"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <figure className="max-w-4xl max-h-full">
            <img
              src={optimizedImage(active.src, { w: 1400, q: 85 })}
              alt={active.alt}
              className="max-h-[80vh] w-auto mx-auto rounded-sm"
            />
            <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-white/60">
              {active.category} — {active.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
