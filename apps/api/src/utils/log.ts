import dayjs from 'dayjs'
import { pino } from 'pino'
import { env } from '~/utils/env'

const timestamp = () => {
  return dayjs().toISOString()
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
})
