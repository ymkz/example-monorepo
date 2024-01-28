import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { OpenAPIObjectConfigure } from '@hono/zod-openapi'
import { app } from '~/presentation'

const openapi: OpenAPIObjectConfigure<object, ''> = {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'API仕様書',
    description: 'TBD',
    contact: { name: 'API Support' },
  },
  servers: [{ url: 'http://localhost:5000', description: 'ローカル環境' }],
  tags: [{ name: 'user' }],
}

export const writeOpenapiJson = () => {
  writeFileSync(
    resolve(process.cwd(), 'spec/openapi.json'),
    JSON.stringify(app.getOpenAPI31Document(openapi)),
  )
}

export const registerSpecOpenapiJson = () => {
  app.doc31('/spec/openapi.json', openapi)
}

export const registerSpec = () => {
  app.get('/spec', (ctx) => {
    return ctx.html(`<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>API仕様書</title>
  <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
  <style>
    elements-api {
      display: block;
      height: 100dvh;
    }
  </style>
</head>
<body>
  <elements-api apiDescriptionUrl="/spec/openapi.json" router="hash" />
</body>
</html>`)
  })
}
