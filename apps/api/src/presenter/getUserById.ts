import type { RouteHandler } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { problemDetail } from '~/presenter/schema'
import { userSchema } from '~/presenter/schema/user'
import { logger } from '~/utils/log'

export const getUserByIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  operationId: 'getUserByUserId',
  description: '指定したIdのUserを取得',
  tags: ['user'],
  request: {
    params: z.object({
      userId: z.string().min(1).max(8),
    }),
  },
  responses: {
    200: {
      description: '正常応答',
      content: { 'application/json': { schema: userSchema } },
    },
    400: {
      description: 'リクエスト不正',
      content: { 'application/json': { schema: problemDetail } },
    },
    404: {
      description: '存在しないユーザー',
      content: { 'application/json': { schema: problemDetail } },
    },
    500: {
      description: 'エラー応答',
      content: { 'application/json': { schema: problemDetail } },
    },
  },
})

export const getUserByIdHandler: RouteHandler<typeof getUserByIdRoute> = (ctx) => {
  const param = ctx.req.valid('param')
  logger.info('getUserByIdHandler')
  return ctx.json({ id: param.userId, name: 'john' })
}
