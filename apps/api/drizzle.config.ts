import type { Config } from 'drizzle-kit'

export default {
	schema: 'src/gateway/db/factory/schema.ts',
	out: 'db/migration',
	dialect: 'sqlite',
	driver: 'expo',
} satisfies Config
