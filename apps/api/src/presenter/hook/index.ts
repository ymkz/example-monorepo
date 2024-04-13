import type { Context, ErrorHandler, NotFoundHandler } from 'hono'
import type { ZodError } from 'zod'
// import { fromZodError } from 'zod-validation-error'
import { logger } from '~/utils/log'

export const notFoundHandler: NotFoundHandler = (ctx) => {
  logger.warn(
    { req: { url: ctx.req.url, method: ctx.req.method } },
    '存在しないパスへのリクエストが発生しました',
  )
  return ctx.json(
    {
      title: 'Not Found',
      type: 'E_NOTFOUND',
      detail: 'requested path not found',
      status: 404,
    },
    404,
  )
}

export const errorHandler: ErrorHandler = (err, ctx) => {
  logger.error(err, '予期しないエラーが発生しました')
  return ctx.json(
    {
      title: 'Internal Server Error',
      type: 'E_INTERNALSERVERERROR',
      detail: 'an unexpected error has occurred',
      status: 500,
    },
    500,
  )
}

type Result = { success: true; data: unknown } | { success: false; error: ZodError }

export const validationHook = (result: Result, ctx: Context) => {
  if (!result.success) {
    logger.warn(result.error.flatten(), 'バリデーションでエラーが発生しました')
    return ctx.json(
      {
        title: 'Bad Request',
        type: 'E_BADREQUEST',
        detail: result.error.message,
        status: 500,
        // reason: fromZodError(result.error).message,
      },
      400,
    )
  }
}
