import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	server: {
		// environment defaults
		HOSTNAME: z.string().default('localhost'),
		PORT: z.number().int().positive().default(5000),

		// configs
		NODE_ENV: z.enum(['production', 'development', 'test']),
		APP_ENV: z.enum(['local', 'dev', 'stg', 'prod', 'test']),
		DATABASE_URL: z.string(),

		// feature flags
		HEALTHCHECK: z.enum(['UP', 'DOWN']),
	},
})
