import type { ListUsersQueryParams } from '@app/schema'
import { listUsersQueryParamsSchema } from '@app/schema'
import { createRouter, eventHandler, getValidatedQuery } from 'h3'

export const listUsersRouter = createRouter().get(
  '/users',
  eventHandler(async (event) => {
    const query = await getValidatedQuery<ListUsersQueryParams>(
      event,
      listUsersQueryParamsSchema.parse,
    )
    return { limit: query.limit, offset: query.offset }
  }),
)
