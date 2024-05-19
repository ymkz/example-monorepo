import dayjs from 'dayjs'
import { pino } from 'pino'
import { env } from '~/helper/env'
import { context } from '~/helper/log/context'

const timestamp = () => {
	// タイムゾーンはJST
	// ミリ秒は6桁の精度とする
	return dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ')
}

export const logger = pino({
	enabled: env.NODE_ENV !== 'test',
	timestamp: () => `,"time":"${timestamp()}"`,
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
