import { createMiddleware } from 'hono/factory'
import { createPool } from 'mysql2/promise'
import { env } from '~/helper/env'
import { userUsecase } from '~/usecase/user'

export const variableInjector = () => {
	const pool = createPool({
		// ConnectionOptions
		host: env.MYSQL_HOST,
		user: env.MYSQL_USER,
		database: env.MYSQL_DATABASE,
		password: env.MYSQL_PASSWORD,
		port: 3306,
		enableKeepAlive: true,
		keepAliveInitialDelay: 0,

		// PoolOptions
		waitForConnections: true,
		connectionLimit: 10,
		maxIdle: 10,
		idleTimeout: 60000,
		queueLimit: 0,
	})

	return createMiddleware(async (ctx, next) => {
		ctx.set('usecase', { user: userUsecase })
		ctx.set('client', { mysql: pool })

		await next()
	})
}
