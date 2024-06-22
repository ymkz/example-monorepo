import type { PartialMessage, PlainMessage } from '@bufbuild/protobuf'
import { logger } from '~/helper/log'
import type { CreateUserRequest, CreateUserResponse } from '~/presenter/proto/user/v1/service_pb'

export const createUserUsecase = async (
	req: PlainMessage<CreateUserRequest>,
): Promise<PartialMessage<CreateUserResponse>> => {
	logger.debug({ displayName: req.displayName })

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
