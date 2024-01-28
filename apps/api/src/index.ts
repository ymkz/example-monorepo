import { serve } from '@hono/node-server'
import { showRoutes } from 'hono/dev'
import { logger } from '~/logger'
import { app } from '~/presentation'
import { registerSpec, registerSpecOpenapiJson, writeOpenapiJson } from './openapi'

if (process.env.APP_ENV === 'local') {
  registerSpecOpenapiJson()
  registerSpec()
  writeOpenapiJson()
}

serve(
  {
    fetch: app.fetch,
    hostname: '0.0.0.0',
    port: Number(process.env.PORT) || 5000,
  },
  (info) => {
    showRoutes(app)
    logger.info(
      `ready on http://localhost:${info.port} with NODE_ENV=${process.env.NODE_ENV} APP_ENV=${process.env.APP_ENV}`,
    )
  },
)
