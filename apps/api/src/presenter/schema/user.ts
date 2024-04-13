import { z } from '@hono/zod-openapi'

export const userSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .openapi('User')
