import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { problemDetail } from '~/presenter/schema/promlem-details'
import { userSchema } from '~/presenter/schema/user'
import { logger } from '~/utils/log'

export const updateUserRoute = createRoute({
  method: 'put',
  path: '/users/:id',
  operationId: 'updateUser',
  description: '指定したIdのUserを更新',
  tags: ['user'],
  request: {
    params: userSchema.pick({ id: true }),
    body: {
      content: {
        'application/json': {
          schema: userSchema.omit({ id: true }),
        },
      },
    },
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

export const updateUserHandler: RouteHandler<typeof updateUserRoute> = (ctx) => {
  const param = ctx.req.valid('param')
  const body = ctx.req.valid('json')
  logger.info({ body, param }, 'updateUserHandler')
  return ctx.json({ id: param.id, name: body.name })
}
