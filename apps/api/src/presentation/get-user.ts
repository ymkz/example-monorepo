import { RouteHandler, createRoute, z } from '@hono/zod-openapi'
import { logger } from '~/logger'
import { response400, response404, response500 } from '~/presentation/schema'

const response200 = z.object({
  name: z.string(),
})

export const getUserRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  operationId: 'getUserById',
  description: 'get user by user-id',
  tags: ['user'],
  request: {
    params: z.object({
      userId: z.string().min(1).max(8).openapi({ description: 'ユーザーID' }),
    }),
  },
  responses: {
    200: {
      description: '正常系',
      content: { 'application/json': { schema: response200 } },
    },
    400: {
      description: 'リクエスト異常',
      content: { 'application/json': { schema: response400 } },
    },
    404: {
      description: '存在しないユーザー',
      content: { 'application/json': { schema: response404 } },
    },
    500: {
      description: 'エラー',
      content: { 'application/json': { schema: response500 } },
    },
  },
})

export const getUserHandler: RouteHandler<typeof getUserRoute> = (ctx) => {
  const params = ctx.req.valid('param')
  logger.info({ params })
  return ctx.json({ name: 'john doe' })
}
