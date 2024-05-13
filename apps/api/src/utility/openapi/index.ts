import { writeFileSync } from 'node:fs'
import { serveStatic } from '@hono/node-server/serve-static'
import type { OpenAPIHono } from '@hono/zod-openapi'
import { stringify } from 'yaml'
import { env } from '~/utility/env'

export function writeDocument(app: OpenAPIHono) {
	if (env.APP_ENV !== 'local') return

	const document = app.getOpenAPIDocument({
		openapi: '3.0.3',
		info: { version: '1.0.0', title: 'API Specification', description: 'TBD' },
		servers: [{ url: 'http://localhost:5000', description: 'ローカル環境' }],
		tags: [{ name: 'user' }],
	})

	writeFileSync('spec/openapi.json', JSON.stringify(document, null, 2))
	writeFileSync('spec/openapi.yaml', stringify(document))

	app.use('/spec/*', serveStatic())
}
