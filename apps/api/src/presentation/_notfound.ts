import type { NotFoundHandler } from 'hono'
import { logger } from '~/logger'

export const notfoundHandler: NotFoundHandler = (ctx) => {
  logger.warn(
    { req: { url: ctx.req.url, method: ctx.req.method } },
    '存在しないパスへのリクエストが発生しました',
  )
  return ctx.json(
    {
      title: '存在しないパスへのリクエストが発生しました',
      type: 'requested_not_found',
      detail: `method=${ctx.req.method} url=${ctx.req.url}`,
      status: 404,
    },
    404,
  )
}
