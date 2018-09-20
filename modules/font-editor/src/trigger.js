import { compose } from '@pluginjs/utils'
import { query } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'
import PopDialog from '@pluginjs/pop-dialog'

export default class Trigger {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    // this.defaultValue = instance.options.fontSize.value

    this.initialize()
    this.bind()
  }

  initialize() {
    this.$empty = query(`.${this.classes.EMPTY}`, this.instance.$wrap)
    this.$fill = query(`.${this.classes.FILL}`, this.instance.$wrap)
    this.$fillContent = query(`.${this.classes.FILLCONTENT}`, this.$fill)
    this.$fillContentName = query(
      `.${this.classes.FILLCONTENTNAME}`,
      this.$fill
    )
    this.$fillContentSub = query(`.${this.classes.FILLCONTENTSUB}`, this.$fill)
    this.$triggerAction = query(`.${this.classes.TRIGGERACTION}`, this.$fill)
    this.$removeBtn = query(`.${this.classes.REMOVEACTION}`, this.$fill)
    this.$editBtn = query(`.${this.classes.EDITACTION}`, this.$fill)
    this.$trigger = query(`.${this.classes.TRIGGER}`, this.instance.$wrap)

    // init pop
    const that = this
    this.CLEARPOP = PopDialog.of(this.$removeBtn, {
      content: 'Are you sure you want to delete?',
      placement: 'bottom',
      buttons: {
        cancel: { label: 'Cancel' },
        delete: {
          label: 'Delete',
          color: 'danger',
          fn(resolve) {
            that.instance.clear(true)
            compose(
              removeClass(that.classes.EXSIT),
              addClass(that.classes.WRITE)
            )(that.instance.$wrap)
            resolve()
          }
        }
      },
      onShow: () => {
        that.instance.enter('holdHover')
      },
      onHide: () => {
        removeClass(that.classes.HOVER, that.$trigger)
        that.instance.leave('holdHover')
      }
    })
  }

  bind() {
    const that = this

    bindEvent(
      this.instance.eventName('click'),
      () => {
        if (that.instance.is('disabled')) {
          return
        }
        addClass(that.classes.OPENDISABLE, that.$trigger)
        // addClass(that.classes.SHOW, that.$wrap)
        return
      },
      this.$empty
    )
    compose(
      bindEvent(this.instance.eventName('mouseenter'), ({ target }) => {
        console.log(100)
        if (that.instance.is('disabled')) {
          return false
        }

        addClass(that.classes.HOVER, target)
        return false
      }),
      bindEvent(this.instance.eventName('mouseleave'), ({ target }) => {
        if (that.instance.is('disabled')) {
          return false
        }
        if (that.instance.is('holdHover')) {
          return false
        }
        removeClass(that.classes.HOVER, target)
        that.instance.leave('holdHover')
        return false
      })
    )(this.$trigger)

    bindEvent(
      this.instance.eventName('click'),
      () => {
        if (that.instance.is('disabled')) {
          return
        }
        // removeClass(this.classes.EXSIT, this.$wrap)
        addClass(that.classes.SHOW, that.instance.$wrap)
        addClass(that.classes.OPENDISABLE, that.$trigger)
        that.instance.$defaultDropdown.show()
        return false /* eslint-disable-line */
      },
      this.$editBtn
    )

    bindEvent(
      this.instance.eventName('click'),
      () => {
        if (that.instance.is('disabled')) {
          return
        }
        that.instance.$defaultDropdown.hide()
        return
      },
      this.$removeBtn
    )
  }

  update() {
    Object.entries(this.instance.value).forEach(([i, v]) => {
      if (this.instance.defaultVal[i] === v) {
        return
      }
      if (i === 'fontSize' || i === 'lineHeight') {
        return
      }
      if (i === 'fontFamily' && v !== 'inherit') {
        this.$fillContentName.textContent = v
      }
      if (i === 'textAlign') {
        i = 'align-self'
        setStyle('alignSelf', v, this.$fillContentSub)
      }

      i = i.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)

      const attr = {}
      attr[i] = v
      setStyle(attr, this.$fillContentName)
    })

    // set sub
    this.$fillContentSub.textContent = `${this.instance.value.fontSize ||
      'inherit'} / ${this.instance.value.lineHeight || 'inherit'}`
    if (
      this.instance.value.fontFamily &&
      this.instance.value.fontFamily !== 'inherit'
    ) {
      compose(
        removeClass(this.classes.SHOW),
        addClass(this.classes.EXSIT)
      )(this.instance.$wrap)
    }
  }
}
