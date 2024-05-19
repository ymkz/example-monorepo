import { userCreateUsecase } from '~/usecase/user/create'
import { userDeleteUsecase } from '~/usecase/user/delete'
import { userFindUsecase } from '~/usecase/user/find'
import { userSearchUsecase } from '~/usecase/user/search'
import { userUpdateUsecase } from '~/usecase/user/update'

export const userUsecase = {
	search: userSearchUsecase,
	find: userFindUsecase,
	create: userCreateUsecase,
	update: userUpdateUsecase,
	delete: userDeleteUsecase,
}
