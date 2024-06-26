import { OpenAPIHono } from '@hono/zod-openapi'
import { register } from 'prom-client'
import { env } from '../helper/env'
import { createUserHandler, createUserRoute } from '../presenter/api/createUser'
import { getUserByIdHandler, getUserByIdRoute } from '../presenter/api/getUserById'
import { listUsersHandler, listUsersRoute } from '../presenter/api/listUsers'
import { removeUserHandler, removeUserRoute } from '../presenter/api/removeUser'
import { updateUserHandler, updateUserRoute } from '../presenter/api/updateUser'
import { errorHandler } from '../presenter/hook/error'
import { notFoundHandler } from '../presenter/hook/notfound'
import { validationHook } from '../presenter/hook/validation'
import { variableInjector } from '../presenter/middleware/injector'
import { accessLogger, contextRun, requestContext } from '../presenter/middleware/logger'
import { accessMetrics } from '../presenter/middleware/metrics'

export const app = new OpenAPIHono({ defaultHook: validationHook })

app.use(contextRun())
app.use(requestContext())
app.use(accessLogger())
app.use(accessMetrics())
app.use(variableInjector())

app.notFound(notFoundHandler)
app.onError(errorHandler)

app.openapi(listUsersRoute, listUsersHandler)
app.openapi(getUserByIdRoute, getUserByIdHandler)
app.openapi(createUserRoute, createUserHandler)
app.openapi(updateUserRoute, updateUserHandler)
app.openapi(removeUserRoute, removeUserHandler)

app.get('/health', (ctx) => {
	if (env.HEALTHCHECK === 'UP') {
		return ctx.text('UP', 200)
	}
	return ctx.text('DOWN', 503)
})

app.get('/metrics', async (ctx) => {
	const metrics = await register.metrics()
	return ctx.text(metrics)
})
