import type { ErrorHandler } from 'hono'
import { logger } from '~/logger'

export const errorHandler: ErrorHandler = (err, ctx) => {
  logger.error(err, '予期しないエラーが発生しました')
  return ctx.json(
    {
      title: '予期しないエラーが発生しました',
      type: 'unexpected_error_occurred',
      detail: err.message,
      status: 500,
    },
    500,
  )
}
