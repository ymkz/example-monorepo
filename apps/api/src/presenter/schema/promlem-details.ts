import { z } from "@hono/zod-openapi"

/**
 * @see https://tex2e.github.io/rfc-translater/html/rfc9457.html
 */
export const ProblemDetailSchema = z
	.object({
		title: z
			.string()
			.openapi({ description: "主要なエラーの要因のメッセージ" }),
		type: z
			.string()
			.openapi({ description: "呼び出し元APIの定義しているエラーコード" }),
		detail: z
			.string()
			.openapi({ description: "エラーの詳細に関するメッセージ" }),
		status: z
			.number()
			.int()
			.min(400)
			.max(600)
			.openapi({ description: "HTTPステータスコード", example: 500 }),
	})
	.openapi("ProblemDetails", { description: "Problem Details (RFC9457)" })
