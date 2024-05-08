import type { RouteHandler } from "@hono/zod-openapi"
import { createRoute } from "@hono/zod-openapi"
import { ProblemDetailSchema } from "~/presenter/schema/promlem-details"
import { UserSchema } from "~/presenter/schema/user"
import { logger } from "~/utils/log"

export const updateUserRoute = createRoute({
	method: "put",
	path: "/users/:id",
	operationId: "updateUser",
	description: "指定したIdのUserを更新",
	tags: ["user"],
	request: {
		params: UserSchema.pick({ id: true }),
		body: {
			content: {
				"application/json": {
					schema: UserSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "正常応答",
			content: { "application/json": { schema: UserSchema } },
		},
		400: {
			description: "リクエスト不正",
			content: { "application/json": { schema: ProblemDetailSchema } },
		},
		404: {
			description: "存在しないユーザー",
			content: { "application/json": { schema: ProblemDetailSchema } },
		},
		500: {
			description: "エラー応答",
			content: { "application/json": { schema: ProblemDetailSchema } },
		},
	},
})

export const updateUserHandler: RouteHandler<typeof updateUserRoute> = async (
	ctx,
) => {
	const param = ctx.req.valid("param")
	const body = ctx.req.valid("json")
	const usecase = ctx.get("usecase")

	const user = await usecase.user.update(param.id, body.name)
	logger.info({ user }, "updateUserHandler")

	// TODO: usecaseから取得したものをレスポンスする
	return ctx.json({ id: 1, name: "johndoe", createdAt: "2024-04-01T01:23:45Z" })
}
