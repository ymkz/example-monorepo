import type { PartialMessage, PlainMessage } from '@bufbuild/protobuf'
import { logger } from '../../helper/log'
import type { FindUserRequest, FindUserResponse } from '../../presenter/proto/user/v1/service_pb'

export const findUserUsecase = async (
	req: PlainMessage<FindUserRequest>,
): Promise<PartialMessage<FindUserResponse>> => {
	logger.debug({ userId: req.userId })

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
