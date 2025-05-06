import { zValidator as zv } from '@hono/zod-validator'
import type { ValidationTargets } from 'hono'
import type { ZodSchema } from 'zod'

export const zValidator = <T extends ZodSchema, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T,
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      return c.json({ error: 'Validation error', _error: result.error }, 400)
    }
  })
