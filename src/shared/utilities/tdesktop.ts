export const fetchLatestTDesktopRelease = async () => {
  return fetch('https://api.github.com/repos/telegramdesktop/tdesktop/releases/latest')
    .then(res => res.json())
    .then(data => {
      const tagName = data.tag_name
      if (!tagName) throw new Error('No tag name found in the release data')

      return tagName.replace('v', '')
    })
}
