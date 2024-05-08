import type { Config } from "drizzle-kit"

export default {
	schema: "src/gateway/db/factory/schema.ts",
	out: "db/migration",
	driver: "better-sqlite",
} satisfies Config
