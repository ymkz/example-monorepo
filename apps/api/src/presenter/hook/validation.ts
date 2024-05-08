import type { Hook } from "@hono/zod-openapi"
import type { Env } from "hono"
import { fromZodError } from "zod-validation-error"
import { logger } from "~/utils/log"

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
