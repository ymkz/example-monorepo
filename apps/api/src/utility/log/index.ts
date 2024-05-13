import dayjs from 'dayjs'
import { pino } from 'pino'
import { env } from '~/utility/env'
import { context } from '~/utility/log/context'

export const logger = pino({
	enabled: env.NODE_ENV !== 'test',
	timestamp: () => `,"time":"${dayjs().toISOString()}"`,
	formatters: {
		level: (label) => {
			return { severity: label }
		},
		bindings: () => {
			return {}
		},
	},
	mixin: () => {
		return {
			reqId: context.getStore()?.get('reqId'),
		}
	},
})
