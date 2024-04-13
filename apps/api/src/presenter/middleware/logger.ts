import { createMiddleware } from 'hono/factory'
import { logger } from '~/utils/log'

const IGNORE_PATHS = ['/health', '/metrics', '/favicon.ico']

const duration = (start: number) => {
  const delta = performance.now() - start
  return Number.parseFloat(delta.toFixed(6)) // 小数点第6位まで四捨五入して丸める
}

export const accessLogger = () => {
  return createMiddleware(async (ctx, next) => {
    if (IGNORE_PATHS.includes(ctx.req.path)) {
      return await next()
    }

    const start = performance.now()

    const requestInfo = { url: ctx.req.url, method: ctx.req.method }
    logger.info({ access: { ...requestInfo } }, 'request incoming')
    await next()
    const responseInfo = { status: ctx.res.status, durationMs: duration(start) }
    logger.info({ access: { ...requestInfo, ...responseInfo } }, 'request completed')
  })
}
