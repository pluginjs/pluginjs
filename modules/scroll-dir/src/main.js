import Emitter from '@pluginjs/emitter'
import Pj from '@pluginjs/factory'

/* Credit to http://naver.github.io/egjs/ MIT */

const emitter = new Emitter()
let beforeScrollTop = window.pageYOffset || document.documentElement.scrollTop
let beforeScrollLeft = window.pageXOffset || document.documentElement.scrollLeft

function attachEvent() {
  Pj.emitter.on('scroll', scroll)
}

function scroll() {
  const currentScrollY =
    window.pageYOffset || document.documentElement.scrollTop
  const currentScrollX =
    window.pageXOffset || document.documentElement.scrollLeft
  const delta = {
    vertical: beforeScrollLeft - currentScrollX,
    horizontal: beforeScrollTop - currentScrollY
  }
  beforeScrollTop = currentScrollY
  beforeScrollLeft = currentScrollX
  const verticalDirection = delta.vertical > 0 ? 'left' : 'right'
  const horizontalDirection = delta.horizontal > 0 ? 'up' : 'down'
  const direction = {
    vertical: verticalDirection,
    horizontal: horizontalDirection
  }
  emitter.emit('scrolldir', direction, currentScrollY, delta)
}

function removeEvent() {
  Pj.emitter.off('scroll', scroll)
}

export default {
  on(...args) {
    if (!emitter.hasListeners('scrolldir')) {
      attachEvent()
    }
    emitter.on('scrolldir', ...args)
  },
  off(...args) {
    emitter.off('scrolldir', ...args)
    if (!emitter.hasListeners('scrolldir')) {
      removeEvent()
    }
  }
}
