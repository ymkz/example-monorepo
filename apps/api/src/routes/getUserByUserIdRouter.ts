import type { ListUsersQueryParams } from '@app/schema'
import { getUserByUserIdPathParamsSchema } from '@app/schema'
import { createRouter, eventHandler, getValidatedQuery } from 'h3'

export const getUserByUserIdRouter = createRouter().get(
  '/users',
  eventHandler(async (event) => {
    const query = await getValidatedQuery<ListUsersQueryParams>(
      event,
      getUserByUserIdPathParamsSchema.parse,
    )
    return { limit: query.limit, offset: query.offset }
  }),
)
