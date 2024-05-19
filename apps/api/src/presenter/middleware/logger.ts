import { getRandomValues } from 'node:crypto'
import { createMiddleware } from 'hono/factory'
import { logger } from '~/helper/log'
import { context } from '~/helper/log/context'

const duration = (start: number) => {
	const delta = performance.now() - start
	return Number.parseFloat(delta.toFixed(6)) // 小数点第6位まで四捨五入して丸める
}

const randomId = () => {
	const uint32 = getRandomValues(new Uint32Array(1))[0]
	return uint32.toString(16) // 8桁のランダムな文字列を生成
}

const IGNORE_PATH = /^\/(favicon|health|metrics|spec)/

export const accessLogger = () => {
	return createMiddleware(async (ctx, next) => {
		if (IGNORE_PATH.test(ctx.req.path)) return await next()

		const start = performance.now()

		const requestInfo = { url: ctx.req.url, method: ctx.req.method }
		logger.info({ access: { ...requestInfo } }, 'request incoming')

		await next()

		const responseInfo = { status: ctx.res.status, durationMs: duration(start) }
		logger.info({ access: { ...requestInfo, ...responseInfo } }, 'request completed')
	})
}

export const contextRun = () => {
	return createMiddleware(async (_, next) => {
		return context.run(new Map(), next)
	})
}

export const requestContext = () => {
	return createMiddleware(async (ctx, next) => {
		const header = ctx.req.header()
		const reqId = header['X-Request-Id'] ?? randomId()
		context.getStore()?.set('reqId', reqId)
		await next()
	})
}
