import type { Pool } from 'mysql2/promise'
import { getUser, updateUserDisplayName } from '../../gateway/db/users_sql'
import type { UpdateUserDisplayNameArgs } from '../../gateway/db/users_sql'
import { convertFromDate } from '../../helper/dayjs'
import type { User } from '../../presenter/schema/user'

export const userUpdateUsecase = async (client: Pool, args: UpdateUserDisplayNameArgs): Promise<User> => {
	await updateUserDisplayName(client, { id: args.id, displayName: args.displayName })

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
