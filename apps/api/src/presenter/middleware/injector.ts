import { createMiddleware } from "hono/factory"
import { userUsecase } from "~/usecase/user"

export const variableInjector = () => {
	return createMiddleware(async (ctx, next) => {
		ctx.set("usecase", { user: userUsecase })

		await next()
	})
}
