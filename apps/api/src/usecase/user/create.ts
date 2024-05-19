import type { Pool } from 'mysql2/promise'
import { createUser, getUserByLastInsertId } from '~/gateway/db/users_sql'
import type { CreateUserArgs } from '~/gateway/db/users_sql'
import { convertFromDate } from '~/helper/dayjs'
import type { User } from '~/presenter/schema/user'

export const userCreateUsecase = async (client: Pool, args: CreateUserArgs): Promise<User> => {
	await createUser(client, { displayName: args.displayName })

	const user = await getUserByLastInsertId(client)

	if (!user) {
		throw new Error('user not found')
	}

	return {
		id: user.id,
		displayName: user.displayName,
		createdAt: convertFromDate(user.createdAt),
		updatedAt: user.updatedAt ? convertFromDate(user.updatedAt) : undefined,
		deletedAt: user.deletedAt ? convertFromDate(user.deletedAt) : undefined,
	}
}
