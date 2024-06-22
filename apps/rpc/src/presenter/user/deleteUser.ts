import type { MethodImpl } from '@connectrpc/connect'
import type { UserService } from '../../presenter/proto/user/v1/service_connect'
import { deleteUserUsecase } from '../../usecase/user/deleteUser'

export const deleteUser: MethodImpl<typeof UserService.methods.deleteUser> = async (req, ctx) => {
	// TODO: バリデーション
	const result = await deleteUserUsecase({ userId: req.userId })
	return result
}
