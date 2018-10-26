import { events as EVENTS } from './constant'
import { setStyle } from '@pluginjs/styled'
import scroll from '@pluginjs/scroll'

export default class History {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.options = this.instance.options
    this.$sections = this.instance.$sections
  }

  changePage() {
    if (this.options.animation === 'scroll') {
      const index = this.instance.currIndex - 1
      const top = this.getOffset(this.$sections[index])
      const duration = this.options.duration
      const easing = this.options.easing

      scroll.to({
        y: top,
        duration,
        easing
      })
    }

    if (this.options.animation === 'stack') {
      const index = this.instance.currIndex - 1
      let i = 0
      const stack = [
        {
          x: '0px',
          y: '-100vh'
        },
        {
          x: '0px',
          y: '0px'
        }
      ]
      this.position = stack

      this.$sections.forEach(section => {
        if (index > i) {
          const translate3d = `translate3d(${this.position[0].x}, ${
            this.position[0].y
          }, 0px)`
          setStyle('transform', translate3d, section)
        } else {
          const translate3d = `translate3d(${this.position[1].x}, ${
            this.position[1].y
          }, 0px)`
          setStyle('transform', translate3d, section)
        }
        i++
      })
    }

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

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
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
}
