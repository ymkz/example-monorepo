import { RouteHandler } from '@hono/zod-openapi'
import { logger } from '~/logger'
import { getUserByUserIdRoute } from '~/presentation/route'

export const getUserByUserIdHandler: RouteHandler<typeof getUserByUserIdRoute> = (ctx) => {
  const params = ctx.req.valid('param')
  logger.info({ params })
  return ctx.json({ name: 'john doe' })
}
