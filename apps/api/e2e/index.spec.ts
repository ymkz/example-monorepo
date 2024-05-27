import { GenericContainer } from 'testcontainers'
import type { StartedTestContainer } from 'testcontainers'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe.skip('E2E', () => {
	let container: StartedTestContainer

	beforeAll(async () => {
		container = await new GenericContainer('mysql:8.4').withExposedPorts(3306).withStartupTimeout(120_000).start()
	})

	afterAll(async () => {
		await container.stop()
	})

	test('test', async () => {
		expect(1 + 1).toBe(2)
	})
})
