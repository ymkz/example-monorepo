import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { ProblemDetailSchema } from '../../presenter/schema/promlem-details'
import { UserSchema } from '../../presenter/schema/user'

export const removeUserRoute = createRoute({
	method: 'delete',
	path: '/users/{id}',
	operationId: 'removeUser',
	description: '指定したIdのUserを削除',
	tags: ['user'],
	request: {
		params: UserSchema.pick({ id: true }),
	},
	responses: {
		204: {
			description: '正常応答',
		},
		400: {
			description: 'リクエスト不正',
			content: { 'application/json': { schema: ProblemDetailSchema } },
		},
		404: {
			description: '存在しないユーザー',
			content: { 'application/json': { schema: ProblemDetailSchema } },
		},
		500: {
			description: 'エラー応答',
			content: { 'application/json': { schema: ProblemDetailSchema } },
		},
	},
})

export const removeUserHandler: RouteHandler<typeof removeUserRoute> = async (ctx) => {
	const param = ctx.req.valid('param')
	const usecase = ctx.get('usecase')
	const client = ctx.get('client')

	await usecase.user.delete(client.mysql, {
		id: param.id,
	})

	return ctx.body(null, 204)
}
