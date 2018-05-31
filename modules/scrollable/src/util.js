export const isFFLionScrollbar = (() => {
  let version
  const ua = window.navigator.userAgent
  const isOSXFF = /(?=.+Mac OS X)(?=.+Firefox)/.test(ua)
  if (!isOSXFF) {
    return false
  }
  version = /Firefox\/\d{2}\./.exec(ua)
  if (version) {
    version = version[0].replace(/\D+/g, '')
  }
  return isOSXFF && Number(version) > 23
})()
