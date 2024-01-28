import { z } from '@hono/zod-openapi'

const problemDetail = z
  .object({
    title: z.string().openapi({
      description: '主要なエラーの要因のメッセージ',
    }),
    type: z.string().openapi({
      description: '呼び出し元APIの定義しているエラーコード',
    }),
    detail: z.string().openapi({
      description: 'エラーの詳細に関するメッセージ',
    }),
    status: z
      .number()
      .int()
      .min(400)
      .max(600)
      .openapi({ description: 'HTTPステータスコード', example: 500 }),
  })
  .openapi({
    description: 'Problem Details (RFC 9457)',
  })

export const response400 = problemDetail

export const response404 = problemDetail

export const response500 = problemDetail
