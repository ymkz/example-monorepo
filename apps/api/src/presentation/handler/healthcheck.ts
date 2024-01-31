import { Hono } from 'hono'

export const healthcheckHandler = new Hono().get('/health', (ctx) => {
  if (process.env.HEALTHCHECK_UP === 'true') {
    return ctx.text('UP', 200)
  }
  return ctx.text('DOWN', 503)
})
