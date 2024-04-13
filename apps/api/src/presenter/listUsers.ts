import type { RouteHandler } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { problemDetail } from '~/presenter/schema'
import { userSchema } from '~/presenter/schema/user'

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
      content: { 'application/json': { schema: z.array(userSchema) } },
    },
    400: {
      description: 'リクエスト不正',
      content: { 'application/json': { schema: problemDetail } },
    },
    500: {
      description: 'エラー応答',
      content: { 'application/json': { schema: problemDetail } },
    },
  },
})

export const listUsersHandler: RouteHandler<typeof listUsersRoute> = (ctx) => {
  const query = ctx.req.valid('query')
  return ctx.json([
    { id: 'user1', name: 'john' },
    { id: 'user2', name: 'doe' },
  ])
}