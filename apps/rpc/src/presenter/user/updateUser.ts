import type { MethodImpl } from '@connectrpc/connect'
import type { UserService } from '~/presenter/proto/user/v1/service_connect'
import { updateUserUsecase } from '~/usecase/user/updateUser'

export const updateUser: MethodImpl<typeof UserService.methods.updateUser> = async (req, ctx) => {
	// TODO: バリデーション
	const result = await updateUserUsecase({ userId: req.userId, displayName: req.displayName })
	return result
}
