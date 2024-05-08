import type { RouteHandler } from "@hono/zod-openapi"
import { z } from "@hono/zod-openapi"
import { createRoute } from "@hono/zod-openapi"
import { ProblemDetailSchema } from "~/presenter/schema/promlem-details"
import { UserSchema } from "~/presenter/schema/user"
import { logger } from "~/utils/log"

export const listUsersRoute = createRoute({
	method: "get",
	path: "/users",
	operationId: "listUsers",
	description: "Userの一覧を取得",
	tags: ["user"],
	request: {
		query: z.object({
			limit: z.coerce
				.number()
				.optional()
				.openapi({ description: "検索数上限" }),
			offset: z.coerce
				.number()
				.optional()
				.openapi({ description: "ページネーションのオフセット" }),
		}),
	},
	responses: {
		200: {
			description: "正常応答",
			content: { "application/json": { schema: z.array(UserSchema) } },
		},
		400: {
			description: "リクエスト不正",
			content: { "application/json": { schema: ProblemDetailSchema } },
		},
		500: {
			description: "エラー応答",
			content: { "application/json": { schema: ProblemDetailSchema } },
		},
	},
})

export const listUsersHandler: RouteHandler<typeof listUsersRoute> = async (
	ctx,
) => {
	const query = ctx.req.valid("query")
	const usecase = ctx.get("usecase")

	const users = await usecase.user.search(query.limit, query.offset)
	logger.info({ users }, "listUsersHandler")

	// TODO: usecaseから取得したものをレスポンスする
	return ctx.json([])
}
