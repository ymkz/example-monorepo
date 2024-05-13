import { userRepository } from '~/gateway/db/user'

export const userUsecase = {
	search: async (limit = 10, offset = 0) => {
		const result = await userRepository.search(limit, offset)
		return result
	},
	find: async (id: number) => {
		const result = await userRepository.find(id)
		return result
	},
	create: async (name: string) => {
		const result = await userRepository.create(name)
		return result
	},
	update: async (id: number, name?: string) => {
		const result = await userRepository.update(id, name)
		return result
	},
	remove: async (id: number) => {
		await userRepository.remove(id)
	},
}
