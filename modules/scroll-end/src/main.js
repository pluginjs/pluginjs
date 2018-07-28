import Emitter from '@pluginjs/emitter'
import Pj from '@pluginjs/factory'

/* Credit to http://naver.github.io/egjs/ MIT */
const scrollEnd = (function() {
  const emitter = new Emitter()

  let scrollEndTimer
  const userAgent = window.navigator.userAgent
  let rotateFlag = false

  const TIMERBASE = 1
  const SCROLLBASE = 0

  const latency = 250

  const detectType = getDetectType(userAgent)

  /*
   * iOS & Safari:
   *    iOS7 and lower, scroll event occurs once when the scroll is stopped
   *    iOS8 and upper, scroll event occurs on every scroll
   *    Scroll event occurs when the rotation
   * Android:
   *    Scroll event occurs on every scroll
   *    Scroll event occurs on rotation and should be ignored to handle
   */
  function getDetectType(userAgent) {
    let deviceName
    let osVersion
    let retValue = TIMERBASE
    const matchedDevice = userAgent.match(/iPhone|iPad|Android/)
    const webviewToken = /Version/

    // webview : TIMERBASE
    if (matchedDevice !== null) {
      deviceName = matchedDevice[0]

      // Browsers that trigger scroll event like scrollstop : SCROLLBASE
      osVersion = userAgent.match(/\s(\d{1,2})_\d/)

      if (
        deviceName !== 'Android' &&
        webviewToken.test(userAgent) &&
        osVersion &&
        parseInt(osVersion[1], 10) <= 7
      ) {
        retValue = SCROLLBASE
      } else if (deviceName === 'Android') {
        osVersion = userAgent.match(/Android\b(.*?);/)
        if (
          !/Chrome/.test(userAgent) &&
          osVersion &&
          parseFloat(osVersion, 10) <= 2.3
        ) {
          retValue = SCROLLBASE
        }
      }
    }
    return retValue
  }

  function attachEvent() {
    Pj.emitter.on('scroll', scroll)
    Pj.emitter.on('resize', onOrientationchange)
  }

  function onOrientationchange() {
    rotateFlag = true
  }

  function scroll() {
    /* eslint default-case:"off" */
    if (rotateFlag) {
      rotateFlag = false
      return
    }

    switch (detectType) {
      case SCROLLBASE:
        triggerScrollEnd()
        break
      case TIMERBASE:
        triggerScrollEndAlways()
        break
    }
  }

  function triggerScrollEnd() {
    emitter.emit('scrollend', {
      top: window.pageYOffset,
      left: window.pageXOffset
    })
  }

  function triggerScrollEndAlways() {
    clearTimeout(scrollEndTimer)
    scrollEndTimer = setTimeout(() => {
      if (rotateFlag) {
        rotateFlag = false
        return
      }
      triggerScrollEnd()
    }, latency)
  }

  function removeEvent() {
    Pj.emitter.off('scroll', scroll)
    Pj.emitter.off('resize', onOrientationchange)
  }

  return {
    on(...args) {
      if (!emitter.hasListeners('scrollend')) {
        attachEvent()
      }
      emitter.on('scrollend', ...args)
    },
    off(...args) {
      emitter.off('scrollend', ...args)

      if (!emitter.hasListeners('scrollend')) {
        removeEvent()
      }
    }
  }
})()

Pj.scrollEnd = scrollEnd

export default scrollEnd
