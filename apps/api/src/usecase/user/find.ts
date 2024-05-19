import type { Pool } from 'mysql2/promise'
import { getUser } from '~/gateway/db/users_sql'
import type { GetUserArgs } from '~/gateway/db/users_sql'
import { convertFromDate } from '~/helper/dayjs'
import type { User } from '~/presenter/schema/user'

export const userFindUsecase = async (client: Pool, args: GetUserArgs): Promise<User> => {
	const user = await getUser(client, { id: args.id })

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
