import { prometheus } from '@hono/prometheus'
import { Hono } from 'hono'

const prom = prometheus({
  collectDefaultMetrics: true,
})

export const registerMetrics = prom.registerMetrics
export const metricsHandler = new Hono().get('/metrics', prom.printMetrics)
