import { compose } from '@pluginjs/utils'
import { query } from '@pluginjs/dom'
import { hideElement } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import PopDialog from '@pluginjs/pop-dialog'

export default class Trigger {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes

    this.initialize()
  }

  initialize() {
    this.$trigger = query(`.${this.classes.TRIGGER}`, this.instance.$wrap)
    this.$empty = query(`.${this.classes.EMPTY}`, this.$trigger)

    this.$fill = query(`.${this.classes.FILL}`, this.$trigger)
    this.$fillImageName = hideElement(
      query(`.${this.classes.IMAGENAMEFILL}`, this.$fill)
    )
    this.$fillImage = query(`.${this.classes.FILLIMAGE}`, this.$fill)
    this.$remove = query(`.${this.classes.REMOVE}`, this.$trigger)
    this.$edit = query(`.${this.classes.EDIT}`, this.$trigger)

    this.bulidPop()
    this.bind()
  }

  bind() {
    bindEvent(
      this.instance.eventName('click'),
      () => {
        if (this.instance.is('disabled')) {
          return
        }
        this.instance.oldValue = this.instance.val()
        this.instance.PREVIEW.set(this.instance.options.image)
        removeClass(
          this.classes.EXIST,
          addClass(this.classes.SHOW, this.instance.$wrap)
        )
        addClass(this.classes.OPENDISABLE, this.$trigger)
      },
      this.$empty
    )

    compose(
      bindEvent(this.instance.eventName('mouseenter'), () => {
        if (this.instance.is('disabled')) {
          return
        }

        addClass(this.classes.HOVER, this.$trigger)
      }),
      bindEvent(this.instance.eventName('mouseleave'), () => {
        if (this.instance.is('disabled')) {
          return null
        }
        if (this.instance.is('holdHover')) {
          return false
        }
        removeClass(this.classes.HOVER, this.$trigger)
        this.instance.leave('holdHover')
        return null
      }),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.EDIT}`,
        () => {
          if (this.instance.is('disabled')) {
            return null
          }
          this.instance.oldValue = this.instance.val()
          this.instance.DROPDOWN.show()
          addClass(this.classes.OPENDISABLE, this.$trigger)
          removeClass(
            this.classes.EXIST,
            addClass(this.classes.SHOW, this.instance.$wrap)
          )
          this.instance.enter('status')
          return false
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.REMOVE}`,
        () => {
          if (this.instance.is('disabled')) {
            return null
          }
          return null
        }
      )
    )(this.$trigger)
  }

  bulidPop() {
    const that = this
    // init pop
    this.CLEARPOP = new PopDialog(this.$remove, {
      placement: 'bottom',
      content: 'Are you sure you want to delete?',
      buttons: {
        cancel: { label: 'Cancel' },
        delete: {
          label: 'Delete',
          color: 'danger',
          fn: resolve => {
            that.instance.clear()
            resolve()
          }
        }
      },
      onShown: () => {
        that.instance.enter('holdHover')
      },
      onHidden: () => {
        removeClass(that.classes.HOVER, this.$trigger)
        that.instance.leave('holdHover')
      }
    })
  }
}
