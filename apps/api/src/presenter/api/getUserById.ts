import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { ProblemDetailSchema } from '../../presenter/schema/promlem-details'
import { UserSchema } from '../../presenter/schema/user'

export const getUserByIdRoute = createRoute({
	method: 'get',
	path: '/users/{id}',
	operationId: 'getUserById',
	description: '指定したIdのUserを取得',
	tags: ['user'],
	request: {
		params: UserSchema.pick({ id: true }),
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

export const getUserByIdHandler: RouteHandler<typeof getUserByIdRoute> = async (ctx) => {
	const param = ctx.req.valid('param')
	const usecase = ctx.get('usecase')
	const client = ctx.get('client')

	const user = await usecase.user.find(client.mysql, {
		id: param.id,
	})

	return ctx.json(user)
}
