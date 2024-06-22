import type { MethodImpl } from '@connectrpc/connect'
import type { UserService } from '../../presenter/proto/user/v1/service_connect'
import { findUserUsecase } from '../../usecase/user/findUser'

export const findUser: MethodImpl<typeof UserService.methods.findUser> = async (req, ctx) => {
	// TODO: バリデーション
	const result = await findUserUsecase({ userId: req.userId })
	return result
}
