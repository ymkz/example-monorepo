import type { ServiceImpl } from '@connectrpc/connect'
import type { UserService } from '~/presenter/proto/user/v1/service_connect'
import { createUser } from '~/presenter/user/createUser'
import { deleteUser } from '~/presenter/user/deleteUser'
import { findUser } from '~/presenter/user/findUser'
import { searchUser } from '~/presenter/user/searchUser'
import { updateUser } from '~/presenter/user/updateUser'

export const userService: ServiceImpl<typeof UserService> = {
	searchUser,
	findUser,
	createUser,
	updateUser,
	deleteUser,
}
