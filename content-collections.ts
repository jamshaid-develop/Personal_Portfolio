import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    year: z.string(),
    role: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().optional(),
    liveUrl: z.string().optional(),
    image: z.string(),
    content: z.string(),
  }),
})

export default defineConfig({
  collections: [projects],
})
