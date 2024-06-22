import type { MethodImpl } from '@connectrpc/connect'
import type { UserService } from '../../presenter/proto/user/v1/service_connect'
import { createUserUsecase } from '../../usecase/user/createUser'

export const createUser: MethodImpl<typeof UserService.methods.createUser> = async (req, ctx) => {
	// TODO: バリデーション
	const result = await createUserUsecase({ displayName: req.displayName })
	return result
}
