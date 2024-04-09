import { createRouter, eventHandler, setResponseStatus } from 'h3'
import { env } from '~/utils/env'

export const healthcheckRouter = createRouter().get(
  '/health',
  eventHandler((event) => {
    if (env.HEALTHCHECK === 'UP') {
      setResponseStatus(event, 200)
      return 'UP'
    }

    setResponseStatus(event, 503)
    return 'DOWN'
  }),
)
