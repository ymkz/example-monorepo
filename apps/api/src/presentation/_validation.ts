import { Context } from 'hono'
import { ZodError } from 'zod'
import { logger } from '~/logger'

export const validationHook = (
  result: { success: true; data: unknown } | { success: false; error: ZodError },
  ctx: Context,
) => {
  if (!result.success) {
    logger.warn(result.error.flatten(), 'バリデーションエラーが発生しました')
    return ctx.json(
      {
        title: 'バリデーションエラーが発生しました',
        type: 'validation_failed',
        detail: '', // TODO: zod error to string
        status: 400,
      },
      400,
    )
  }
}
