import { fastifyConnectPlugin } from '@connectrpc/connect-fastify'
import { fastify } from 'fastify'
import { env } from './helper/env'
import { logger } from './helper/log'
import { routes } from './presenter'
import { healthcheckRoute } from './presenter/health'

const app = fastify({ logger })

await app.register(healthcheckRoute)
await app.register(fastifyConnectPlugin, { routes })

await app.listen({ host: env.HOSTNAME, port: env.PORT }).then(() => {
	logger.info(`ready on http://${env.HOSTNAME}:${env.PORT}`)
})
