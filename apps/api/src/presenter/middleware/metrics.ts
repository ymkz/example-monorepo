import { createMiddleware } from 'hono/factory'
import { Summary, collectDefaultMetrics } from 'prom-client'

collectDefaultMetrics()

const IGNORE_PATHS = ['/health', '/metrics', '/spec', '/favicon.ico']

const summary = new Summary({
  name: 'http_server_requests_seconds',
  help: 'http_server_requests_seconds duration summary of api responses labeled with: status_code, method, path',
  labelNames: ['status_code', 'method', 'path'],
  percentiles: [0.5, 0.95, 0.99],
  maxAgeSeconds: 300,
  ageBuckets: 5,
})

export const accessMetrics = () => {
  return createMiddleware(async (ctx, next) => {
    for (const ignorePath of IGNORE_PATHS) {
      if (ctx.req.path.startsWith(ignorePath)) {
        return await next()
      }
    }

    const measure = summary.startTimer({ method: ctx.req.method, path: ctx.req.path })
    await next()
    measure({ status_code: ctx.res.status })
  })
}
