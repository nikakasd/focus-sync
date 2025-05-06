import { html, Long, TelegramClient } from '@mtcute/node'

import { EMOJI_STATUS_MAPPING } from '@/constants.js'

import config from '../config.js'
import { fetchLatestTDesktopRelease } from '../utilities/tdesktop.js'

import { FocusService } from './focus.js'

export const userbot = new TelegramClient({
  apiId: config.telegram.apiId,
  apiHash: config.telegram.apiHash,
  storage: './data/session',
  initConnectionOptions: {
    appVersion: await fetchLatestTDesktopRelease(),
    deviceModel: config.telegram.deviceModel,
    systemVersion: config.telegram.systemVersion,
    langCode: 'en',
    langPack: 'tdesktop',
    systemLangCode: 'en-US',
    params: {
      _: 'jsonObject',
      value: [
        {
          _: 'jsonObjectValue',
          key: 'tz_offset',
          value: {
            _: 'jsonNumber',
            value: 0,
          },
        },
      ],
    },
  },
})

export class TelegramService {
  static async update () {
    const focus = FocusService.get()

    await Promise.all([
      userbot.setEmojiStatus({
        emoji: Long.fromString(EMOJI_STATUS_MAPPING[focus || 'Default']),
        peerId: 'self',
      }).catch(() => {}),
      userbot.sendText(
        await userbot.resolveChannel(config.telegram.chatId),
        focus
          ? html`✨ <b>nika's focus now is:</b> <code>${focus}</code>`
          : html`👋 <b>nika's focus is empty</b>`,
      ).catch(() => {}),
    ])
  }
}
