import { defineConfig } from '@kubb/core'
import { definePlugin as createSwagger } from '@kubb/swagger'
import { definePlugin as createSwaggerTS } from '@kubb/swagger-ts'
import { definePlugin as createSwaggerZod } from '@kubb/swagger-zod'

export default defineConfig({
  hooks: {
    done: 'tsup',
  },
  input: {
    path: 'spec/openapi.yaml',
  },
  output: {
    path: 'build',
  },
  plugins: [
    createSwagger({
      output: false,
    }),
    createSwaggerTS({
      output: { path: 'type' },
    }),
    createSwaggerZod({
      output: { path: 'zod' },
    }),
  ],
})
