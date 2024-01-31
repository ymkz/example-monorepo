import { writeFileSync } from 'node:fs'
import { CodeGenerator } from '@himenon/openapi-typescript-code-generator'
import { OpenApiResponses } from '@himenon/openapi-typescript-code-generator/$types/typedef/CodeGenerator'
import { Parameter } from '@himenon/openapi-typescript-code-generator/$types/typedef/OpenApi'
import type { JSONSchema7 } from 'json-schema'

const zodPrimitive = (type: JSONSchema7['type']) => {
  switch (type) {
    case 'string': {
      return '.string()'
    }
    case 'number': {
      return '.number()'
    }
    case 'integer': {
      return '.number().int()'
    }
    default: {
      return ''
    }
  }
}
const zodOptional = (param: boolean) => {
  return param ? '' : '.optional()'
}
const zodStringNumeric = (format?: string) => {
  return format === 'numeric' ? '.pipe(z.coerce.number())' : ''
}

const makeRequest = (params?: Parameter[]) => {
  if (!params?.length) {
    return ''
  }
  const queries = params.filter((param) => param.in === 'query')
  const queryString = queries.map((query) => {
    return `${query.name}: z.string()${zodStringNumeric(query.schema?.format)}${zodOptional(
      query.required,
    )}`
  })

  const paths = params.filter((param) => param.in === 'path')
  const pathString = paths.map((path) => {
    return `${path.name}: z.string()${zodStringNumeric(path.schema?.format)}${zodOptional(
      path.required,
    )}`
  })

  return `query: z.object({${queryString.join(',')}}),params: z.object({${pathString.join(',')}}),`
}

const makeResponses = (responses: OpenApiResponses) => {
  const response = Object.entries(responses).map(([statusCode, response]) => {
    const schema = response.content?.['application/json'].schema
    if (!schema?.properties) {
      return ''
    }
    const fields = Object.entries(schema.properties).map(([key, value]) => {
      if (value === false || value === true) {
        return ''
      }
      return `${key}: z${zodPrimitive(value.type)}`
    })
    return `'${statusCode}': { description: '${
      response.description
    }', content: { 'application/json': { schema: z.object({ ${fields.join(',')} }) } } }`
  })
  return response.join(',')
}

const run = () => {
  const input = 'spec/openapi.yaml'
  const output = '../../apps/api/src/presentation/route/index.ts'
  const functionSuffix = 'Route'

  const codeGenerator = new CodeGenerator(input)

  const code = codeGenerator.generateCode([
    {
      generator: (payload) => {
        return [
          `import { createRoute, z } from '@hono/zod-openapi'`,
          ...payload.map((operation) => {
            return `export const ${operation.operationId}${functionSuffix} = createRoute({
              operationId: '${operation.operationId}',
              method: '${operation.operationParams.httpMethod}',
              path: '${operation.operationParams.requestUri}',
              description: '${operation.operationParams.comment}',
              request: { ${makeRequest(operation.operationParams.parameters)} },
              responses: { ${makeResponses(operation.operationParams.responses)} },
            })`
          }),
        ]
      },
    },
  ])

  writeFileSync(output, code, { encoding: 'utf-8' })
}

run()
