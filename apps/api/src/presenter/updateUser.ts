import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { ProblemDetail } from '~/presenter/schema/promlem-details'
import { User } from '~/presenter/schema/user'
import { logger } from '~/utils/log'

export const updateUserRoute = createRoute({
  method: 'put',
  path: '/users/:id',
  operationId: 'updateUser',
  description: '指定したIdのUserを更新',
  tags: ['user'],
  request: {
    params: User.pick({ id: true }),
    body: {
      content: {
        'application/json': {
          schema: User.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '正常応答',
      content: { 'application/json': { schema: User } },
    },
    400: {
      description: 'リクエスト不正',
      content: { 'application/json': { schema: ProblemDetail } },
    },
    404: {
      description: '存在しないユーザー',
      content: { 'application/json': { schema: ProblemDetail } },
    },
    500: {
      description: 'エラー応答',
      content: { 'application/json': { schema: ProblemDetail } },
    },
  },
})

export const updateUserHandler: RouteHandler<typeof updateUserRoute> = (ctx) => {
  const param = ctx.req.valid('param')
  const body = ctx.req.valid('json')
  logger.info({ body, param }, 'updateUserHandler')
  return ctx.json({ id: param.id, name: body.name })
}
