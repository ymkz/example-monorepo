import type { z } from '@hono/zod-openapi'
import { eq } from 'drizzle-orm'
import { isNotNull } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { db } from '~/gateway/db/factory/instance'
import { users } from '~/gateway/db/factory/schema'

export const userRepository = {
	search: async (limit = 10, offset = 0) => {
		const result = await db
			.select()
			.from(users)
			.where(isNotNull(users.deletedAt))
			.limit(limit)
			.offset(offset)
		return result
	},
	find: async (id: number) => {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.id, id))
			.limit(1)
		return !result.length ? undefined : result[0]
	},
	create: async (name: string) => {
		return await db.insert(users).values({ name }).returning()
	},
	update: async (id: number, name?: string) => {
		return await db
			.update(users)
			.set({ name })
			.where(eq(users.id, id))
			.returning()
	},
	remove: async (id: number) => {
		return await db.delete(users).where(eq(users.id, id))
	},
}

const UserEntitySchema = createSelectSchema(users)

export type UserEntity = z.infer<typeof UserEntitySchema>
