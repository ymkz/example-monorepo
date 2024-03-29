import * as Types from '@himenon/openapi-typescript-code-generator/dist/types'

const zodPrimitive = (type: Types.OpenApi.JSONSchema['type']) => {
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

const makeRequest = (params?: Types.CodeGenerator.OpenApiOperation['parameters']) => {
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

const makeResponses = (responses: Types.CodeGenerator.OpenApiOperation['responses']) => {
  const response = Object.entries(responses).map(([statusCode, response]) => {
    const schema = response.content?.['application/json']?.schema
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

export const template: Types.CodeGenerator.CustomGenerator<unknown> = {
  generator: (payload) => {
    return [
      `import { createRoute, z } from '@hono/zod-openapi'`,
      ...payload.map((operation) => {
        return `export const ${operation.operationId}Route = createRoute({
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
}
