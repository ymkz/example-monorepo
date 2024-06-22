import type { MethodImpl } from '@connectrpc/connect'
import type { UserService } from '../../presenter/proto/user/v1/service_connect'
import { searchUserUsecase } from '../../usecase/user/searchUser'

export const searchUser: MethodImpl<typeof UserService.methods.searchUser> = async (req, ctx) => {
	// TODO: バリデーション
	const result = await searchUserUsecase({ limit: req.limit, offset: req.offset })
	return result
}
