import type { FastifyPluginAsync } from 'fastify'
import { env } from '~/helper/env'

export const healthcheckRoute: FastifyPluginAsync = async (app) => {
	app.route({
		method: 'GET',
		url: '/',
		handler: async (_, reply) => {
			if (env.HEALTHCHECK === 'UP') {
				return reply.status(200).send('UP')
			}
			return reply.status(503).send('DOWN')
		},
	})
	app.route({
		method: 'GET',
		url: '/health',
		handler: async (_, reply) => {
			if (env.HEALTHCHECK === 'UP') {
				return reply.status(200).send('UP')
			}
			return reply.status(503).send('DOWN')
		},
	})
}
