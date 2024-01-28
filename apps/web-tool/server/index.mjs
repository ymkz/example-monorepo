import url from 'node:url'
import express from 'express'
import promBundle from 'express-prom-bundle'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const appPort = Number(process.env.APP_PORT) || 3000
const metricsPort = Number(process.env.METRICS_PORT) || 3001

const nextServer = next({ dev, hostname, port: appPort })
const handle = nextServer.getRequestHandler()

const metricsMiddleware = promBundle({
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
  if (process.env.HEALTHCHECK_UP === 'true') {
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
    console.info(
      `> app ready on http://${hostname}:${appPort} with NODE_ENV=${process.env.NODE_ENV} APP_ENV=${process.env.APP_ENV}`,
    )
  })
  metrics.listen(metricsPort, () => {
    console.info(`> metrics ready on http://${hostname}:${metricsPort}/metrics`)
  })
})
