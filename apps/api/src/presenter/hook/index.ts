import type { Hook } from "@hono/zod-openapi"
import type { Env, ErrorHandler, NotFoundHandler } from "hono"
import { fromZodError } from "zod-validation-error"
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

export const errorHandler: ErrorHandler = (err, ctx) => {
	logger.error(
		{ unexpectedError: err.message },
		"予期しないエラーが発生しました",
	)
	return ctx.json(
		{
			title: "Internal Server Error",
			type: "DEFAULT",
			detail: "unexpected error has occurred",
			status: 500,
		},
		500,
	)
}

export const validationHook: Hook<unknown, Env, "", unknown> = (
	result,
	ctx,
) => {
	if (!result.success) {
		const { details, message } = fromZodError(result.error)
		logger.warn(
			{ validationError: details },
			"バリデーションでエラーが発生しました",
		)
		return ctx.json(
			{
				title: "Bad Request",
				type: "DEFAULT",
				detail: message,
				status: 400,
			},
			400,
		)
	}
}
