import url from 'node:url'
import express from 'express'
import promBundle from 'express-prom-bundle'
import next from 'next'
import { env } from '~/utils/env'
import { logger } from '~/utils/log'

const dev = env.NODE_ENV !== 'production'
const hostname = 'localhost'
const appPort = env.APP_PORT
const metricsPort = env.METRICS_PORT

const nextServer = next({ dev, hostname, port: appPort })
const handle = nextServer.getRequestHandler()

const metricsMiddleware = promBundle({
  autoregister: false,
  includePath: true,
  includeMethod: true,
  excludeRoutes: ['/health', '/favicon.ico', /\/_next/],
  normalizePath: [],
  percentiles: [0.5, 0.95, 0.99],
  metricType: 'summary',
  maxAgeSeconds: 300,
  ageBuckets: 5,
  promClient: { collectDefaultMetrics: {} },
})

const healthcheckHandler = express.Router().get('/health', (_, res) => {
  if (env.HEALTHCHECK === 'UP') {
    return res.status(200).send('UP')
  }
  return res.status(503).send('DOWN')
})

nextServer.prepare().then(() => {
  const app = express()
  app.disable('x-powered-by')
  app.use(metricsMiddleware)
  app.use(healthcheckHandler)
  app.all('*', (req, res) => handle(req, res, url.parse(req.url, true)))

  const metrics = express()
  metrics.disable('x-powered-by')
  metrics.get('/metrics', metricsMiddleware.metricsMiddleware)

  app.listen(appPort, () => {
    logger.info(
      `app ready on http://${hostname}:${appPort} NODE_ENV=${env.NODE_ENV} APP_ENV=${env.APP_ENV}`,
    )
  })

  metrics.listen(metricsPort, () => {
    logger.info(`metrics ready on http://${hostname}:${metricsPort}/metrics`)
  })
})
