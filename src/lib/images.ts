type ImageOpts = {
  w?: number
  h?: number
  fit?: 'contain' | 'cover' | 'fill'
  q?: number
  fm?: 'avif' | 'jpg' | 'png' | 'webp' | 'gif' | 'blurhash'
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
}

export function optimizedImage(url: string, opts: ImageOpts = {}) {
  const params = new URLSearchParams({ url })
  if (opts.w) params.set('w', String(opts.w))
  if (opts.h) params.set('h', String(opts.h))
  if (opts.fit) params.set('fit', opts.fit)
  if (opts.q) params.set('q', String(opts.q))
  if (opts.fm) params.set('fm', opts.fm)
  if (opts.position) params.set('position', opts.position)
  return `/.netlify/images?${params.toString()}`
}
