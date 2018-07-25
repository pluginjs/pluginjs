// import './polyfills'
import Emitter from '@pluginjs/emitter'
import { throttle } from '@pluginjs/utils'

if (!window.Pj) {
  window.Pj = {
    body: window.document.body,
    doc: window.document,
    emitter: new Emitter(),
    plugins: {},
    instances: {},
    get windowWidth() {
      return window.document.documentElement.clientWidth
    },
    get windowHeight() {
      return window.document.documentElement.clientHeight
    },
    get(name) {
      if (this.has(name)) {
        return this.plugins[name]
      }
      return null
    },
    has(name) {
      if (typeof this.plugins[name] !== 'undefined') {
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
