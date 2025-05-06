## focus sync
*i'm too lazy to write this readme so i asked cursor for that, please blame me*

## description
focus sync allows you to sync your current focus (from apple devices mostly) with your friends on telegram through emoji status and messages in chat.

## requirements
- docker (or node.js 22 or higher)
- telegram api credentials (please don't use official app credentials *\*wink-wink\**)
- [apple shortcut](https://www.icloud.com/shortcuts/de8ed8dcab334b8593bda95a65a5b9dc) installed on your device and set up automations "when \<focus\> turning on/off, run immediately \<your shortcut\>" for every focus


## setup and running with docker
*i made this for myself so configuration is not user-friendly*

1. git clone
2. fill `.env` with this content:
```
WEB_PORT=3000 # if you want change this - change it in docker-compose.yml as well
WEB_TOKEN= # generate this using - openssl rand -hex 16

# Telegram API credentials - https://my.telegram.org/apps
TELEGRAM_API_ID=
TELEGRAM_API_HASH=
TELEGRAM_DEVICE_MODEL= # for example - iPhone11
TELEGRAM_SYSTEM_VERSION= # for example - iOS 18.3.2
TELEGRAM_CHAT_ID= # for example - -100123123123123
```
3. fill `src/constants.ts` with your focuses and emoji ids (use [@ShowJsonBot](https://t.me/ShowJsonBot) for example)
4. edit messages in `src/shared/services/telegram.ts`
5. `docker compose up -d`
6. attach to container, log in to telegram account

## license and other legal shit
i don't give a fuck, but if you need to show something to your lawyer: [license](LICENSE)