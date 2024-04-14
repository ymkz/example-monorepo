import { z } from '@hono/zod-openapi'

export const User = z
  .object({
    id: z.string().min(1).max(8),
    name: z.string().min(1).max(24),
  })
  .openapi('User')
