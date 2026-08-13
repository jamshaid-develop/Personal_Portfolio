import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Odalys Marín — Photographer & Visual Designer',
      },
      {
        name: 'description',
        content:
          'Portfolio of Odalys Marín — photography, visual design, and selected projects. Based in Oaxaca de Juárez, working worldwide.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-grain">
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
