import BetterSqlite3 from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import type { Logger } from 'drizzle-orm/logger'
import { schema } from '~/gateway/db/factory/schema'
import { logger } from '~/utils/log'

class DrizzleLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger.info({ query, params }, 'sql executed')
  }
}

const sqlite = new BetterSqlite3('db/db.sqlite')

export const db = drizzle(sqlite, { schema, logger: new DrizzleLogger() })