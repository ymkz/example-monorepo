import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { ProblemDetailSchema } from '~/domain/schema/promlem-details'
import { UserSchema } from '~/domain/schema/user'
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
          schema: UserSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '正常応答',
      content: { 'application/json': { schema: UserSchema } },
    },
    400: {
      description: 'リクエスト不正',
      content: { 'application/json': { schema: ProblemDetailSchema } },
    },
    500: {
      description: 'エラー応答',
      content: { 'application/json': { schema: ProblemDetailSchema } },
    },
  },
})

export const createUserHandler: RouteHandler<typeof createUserRoute> = async (ctx) => {
  const body = ctx.req.valid('json')
  logger.info({ body }, 'createUserHandler')
  return ctx.json({ id: 1, name: 'johndoe', createdAt: '2024-04-01T01:23:45Z' })
}