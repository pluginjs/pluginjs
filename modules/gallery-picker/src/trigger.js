import { compose } from '@pluginjs/utils'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { query } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import PopDialog from '@pluginjs/pop-dialog'

export default class Trigger {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes

    this.initialize()
    this.bind()
  }

  initialize() {
    this.$empty = query(`.${this.classes.EMPTY}`, this.instance.$wrap)

    this.$fill = query(`.${this.classes.FILL}`, this.instance.$wrap)
    this.$fillCount = query(`.${this.classes.FILLCOUNT}`, this.instance.$wrap)
    this.$triggerAction = query(
      `.${this.classes.TRIGGERACTION}`,
      this.instance.$wrap
    )
    this.$edit = query(`.${this.classes.EDIT}`, this.$triggerAction)
    this.$remove = query(`.${this.classes.REMOVE}`, this.$triggerAction)
    this.$fillAdd = query(`.${this.classes.FILLADD}`, this.instance.$wrap)
    this.$fillImage = query(`.${this.classes.FILLIMAGE}`, this.instance.$wrap)

    this.buildPop()
  }

  buildPop() {
    const that = this
    this.DELETEPOP = PopDialog.of(this.$remove, {
      placement: 'bottom',
      content: that.instance.translate('deleteTitle'),
      buttons: {
        cancel: { label: that.instance.translate('cancel') },
        delete: {
          label: that.instance.translate('delete'),
          color: 'danger',
          fn(resolve) {
            that.instance.clear()

            resolve()
          }
        }
      },
      onShown: () => {
        that.instance.enter('holdHover')
      },
      onHidden: () => {
        removeClass(this.classes.HOVER, this.$triggerAction)
        that.instance.leave('holdHover')
      }
    })
  }

  bind() {
    const that = this
    bindEvent(
      this.instance.eventName('click'),
      e => {
        e.stopPropagation()
        if (that.instance.is('disabled')) {
          return false
        }

        const val = this.instance.options.add.call(this)
        this.instance.set(val)
        return null
      },
      this.$empty
    )
    // add
    if (this.$fillAdd) {
      bindEvent(
        this.instance.eventName('click'),
        e => {
          e.stopPropagation()
          if (that.instance.is('disabled')) {
            return false
          }

          const val = this.instance.options.add.call(this)
          this.instance.add(val)
          return null
        },
        this.$fillAdd
      )
    }

    // fill expand
    bindEvent(
      this.instance.eventName('click'),
      e => {
        e.stopPropagation()
        if (this.instance.is('disabled')) {
          return false
        }
        this.instance.open()
        this.instance.enter('status')
        return false
      },
      this.$edit
    )

    // fill
    compose(
      bindEvent(this.instance.eventName('mouseenter'), () => {
        if (this.instance.is('disabled')) {
          return
        }
        addClass(this.classes.HOVER, this.instance.$wrap)
      }),
      bindEvent(this.instance.eventName('mouseleave'), () => {
        if (this.instance.is('disabled')) {
          return false
        }
        if (this.instance.is('holdHover')) {
          return false
        }

        removeClass(this.classes.HOVER, this.instance.$wrap)
        this.instance.leave('holdHover')
        return null
      })
    )(this.$triggerAction)
  }

  setState() {
    this.$fillCount.textContent = this.instance.count
    if (this.instance.count > 0) {
      setStyle(
        'background-image',
        `url(${this.instance.getImageByIndex(0)})`,
        this.$fillImage
      )
      removeClass(this.classes.WRITE, this.instance.$wrap)
    } else {
      setStyle('background-image', 'none', this.$fillImage)
      addClass(this.classes.WRITE, this.instance.$wrap)
    }
  }
}
