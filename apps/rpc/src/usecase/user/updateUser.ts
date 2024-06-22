import type { PartialMessage, PlainMessage } from '@bufbuild/protobuf'
import { logger } from '~/helper/log'
import type { UpdateUserRequest, UpdateUserResponse } from '~/presenter/proto/user/v1/service_pb'

export const updateUserUsecase = async (
	req: PlainMessage<UpdateUserRequest>,
): Promise<PartialMessage<UpdateUserResponse>> => {
	logger.debug({ userId: req.userId, displayName: req.displayName })

	return {
		user: {
			id: 1,
			displayName: 'John Doe',
			// createdAt: '',
			// updatedAt: '',
			// deletedAt: '',
		},
	}
}
