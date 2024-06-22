import type { Pool } from 'mysql2/promise'
import { deleteUser } from '../../gateway/db/users_sql'
import type { DeleteUserArgs } from '../../gateway/db/users_sql'

export const userDeleteUsecase = async (client: Pool, args: DeleteUserArgs): Promise<void> => {
	await deleteUser(client, { id: args.id })
}
