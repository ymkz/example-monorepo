import type { NotFoundHandler } from "hono"
import { logger } from "~/utils/log"

export const notFoundHandler: NotFoundHandler = (ctx) => {
	logger.warn(
		{ notfoundRequest: { url: ctx.req.url, method: ctx.req.method } },
		"存在しないリソースへのリクエストが発生しました",
	)
	return ctx.json(
		{
			title: "Not Found",
			type: "DEFAULT",
			detail: "requested resource not found",
			status: 404,
		},
		404,
	)
}
