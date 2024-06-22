import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	server: {
		// environment defaults
		HOSTNAME: z.string().default('localhost'),
		PORT: z.number().int().positive().default(6000),
		LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),

		// configs
		NODE_ENV: z.enum(['production', 'development', 'test']),
		APP_ENV: z.enum(['local', 'dev', 'stg', 'prod', 'test']),
		HEALTHCHECK: z.enum(['UP', 'DOWN']),
	},
})
