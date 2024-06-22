import {} from 'hono'
import type { Pool } from 'mysql2/promise'
import type { userUsecase } from '../../usecase/user'

declare module 'hono' {
	interface Env {
		Variables: {
			usecase: { user: typeof userUsecase }
			client: { mysql: Pool }
		}
	}
}
