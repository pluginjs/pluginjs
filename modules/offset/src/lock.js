import { bindEvent } from '@pluginjs/events'
import { closest, queryAll, appendTo } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
class Lock {
  constructor(instance) {
    this.instance = instance
    this.initialize()
    this.bind()
  }

  initialize() {
    this.instance.$lock = this.instance.createEl('lock', {
      classes: this.instance.classes
    })
    appendTo(this.instance.$lock, this.instance.$wrap)
  }

  bind() {
    const that = this
    bindEvent(
      this.instance.eventName('click'),
      `.${this.instance.classes.LOCK}`,
      e => {
        if (that.instance.is('disabled')) {
          return
        }
        const $this = closest(`.${this.instance.classes.LOCK}`, e.target)

        if (that.instance.is('lock')) {
          removeClass(that.instance.classes.LOCKACTIVE, $this)
          that.instance.leave('lock')
          return
        }

        addClass(that.instance.classes.LOCKACTIVE, $this)
        const all = queryAll(
          `.${this.instance.classes.INPUT}`,
          this.instance.$wrap
        )
        for (let i = 0; i < all.length; i++) {
          all[i].value = all[0].value
        }
        this.instance.update()
        that.instance.enter('lock')
      },
      this.instance.$wrap
    )
  }
}

export default Lock
