import {} from "hono"
import type { userUsecase } from "~/usecase/user"

declare module "hono" {
	interface Env {
		Variables: {
			usecase: {
				user: typeof userUsecase
			}
		}
	}
}
