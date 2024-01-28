import { formatISO } from 'date-fns'
import { pino } from 'pino'

const timestamp = () => {
  return formatISO(new Date(), { format: 'extended' })
}

export const logger = pino({
  enabled: process.env.NODE_ENV !== 'test',
  timestamp: () => `,"time":"${timestamp()}"`,
  formatters: {
    level: (label) => {
      return { level: label }
    },
    bindings: () => {
      return {}
    },
  },
})
