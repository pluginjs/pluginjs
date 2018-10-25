import { events as EVENTS } from './constant'
import scroll from '@pluginjs/scroll'

export default class History {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.options = this.instance.options
    this.$sections = this.instance.$sections
  }

  changePage() {
    const index = this.instance.currIndex - 1
    const top = this.getOffset(this.$sections[index])
    const duration = this.options.duration
    const easing = this.options.easing

    scroll.to({
      y: top,
      duration,
      easing
    })

    if (this.instance.is('moveing')) {
      clearTimeout(this.setTimeout)
    }

    this.instance.enter('moveing')

    this.setTimeout = setTimeout(() => {
      this.instance.leave('moveing')
    }, this.options.duration)

    const id = this.instance.getIdByIndex(this.instance.currIndex)
    this.instance.trigger(EVENTS.CHANGE, id)

    this.setNavActive()
    this.changeHash()
  }

  getOffset(node, offsetTop) {
    if (!offsetTop) {
      offsetTop = 0
    }

    if (node === document.body || node === null) {
      return offsetTop
    }

    offsetTop += node.offsetTop

    return this.getOffset(node.parentNode, offsetTop)
  }

  setNavActive() {
    const href = this.instance.getIdByIndex(this.instance.currIndex)
    if (this.options.dots !== false) {
      this.instance.Dots.setActive(href)
    }
  }

  changeHash() {
    const id = this.instance.getIdByIndex(this.instance.currIndex)
    if (history.replaceState) {
      history.replaceState(null, null, id)
    } else {
      const st = this.scrollTop()
      window.location.hash = id
      window.scrollTo(0, st)
    }
  }
}
