import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { ProblemDetailSchema } from '~/presenter/schema/promlem-details'
import { UserSchema } from '~/presenter/schema/user'

export const updateUserRoute = createRoute({
	method: 'put',
	path: '/users/:id',
	operationId: 'updateUser',
	description: '指定したIdのUserを更新',
	tags: ['user'],
	request: {
		params: UserSchema.pick({ id: true }),
		body: {
			content: {
				'application/json': {
					schema: UserSchema.omit({
						id: true,
						createdAt: true,
						updatedAt: true,
						deletedAt: true,
					}),
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
		404: {
			description: '存在しないユーザー',
			content: { 'application/json': { schema: ProblemDetailSchema } },
		},
		500: {
			description: 'エラー応答',
			content: { 'application/json': { schema: ProblemDetailSchema } },
		},
		// FIXME: https://github.com/honojs/middleware/issues/527 のため一時的に回避
		999: {
			description: 'WORKAROUND',
		},
	},
})

export const updateUserHandler: RouteHandler<typeof updateUserRoute> = async (ctx) => {
	const param = ctx.req.valid('param')
	const body = ctx.req.valid('json')
	const usecase = ctx.get('usecase')
	const client = ctx.get('client')

	const user = await usecase.user.update(client.mysql, {
		id: param.id,
		displayName: body.displayName,
	})

	return ctx.json(user)
}
