import { AsyncLocalStorage } from 'node:async_hooks'

type ContextKey = 'reqId'

export const context = new AsyncLocalStorage<Map<ContextKey, string>>()
