import { OpenAPIHono } from '@hono/zod-openapi'
import { errorHandler } from '~/presentation/_error'
import { notfoundHandler } from '~/presentation/_notfound'
import { validationHook } from '~/presentation/_validation'
import { getUserHandler, getUserRoute } from '~/presentation/get-user'
import { ListUsersHandler, listUsersRoute } from '~/presentation/list-users'
import { healthcheckHandler } from './healthcheck'

const app = new OpenAPIHono({ defaultHook: validationHook })

app.notFound(notfoundHandler)
app.onError(errorHandler)

app.route('', healthcheckHandler)

app.openapi(listUsersRoute, ListUsersHandler)
app.openapi(getUserRoute, getUserHandler)

export { app }
