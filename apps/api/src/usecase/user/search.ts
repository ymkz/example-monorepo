import type { Pool } from 'mysql2/promise'
import { listUsers } from '../../gateway/db/users_sql'
import { convertFromDate } from '../../helper/dayjs'
import type { User } from '../../presenter/schema/user'

export const userSearchUsecase = async (client: Pool): Promise<User[]> => {
	const users = await listUsers(client)

	return users.map((user) => ({
		id: user.id,
		displayName: user.displayName,
		createdAt: convertFromDate(user.createdAt),
		updatedAt: user.updatedAt ? convertFromDate(user.updatedAt) : undefined,
		deletedAt: user.deletedAt ? convertFromDate(user.deletedAt) : undefined,
	}))
}
