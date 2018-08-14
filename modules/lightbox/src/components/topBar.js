import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query, queryAll, getData } from '@pluginjs/dom'

class TopBar {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.init()
  }

  init() {
    this.topBar = this.instance.getElement('topBar')
    append(this.topBar, this.instance.wrap)

    this.$counter = query(`#${this.classes.COUNTER}`, this.topBar)

    this.bind()
    this.actions = {
      close() {
        this.instance.close()
      },
      play() {
        // this.play()
      },
      download() {
        // this.download()
      },
      fullScreen() {
        // this.fullScreen()
      },
      share() {
        // this.share()
      }
    }
  }

  updateCount() {
    const length = this.instance.length
    const count = this.instance.activeIndex
    const t = `${count} / ${length}`
    this.$counter.textContent = t
  }

  bind() {
    bindEvent(
      'click',
      e => {
        const id = e.target.id
        const action = id.split('-').pop()
        const keys = Object.keys(this.actions)
        if (keys.indexOf(action) !== -1) {
          this.actions[action].call(this)
        }
      },
      this.topBar
    )
  }

  in() {
    addClass(this.classes.SLIDETOP, this.topBar)
    this.updateCount()
  }

  out() {
    removeClass(this.classes.SLIDETOP, this.topBar)
  }
}

export default TopBar
