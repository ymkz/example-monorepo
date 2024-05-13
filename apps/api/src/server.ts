import { serve } from '@hono/node-server'
import { showRoutes } from 'hono/dev'
import { app } from '~/presenter'
import { env } from '~/utility/env'
import { logger } from '~/utility/log'
import { writeDocument } from '~/utility/openapi'

writeDocument(app)
showRoutes(app)
serve({ fetch: app.fetch, hostname: env.HOSTNAME, port: env.PORT })

logger.info(
	`ready on http://${env.HOSTNAME}:${env.PORT} NODE_ENV=${env.NODE_ENV} APP_ENV=${env.APP_ENV}`,
)
