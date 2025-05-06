import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import config from '@/shared/config.js'
import { FocusService } from '@/shared/services/focus.js'
import { TelegramService } from '@/shared/services/telegram.js'

let LAST_UPDATED_TIME = 0

export const focusRouter = new Hono()

focusRouter.get('/', (c) => {
  return c.json({
    current: FocusService.get(),
  })
})

focusRouter.post('/', zValidator('json', z.object({
  focus: z.string(),
})), async (c) => {
  const { focus } = c.req.valid('json')

  FocusService.set(focus)

  // @note: prevent spamming telegram api
  if (Date.now() - LAST_UPDATED_TIME >= config.web.debounceDelay) {
    await TelegramService.update()
    LAST_UPDATED_TIME = Date.now()
  }

  return c.json({
    current: FocusService.get(),
  })
})
