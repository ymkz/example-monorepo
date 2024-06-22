import type { PartialMessage, PlainMessage } from '@bufbuild/protobuf'
import { logger } from '~/helper/log'
import type { SearchUserRequest, SearchUserResponse } from '~/presenter/proto/user/v1/service_pb'

export const searchUserUsecase = async (
	req: PlainMessage<SearchUserRequest>,
): Promise<PartialMessage<SearchUserResponse>> => {
	logger.debug({ limit: req.limit, offset: req.offset })

	return {
		users: [
			{
				id: 1,
				displayName: 'John Doe',
				// createdAt: '',
				// updatedAt: '',
				// deletedAt: '',
			},
		],
	}
}
