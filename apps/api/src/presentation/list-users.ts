import { RouteHandler, createRoute, z } from '@hono/zod-openapi'
import { response400, response500 } from '~/presentation/schema'

const response200 = z.object({
  name: z.string(),
})

export const listUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
  description: 'list users',
  tags: ['user'],
  responses: {
    200: {
      description: '正常系',
      content: { 'application/json': { schema: response200 } },
    },
    400: {
      description: 'リクエスト異常',
      content: { 'application/json': { schema: response400 } },
    },
    500: {
      description: 'エラー',
      content: { 'application/json': { schema: response500 } },
    },
  },
})

export const ListUsersHandler: RouteHandler<typeof listUsersRoute> = (ctx) => {
  return ctx.json({ name: 'john doe' })
}
