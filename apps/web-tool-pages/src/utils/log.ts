import dayjs from 'dayjs'
import { pino } from 'pino'
import { env } from '~/utils/env'

const timestamp = () => {
	return dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ')
}

export const logger = pino({
	enabled: env.NODE_ENV !== 'test',
	level: env.LOG_LEVEL,
	timestamp: () => `,"time":"${timestamp()}"`,
	formatters: {
		level: (label) => ({ severity: label }),
		bindings: () => ({}),
	},
})
