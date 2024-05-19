import type mysql from 'mysql2/promise'
import type { RowDataPacket } from 'mysql2/promise'

type Client = mysql.Connection | mysql.Pool

export const listUsersQuery = `-- name: ListUsers :many
SELECT id, display_name, created_at, updated_at, deleted_at
FROM users`

export interface ListUsersRow {
	id: number
	displayName: string
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
}

export async function listUsers(client: Client): Promise<ListUsersRow[]> {
	const [rows] = await client.query<RowDataPacket[]>({
		sql: listUsersQuery,
		values: [],
		rowsAsArray: true,
	})
	return rows.map((row) => {
		return {
			id: row[0],
			displayName: row[1],
			createdAt: row[2],
			updatedAt: row[3],
			deletedAt: row[4],
		}
	})
}

export const getUserQuery = `-- name: GetUser :one
SELECT id, display_name, created_at, updated_at, deleted_at
FROM users
WHERE id = ?
LIMIT 1`

export interface GetUserArgs {
	id: number
}

export interface GetUserRow {
	id: number
	displayName: string
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
}

export async function getUser(client: Client, args: GetUserArgs): Promise<GetUserRow | null> {
	const [rows] = await client.query<RowDataPacket[]>({
		sql: getUserQuery,
		values: [args.id],
		rowsAsArray: true,
	})
	if (rows.length !== 1) {
		return null
	}
	const row = rows[0]
	return {
		id: row[0],
		displayName: row[1],
		createdAt: row[2],
		updatedAt: row[3],
		deletedAt: row[4],
	}
}

export const getUserByLastInsertIdQuery = `-- name: GetUserByLastInsertId :one
SELECT id, display_name, created_at, updated_at, deleted_at
FROM users
WHERE id = LAST_INSERT_ID()
LIMIT 1`

export interface GetUserByLastInsertIdRow {
	id: number
	displayName: string
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
}

export async function getUserByLastInsertId(client: Client): Promise<GetUserByLastInsertIdRow | null> {
	const [rows] = await client.query<RowDataPacket[]>({
		sql: getUserByLastInsertIdQuery,
		values: [],
		rowsAsArray: true,
	})
	if (rows.length !== 1) {
		return null
	}
	const row = rows[0]
	return {
		id: row[0],
		displayName: row[1],
		createdAt: row[2],
		updatedAt: row[3],
		deletedAt: row[4],
	}
}

export const createUserQuery = `-- name: CreateUser :exec
INSERT INTO users (display_name)
VALUES (?)`

export interface CreateUserArgs {
	displayName: string
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<void> {
	await client.query({
		sql: createUserQuery,
		values: [args.displayName],
	})
}

export const updateUserDisplayNameQuery = `-- name: UpdateUserDisplayName :exec
UPDATE users
SET display_name = ?
WHERE id = ?`

export interface UpdateUserDisplayNameArgs {
	displayName: string
	id: number
}

export async function updateUserDisplayName(client: Client, args: UpdateUserDisplayNameArgs): Promise<void> {
	await client.query({
		sql: updateUserDisplayNameQuery,
		values: [args.displayName, args.id],
	})
}

export const deleteUserQuery = `-- name: DeleteUser :exec
DELETE FROM users
WHERE id = ?`

export interface DeleteUserArgs {
	id: number
}

export async function deleteUser(client: Client, args: DeleteUserArgs): Promise<void> {
	await client.query({
		sql: deleteUserQuery,
		values: [args.id],
	})
}
