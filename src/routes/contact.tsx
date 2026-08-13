import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Send, Instagram, Github, Mail, MapPin } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const SOCIALS = [
  { href: 'https://instagram.com/odalysmarin.studio', label: 'Instagram', icon: Instagram, handle: '@odalysmarin.studio' },
  { href: 'https://github.com/odalysmarin', label: 'GitHub', icon: Github, handle: 'odalysmarin' },
  { href: 'mailto:hello@odalysmarin.studio', label: 'Email', icon: Mail, handle: 'hello@odalysmarin.studio' },
]

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="grid md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
            Get In Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95] mb-6">
            Say hello.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-sm">
            Currently booking editorial and identity projects for early next
            year. Send a note with a rough idea of scope and timeline — I
            reply within two or three days.
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 font-mono uppercase tracking-wide text-xs">
            <MapPin size={14} />
            Oaxaca de Juárez, Mexico
          </div>

          <div className="space-y-4">
            {SOCIALS.map(({ href, label, icon: Icon, handle }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <span className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary transition-colors">
                  <Icon size={15} />
                </span>
                <span className="text-sm">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="underline-swipe">{handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          {submitted ? (
            <div className="border border-border rounded-sm p-10 text-center bg-card">
              <div className="w-14 h-14 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-5">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl mb-2">Message sent.</h2>
              <p className="text-muted-foreground mb-6">
                Thanks for writing in — I'll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 border border-border rounded-sm hover:border-primary hover:text-primary transition-colors font-mono text-xs uppercase tracking-[0.15em]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={(e) => {
                e.preventDefault()
                setError(false)
                const form = e.currentTarget
                const formData = new FormData(form)
                fetch('/contact.html', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams(
                    formData as unknown as Record<string, string>,
                  ).toString(),
                })
                  .then(() => setSubmitted(true))
                  .catch(() => setError(true))
              }}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-colors placeholder:text-muted-foreground/50"
                  placeholder="Mireille Solano"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-colors placeholder:text-muted-foreground/50"
                  placeholder="mireille@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="Tell me about the project, timeline, and budget range..."
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">
                  Something went wrong sending that — please try again or
                  email directly.
                </p>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors font-mono text-xs uppercase tracking-[0.15em]"
              >
                <Send size={14} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
