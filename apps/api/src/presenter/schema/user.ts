import { z } from '@hono/zod-openapi'

export const UserSchema = z
	.object({
		id: z.coerce.number().int().positive().openapi({
			description: 'ユーザーID',
			example: 1,
		}),
		displayName: z.string().min(1).max(24).openapi({
			description: '名前',
			example: 'johndoe',
		}),
		createdAt: z.string().openapi({
			description: '作成日時（ISO8601）',
			example: '2024-04-01T01:23:45+09:00',
		}),
		updatedAt: z.string().optional().openapi({
			description: '更新日時（ISO8601）（更新されるたびに更新日時が入る）',
			example: '2024-04-01T01:23:45+09:00',
		}),
		deletedAt: z.string().optional().openapi({
			description: '削除日時（ISO8601）（論理削除されたら削除日時が入る）',
			example: '2024-04-01T01:23:45+09:00',
		}),
	})
	.openapi('User')

export type User = z.infer<typeof UserSchema>
