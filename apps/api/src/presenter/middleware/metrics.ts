import { createMiddleware } from 'hono/factory'
import { Summary, collectDefaultMetrics } from 'prom-client'

collectDefaultMetrics()

const summary = new Summary({
	name: 'http_server_requests_seconds',
	help: 'http_server_requests_seconds duration summary of api responses labeled with: status_code, method, path',
	labelNames: ['status_code', 'method', 'path'],
	percentiles: [0.5, 0.95, 0.99],
	maxAgeSeconds: 300,
	ageBuckets: 5,
})

const IGNORE_PATH = /^\/(favicon|health|metrics|spec)/

export const accessMetrics = () => {
	return createMiddleware(async (ctx, next) => {
		if (IGNORE_PATH.test(ctx.req.path)) return await next()

		const measure = summary.startTimer({
			method: ctx.req.method,
			path: ctx.req.path,
		})
		await next()
		measure({ status_code: ctx.res.status })
	})
}
