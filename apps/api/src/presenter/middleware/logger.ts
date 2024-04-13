import { createMiddleware } from 'hono/factory'
import { logger } from '~/utils/log'

const IGNORE_PATHS = ['/health', '/favicon.ico']

export const accessLogger = () => {
  return createMiddleware(async (ctx, next) => {
    if (IGNORE_PATHS.includes(ctx.req.path)) {
      return await next()
    }

    const requestInfo = { url: ctx.req.url, method: ctx.req.method }

    logger.info({ access: { ...requestInfo } }, 'request incoming')
    await next()
    logger.info({ access: { ...requestInfo, status: ctx.res.status } }, 'request completed')
  })
}
