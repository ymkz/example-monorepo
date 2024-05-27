import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig(() => ({
	resolve: {
		alias: {
			'~': resolve(__dirname, 'app'),
		},
	},
	test: {
		restoreMocks: true,
		silent: true,
	},
}))
