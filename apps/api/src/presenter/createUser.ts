import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { ProblemDetail } from '~/presenter/schema/promlem-details'
import { User } from '~/presenter/schema/user'
import { logger } from '~/utils/log'

export const createUserRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  description: 'Userを作成',
  tags: ['user'],
  request: {
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
    500: {
      description: 'エラー応答',
      content: { 'application/json': { schema: ProblemDetail } },
    },
  },
})

export const createUserHandler: RouteHandler<typeof createUserRoute> = (ctx) => {
  const body = ctx.req.valid('json')
  logger.info({ body }, 'createUserHandler')
  return ctx.json({ id: 'TODO', name: body.name })
}
