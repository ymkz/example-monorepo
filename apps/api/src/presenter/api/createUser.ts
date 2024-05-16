import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { ProblemDetailSchema } from '~/presenter/schema/promlem-details'
import { UserSchema } from '~/presenter/schema/user'
import { logger } from '~/utility/log'

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

export const createUserHandler: RouteHandler<typeof createUserRoute> = async (
	ctx,
) => {
	const body = ctx.req.valid('json')
	const usecase = ctx.get('usecase')

	const user = await usecase.user.create(body.name)
	logger.info({ user }, 'createUserHandler')

	// TODO: usecaseから取得したものをレスポンスする
	return ctx.json({ id: 1, name: 'johndoe', createdAt: '2024-04-01T01:23:45Z' })
}
