import { createMiddleware } from 'hono/factory'

export const accessMetrics = () => {
  return createMiddleware(async (ctx, next) => {
    await next()
  })
}
