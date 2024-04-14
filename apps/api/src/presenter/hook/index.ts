import type { Context, ErrorHandler, NotFoundHandler } from 'hono'
import type { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { logger } from '~/utils/log'

export const notFoundHandler: NotFoundHandler = (ctx) => {
  logger.warn(
    { req: { url: ctx.req.url, method: ctx.req.method } },
    '存在しないリソースへのリクエストが発生しました',
  )
  return ctx.json(
    {
      title: 'Not Found',
      type: 'DEFAULT',
      detail: 'requested resource not found',
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
      type: 'DEFAULT',
      detail: 'unexpected error has occurred',
      status: 500,
    },
    500,
  )
}

type Result = { success: true; data: unknown } | { success: false; error: ZodError }

export const validationHook = (result: Result, ctx: Context) => {
  if (!result.success) {
    logger.warn(
      { validationError: fromZodError(result.error).details },
      'バリデーションでエラーが発生しました',
    )
    return ctx.json(
      {
        title: 'Bad Request',
        type: 'DEFAULT',
        detail: fromZodError(result.error).message,
        status: 500,
      },
      400,
    )
  }
}
