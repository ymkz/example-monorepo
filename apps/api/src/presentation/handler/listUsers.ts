import type { RouteHandler } from '@hono/zod-openapi'
import type { listUsersRoute } from '~/presentation/route'

export const listUsersHandler: RouteHandler<typeof listUsersRoute> = (ctx) => {
  return ctx.json({ name: 'john doe' })
}
