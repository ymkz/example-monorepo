import type { ConnectRouter } from '@connectrpc/connect'
import { UserService } from '../presenter/proto/user/v1/service_connect'
import { userService } from '../presenter/user'

export const routes = (router: ConnectRouter) => {
	router.service(UserService, userService)
}
