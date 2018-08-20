import { debounce } from '@pluginjs/utils'
import Pj from '@pluginjs/factory'

/* Credit to http://naver.github.io/egjs/ MIT */
let isRotate = false
const latency = 250
const emitter = Pj.emitter
const scroll = debounce(() => {
  if (isRotate) {
    isRotate = false
    return
  }

  emitter.emit('scrollend', {
    top: window.pageYOffset,
    left: window.pageXOffset
  })
}, latency)

const onOrientationchange = () => {
  isRotate = true
}

function attachEvent() {
  emitter.on('scroll', scroll)
  emitter.on('resize', onOrientationchange)
}

function removeEvent() {
  emitter.off('scroll', scroll)
  emitter.off('resize', onOrientationchange)
}

export default {
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
