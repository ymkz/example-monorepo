import { createServer } from 'node:http'
import { createApp, toNodeListener } from 'h3'
import { getUserByUserIdRouter } from '~/routes/getUserByUserId'
import { healthcheckRouter } from '~/routes/healthcheck'
import { listUsersRouter } from '~/routes/listUsers'
import { env } from '~/utils/env'
import { logger } from '~/utils/log'

const app = createApp({
  onError(error, event) {
    logger.error(error, 'エラーが発生しました')
  },
})

// const metricsMiddleware = defineNodeMiddleware(() => {
//   promBundle({
//     httpDurationMetricName: 'http_client_request_duration_seconds',
//     includePath: true,
//     includeMethod: true,
//     excludeRoutes: ['/health', '/favicon.ico', /\/_next/],
//     normalizePath: [],
//     percentiles: [0.5, 0.95, 0.99],
//     metricType: 'summary',
//     maxAgeSeconds: 300,
//     ageBuckets: 5,
//     promClient: { collectDefaultMetrics: {} },
//   })
// })
// app.use(fromNodeMiddleware(metricsMiddleware))

app.use(healthcheckRouter)
app.use(listUsersRouter)
app.use(getUserByUserIdRouter)

createServer(toNodeListener(app))
  .listen(env.PORT)
  .on('listening', () => {
    logger.info(
      `app ready on http://localhost:${env.PORT} with NODE_ENV=${env.NODE_ENV} APP_ENV=${env.APP_ENV}`,
    )
  })
