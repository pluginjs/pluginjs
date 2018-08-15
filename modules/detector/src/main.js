/* Credit to http://is.js.org MIT */
const userAgent = ((window.navigator && window.navigator.userAgent) || '').toLowerCase() // eslint-disable-line

// is current device supports touch?
export const isTouchDevice = () => {
  return !!document && ( 'ontouchstart' in window || ('DocumentTouch' in window && document instanceof DocumentTouch)) // eslint-disable-line
}

// is current device mobile?
export const isMobile = () => {
  return (
    isIphone() ||
    isIpod() ||
    isAndroidPhone() ||
    isBlackberryPhone() ||
    isWindowsPhone()
  )
}

// is current device tablet?
export const isTablet = () => {
  return (
    isIpad() || isAndroidTablet() || isBlackberryTablet() || isWindowsTablet()
  )
}

// is current device desktop?
export const isDesktop = () => {
  return !isMobile() && !isTablet()
}

// is current device portrait?
export const isPortrait = () => {
  if (
    screen.orientation &&
    Object.prototype.hasOwnProperty.call(window, 'onorientationchange')
  ) {
    return screen.orientation.type.includes('portrait')
  }

  return window.innerHeight / window.innerWidth > 1
}

// is current device landscape?
export const isLandscape = () => {
  if (
    screen.orientation &&
    Object.prototype.hasOwnProperty.call(window, 'onorientationchange')
  ) {
    return screen.orientation.type.includes('landscape')
  }
  return window.innerHeight / window.innerWidth < 1
}

// ----------
// Devices
// ----------
// is current device android?
export const isAndroid = () => {
  return /android/.test(userAgent)
}

// is current device android phone?
export const isAndroidPhone = () => {
  return /android/.test(userAgent) && /mobile/.test(userAgent)
}

// is current device android tablet?
export const isAndroidTablet = () => {
  return /android/.test(userAgent) && !/mobile/.test(userAgent)
}

// is current device blackberry?
export const isBlackberry = () => {
  return /blackberry/.test(userAgent) || /bb10/.test(userAgent)
}

// is current device blackberry phone?
export const isBlackberryPhone = () => {
  return isBlackberry() && !/tablet/.test(userAgent)
}

// is current device blackberry tablet?
export const isBlackberryTablet = () => {
  return isBlackberry() && /tablet/.test(userAgent)
}

// is current device ios?
export const isIos = () => {
  return isIphone() || isIpad() || isIpod()
}

// is current device ipad?
export const isIpad = () => {
  return /ipad/.test(userAgent)
}

// is current device iphone?
// parameter is optional
export const isIphone = () => {
  return /iphone/.test(userAgent)
}

// is current device ipod?
export const isIpod = () => {
  return /ipod/.test(userAgent)
}

// is current device window?
export const isWindows = () => {
  return /windows/.test(userAgent)
}

// is current device windows phone?
export const isWindowsPhone = () => {
  return isWindows() && /phone/.test(userAgent)
}

// is current device windows tablet?
export const isWindowsTablet = () => {
  return isWindows() && !isWindowsPhone() && /touch/.test(userAgent)
}
