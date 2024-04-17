import type { RouteHandler } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { userRepository } from '~/gateway/db/user'
import { ProblemDetail } from '~/presenter/schema/promlem-details'
import { User } from '~/presenter/schema/user'

export const listUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
  description: 'Userの一覧を取得',
  tags: ['user'],
  request: {
    query: z.object({
      limit: z.coerce.number().optional().openapi({ description: '検索数上限' }),
      offset: z.coerce.number().optional().openapi({ description: 'ページネーションのオフセット' }),
    }),
  },
  responses: {
    200: {
      description: '正常応答',
      content: { 'application/json': { schema: z.array(User) } },
    },
    400: {
      description: 'リクエスト不正',
      content: { 'application/json': { schema: ProblemDetail } },
    },
    500: {
      description: 'エラー応答',
      content: { 'application/json': { schema: ProblemDetail } },
    },
  },
})

export const listUsersHandler: RouteHandler<typeof listUsersRoute> = async (ctx) => {
  const query = ctx.req.valid('query')

  const results = await userRepository.search(query.limit, query.offset)

  return ctx.json(results.map((result) => ({ id: result.id, name: result.name })))
}
