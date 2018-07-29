import Emitter from '@pluginjs/emitter'
import { throttle } from '@pluginjs/utils'

if (!window.Pj) {
  const plugins = {}

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
    }
  }
}

const Pj = window.Pj

function globalResizeHandle() {
  Pj.emitter.emit('resize')
}

function globalScrollHanle() {
  Pj.emitter.emit('scroll')
}

window.addEventListener('orientationchange', globalResizeHandle)
window.addEventListener('resize', throttle(globalResizeHandle))
window.addEventListener('scroll', throttle(globalScrollHanle))

export default Pj
