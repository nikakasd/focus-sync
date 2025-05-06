import { Hono } from 'hono'

import config from '@/shared/config.js'

import { focusRouter } from './routes/focus.js'

export const web = new Hono()

web.use(async (c, next) => {
  const auth = c.req.header('Authorization')
  if (!auth || auth.split(' ')[1] !== config.web.token) {
    return c.json({
      error: 'Unauthorized',
    }, 401)
  }

  return next()
})

web.route('/focus', focusRouter)
