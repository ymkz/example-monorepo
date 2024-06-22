import type { PartialMessage, PlainMessage } from '@bufbuild/protobuf'
import { logger } from '~/helper/log'
import type { DeleteUserRequest, DeleteUserResponse } from '~/presenter/proto/user/v1/service_pb'

export const deleteUserUsecase = async (
	req: PlainMessage<DeleteUserRequest>,
): Promise<PartialMessage<DeleteUserResponse>> => {
	logger.debug({ userId: req.userId })

	return {
		success: true,
	}
}
