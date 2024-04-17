import { eq } from 'drizzle-orm'
import { db } from '~/gateway/db/factory/instance'
import { users } from '~/gateway/db/factory/schema'

// TODO: tableのschemaから導出できないか？drizzle-zodとかつかうべきかも
export type UserEntity = {
  id: number
  name: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string
}

export const userRepository = {
  search: async (limit = 10, offset = 0) => {
    return await db.query.users.findMany({ limit, offset })
  },
  find: async (id: number) => {
    return await db.query.users.findFirst({ where: eq(users.id, id) })
  },
  create: async (name: string) => {
    return await db.insert(users).values({ name }).returning()
  },
  update: async (id: number, name?: string) => {
    return await db.update(users).set({ name }).where(eq(users.id, id)).returning()
  },
  remove: async (id: number) => {
    return await db.delete(users).where(eq(users.id, id))
  },
}
