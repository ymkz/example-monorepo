import { writeFileSync } from 'node:fs'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { OpenAPIHono } from '@hono/zod-openapi'
import { showRoutes } from 'hono/dev'
import { secureHeaders } from 'hono/secure-headers'
import { register } from 'prom-client'
import { stringify } from 'yaml'
import { getUserByIdHandler, getUserByIdRoute } from '~/presenter/getUserById'
import { errorHandler, notFoundHandler, validationHook } from '~/presenter/hook'
import { listUsersHandler, listUsersRoute } from '~/presenter/listUsers'
import { accessLogger } from '~/presenter/middleware/logger'
import { accessMetrics } from '~/presenter/middleware/metrics'
import { env } from '~/utils/env'
import { logger } from '~/utils/log'

const app = new OpenAPIHono({ defaultHook: validationHook })

app.use(secureHeaders())
app.use(accessMetrics())
app.use(accessLogger())

app.notFound(notFoundHandler)
app.onError(errorHandler)

app.openapi(listUsersRoute, listUsersHandler)
app.openapi(getUserByIdRoute, getUserByIdHandler)

app.get('/health', (ctx) => {
  if (env.HEALTHCHECK === 'UP') {
    return ctx.text('UP', { status: 200 })
  }
  return ctx.text('DOWN', { status: 503 })
})
app.get('/metrics', async (ctx) => {
  const metrics = await register.metrics()
  return ctx.text(metrics)
})

if (env.APP_ENV === 'local') {
  const openapiDocument = app.getOpenAPIDocument({
    openapi: '3.0.3',
    info: { version: '1.0.0', title: 'API Specification', description: 'TBD' },
    servers: [{ url: 'http://localhost:5000', description: 'ローカル環境' }],
    tags: [{ name: 'user' }],
  })
  writeFileSync('spec/openapi.json', JSON.stringify(openapiDocument, null, 2))
  writeFileSync('spec/openapi.yaml', stringify(openapiDocument))
  app.use('/spec/*', serveStatic())
}

serve({ fetch: app.fetch, hostname: '0.0.0.0', port: env.PORT }, () => {
  showRoutes(app)
  logger.info(
    `ready on http://localhost:${env.PORT} NODE_ENV=${env.NODE_ENV} APP_ENV=${env.APP_ENV}`,
  )
})
