import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { errorHandler } from '~/presentation/_error'
import { notfoundHandler } from '~/presentation/_notfound'
import { validationHook } from '~/presentation/_validation'
import { getUserByUserIdHandler } from '~/presentation/handler/getUserByUserId'
import { healthcheckHandler } from '~/presentation/handler/healthcheck'
import { listUsersHandler } from '~/presentation/handler/listUsers'
import { getUserByUserIdRoute, listUsersRoute } from '~/presentation/route'

const app = new OpenAPIHono({ defaultHook: validationHook })

app.route('', healthcheckHandler)

app.notFound(notfoundHandler)
app.onError(errorHandler)

app.use('*', cors({ origin: ['http://localhost:2000'] }))

app.openapi(listUsersRoute, listUsersHandler)
app.openapi(getUserByUserIdRoute, getUserByUserIdHandler)

export { app }
