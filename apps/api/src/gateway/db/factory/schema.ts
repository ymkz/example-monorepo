import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdAt: text('created_at').default(sql`(DATETIME('now', 'localtime'))`),
	updatedAt: text('updated_at'),
	deletedAt: text('deleted_at'),
})

export const schema = {
	users,
}
