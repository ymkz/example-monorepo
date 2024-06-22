import { serve } from '@hono/node-server'
import { showRoutes } from 'hono/dev'
import { env } from './helper/env'
import { logger } from './helper/log'
import { writeDocument } from './helper/openapi'
import { app } from './presenter'

writeDocument(app)
showRoutes(app)
serve({ fetch: app.fetch, hostname: env.HOSTNAME, port: env.PORT })

logger.info(`ready on http://${env.HOSTNAME}:${env.PORT} NODE_ENV=${env.NODE_ENV} APP_ENV=${env.APP_ENV}`)
