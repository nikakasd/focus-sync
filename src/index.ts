import { serve } from '@hono/node-server'
import { oneLine } from 'common-tags'

import config from '@/shared/config.js'
import { provideLogger } from '@/shared/utilities/logger.js'

import { userbot } from './shared/services/telegram.js'
import { web } from './web/web.js'

const init = async () => {
  provideLogger('index').info(oneLine`
    starting
    ${config.package.name}
    (${config.package.version})
    in ${config.package.mode} mode...
  `)

  await Promise.all([
    userbot.start({
      phone: () => userbot.input('Phone > '),
      code: () => userbot.input('Code > '),
      password: () => userbot.input('Password > '),
    }).then((me) => provideLogger('telegram').info(`Logged in as ${me.displayName}`)),
    serve({
      fetch: web.fetch,
      port: config.web.port,
    }),
  ])
}

init()
