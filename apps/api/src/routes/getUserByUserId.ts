import type { GetUserByUserIdPathParams } from '@app/schema'
import { getUserByUserIdPathParamsSchema } from '@app/schema'
import { createRouter, eventHandler, getValidatedRouterParams } from 'h3'

export const getUserByUserIdRouter = createRouter().get(
  '/users/:userId',
  eventHandler(async (event) => {
    const param = await getValidatedRouterParams<GetUserByUserIdPathParams>(
      event,
      getUserByUserIdPathParamsSchema.parse,
    )
    return { userId: param.userId }
  }),
)
