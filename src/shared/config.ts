import { existsSync } from 'fs'
import { loadEnvFile } from 'process'

import env from 'env-var'
if (existsSync('.env')) loadEnvFile('.env')

export default {
  package: {
    name: env.get('npm_package_name').default('unknown').asString(),
    version: env.get('npm_package_version').default('unknown').asString(),
    mode: env.get('NODE_ENV').default('production').asString(),
  },
  web: {
    port: env.get('WEB_PORT').default(3000).asPortNumber(),
    token: env.get('WEB_TOKEN').required().asString(),
    debounceDelay: env.get('WEB_DEBOUNCE_DELAY').default(2000).asInt(),
  },
  telegram: {
    apiId: env.get('TELEGRAM_API_ID').required().asInt(),
    apiHash: env.get('TELEGRAM_API_HASH').required().asString(),
    deviceModel: env.get('TELEGRAM_DEVICE_MODEL').required().asString(),
    systemVersion: env.get('TELEGRAM_SYSTEM_VERSION').required().asString(),
    chatId: env.get('TELEGRAM_CHAT_ID').required().asInt(),
  },
}
