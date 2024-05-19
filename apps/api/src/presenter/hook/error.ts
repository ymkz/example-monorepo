import type { ErrorHandler } from 'hono'
import { logger } from '~/helper/log'

export const errorHandler: ErrorHandler = (err, ctx) => {
	logger.error({ unexpectedError: err.message }, '予期しないエラーが発生しました')
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
