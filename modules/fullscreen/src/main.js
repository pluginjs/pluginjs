import Emitter from '@pluginjs/emitter'

/* Credit to https://github.com/sindresorhus/screenfull.js MIT */
const fn = (function() {
  let val
  let valLength

  const fnMap = [
    [
      'requestFullscreen',
      'exitFullscreen',
      'fullscreenElement',
      'fullscreenEnabled',
      'fullscreenchange',
      'fullscreenerror'
    ],
    // new WebKit
    [
      'webkitRequestFullscreen',
      'webkitExitFullscreen',
      'webkitFullscreenElement',
      'webkitFullscreenEnabled',
      'webkitfullscreenchange',
      'webkitfullscreenerror'
    ],
    // old WebKit (Safari 5.1)
    [
      'webkitRequestFullScreen',
      'webkitCancelFullScreen',
      'webkitCurrentFullScreenElement',
      'webkitCancelFullScreen',
      'webkitfullscreenchange',
      'webkitfullscreenerror'
    ],
    [
      'mozRequestFullScreen',
      'mozCancelFullScreen',
      'mozFullScreenElement',
      'mozFullScreenEnabled',
      'mozfullscreenchange',
      'mozfullscreenerror'
    ],
    [
      'msRequestFullscreen',
      'msExitFullscreen',
      'msFullscreenElement',
      'msFullscreenEnabled',
      'MSFullscreenChange',
      'MSFullscreenError'
    ]
  ]

  const l = fnMap.length
  const ret = {}

  for (let i = 0; i < l; i++) {
    val = fnMap[i]
    if (val && val[1] in document) {
      for (i = 0, valLength = val.length; i < valLength; i++) {
        ret[fnMap[0][i]] = val[i]
      }
      return ret
    }
  }

  return false
})()

let instances = []
let currentElement

function onfullscreenchange(e) {
  const currents = instances.filter(
    instance =>
      currentElement === instance.element || e.target === instance.element
  )

  currents.forEach(current => {
    if (!current.isFullscreen()) {
      current.emit('exit') // exit;
    } else {
      currentElement = current.element
      current.emit('request') // request
    }
  })
}

function onfullscreenerror(e) {
  const currents = instances.filter(instance => e.target === instance.element)

  currents.forEach(current => current.emit('error'))
}

class Fullscreen extends Emitter {
  constructor(element) {
    super()

    this.element = element || document.documentElement

    if (fn === false) {
      this.emit('error', new Error('fullscreen is not supported'))
    }

    if (instances.length === 0) {
      Fullscreen.bind()
    }

    instances.push(this)
  }

  destroy() {
    this.exit()

    instances = instances.filter(instance => instance !== this)

    if (instances.length === 0) {
      Fullscreen.unbind()
    }
  }

  request(...args) {
    if (!this.isFullscreen()) {
      if (this.element[fn.requestFullscreen]) {
        this.element[fn.requestFullscreen](...args)
      }
      // else {
      //   document.documentElement[fn.requestFullscreen].apply(this.element, arguments);
      // }
    }
  }

  exit() {
    if (this.isFullscreen()) {
      document[fn.exitFullscreen]()
    }
  }

  toggle() {
    if (this.isFullscreen()) {
      this.exit()
    } else {
      this.request()
    }
  }

  isFullscreen() {
    if (Fullscreen.isFullscreen()) {
      return this.element === Fullscreen.element()
    }

    return false
  }

  /* whether or not full-screen mode is available. */
  static enabled() {
    return Boolean(document[fn.fullscreenEnabled])
  }

  static exit(...args) {
    document[fn.exitFullscreen](...args)
  }

  static element() {
    return document[fn.fullscreenElement]
  }

  static isFullscreen() {
    return Boolean(document[fn.fullscreenElement])
  }

  static bind() {
    document.addEventListener(fn.fullscreenchange, onfullscreenchange)
    document.addEventListener(fn.fullscreenerror, onfullscreenerror)
  }

  static unbind() {
    document.removeEventListener(fn.fullscreenchange, onfullscreenchange)
    document.removeEventListener(fn.fullscreenerror, onfullscreenerror)
  }
}

Fullscreen.fn = fn

export default Fullscreen
