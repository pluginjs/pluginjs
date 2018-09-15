import Emitter from '@pluginjs/emitter'
import { throttle } from '@pluginjs/utils'

if (!window.Pj) {
  let plugins = {}

  window.Pj = {
    emitter: new Emitter(),

    register(name, plugin) {
      plugins[name] = plugin
    },
    get(name) {
      if (this.has(name)) {
        return plugins[name]
      }
      return null
    },
    has(name) {
      if (typeof plugins[name] !== 'undefined') {
        return true
      }
      return false
    },
    reset() {
      plugins = {}
    },
    ready(func) {
      Pj.emitter.on('ready', func)
    }
  }
}

const Pj = window.Pj

function globalResizeHandle(e) {
  Pj.emitter.emit(
    'resize',
    e,
    window.document.documentElement.clientWidth,
    window.document.documentElement.clientHeight
  )
}

function globalScrollHanle(e) {
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0

  const scrollLeft =
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0

  Pj.emitter.emit('scroll', e, scrollTop, scrollLeft)
}

function globalReadyHanle() {
  Pj.emitter.emit('ready')
}

window.addEventListener('DOMContentLoaded', globalReadyHanle)
window.addEventListener('orientationchange', globalResizeHandle)
window.addEventListener('resize', throttle(globalResizeHandle))
window.addEventListener('scroll', throttle(globalScrollHanle))

export default Pj
