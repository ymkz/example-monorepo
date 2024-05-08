import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	server: {
		// optional
		APP_PORT: z.number().int().positive().default(3000),
		METRICS_PORT: z.number().int().positive().default(3001),

		// config
		NODE_ENV: z.enum(["production", "development", "test"]),
		APP_ENV: z.enum(["local", "dev", "stg", "prod", "test"]),
		API_URL: z.string().url(),

		// k8s configmap
		HEALTHCHECK: z.enum(["UP", "DOWN"]),
	},
})
