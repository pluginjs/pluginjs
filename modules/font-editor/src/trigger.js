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
    this.$trigger = query(`.${this.classes.TRIGGER}`, this.instance.$wrap)
    this.$triggerAction = query(
      `.${this.classes.TRIGGERACTION}`,
      this.instance.$wrap
    )
    this.$fillContent = query(`.${this.classes.FILLCONTENT}`, this.$fill)
    this.$fillContentName = query(
      `.${this.classes.FILLCONTENTNAME}`,
      this.$fill
    )
    this.$fillContentSub = query(`.${this.classes.FILLCONTENTSUB}`, this.$fill)
    this.$removeAction = query(
      `.${this.classes.REMOVEACTION}`,
      this.$triggerAction
    )
    this.$editAction = query(`.${this.classes.EDITACTION}`, this.$triggerAction)

    // init pop
    const that = this
    this.CLEARPOP = PopDialog.of(this.$removeAction, {
      content: 'Are you sure you want to delete?',
      placement: 'bottom',
      buttons: [
        {
          action: 'cancel',
          label: 'Cancel'
        },
        {
          action: 'delete',
          label: 'Delete',
          color: 'danger',
          fn(resolve) {
            that.instance.clear(true)
            resolve()
          }
        }
      ],
      onShown: () => {
        that.instance.enter('holdHover')
      },
      onHidden: () => {
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
        return
      },
      this.$empty
    )
    compose(
      bindEvent(this.instance.eventName('mouseenter'), ({ target }) => {
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

        addClass(that.classes.OPENDISABLE, that.$trigger)
        that.instance.DROPDOWN.show()
        return false /* eslint-disable-line */
      },
      this.$editAction
    )

    bindEvent(
      this.instance.eventName('click'),
      () => {
        if (that.instance.is('disabled')) {
          return
        }
        that.instance.DROPDOWN.hide()
        return
      },
      this.$removeAction
    )
  }

  update(value) {
    Object.entries(this.instance.value).forEach(([i, v]) => {
      if (this.instance.defaultVal[i] === v) {
        return
      }

      if (i === 'fontSize' || i === 'lineHeight') {
        return
      }

      if (i === 'fontFamily') {
        if(v === "") {
          this.$fillContentName.textContent = 'Null'
        } else {
          this.$fillContentName.textContent = v.font
        }
      }

      if (i === 'textAlign') {
        i = 'justify-content'
        setStyle(
          'justifyContent',
          this.transformTextAlign(v),
          this.$fillContent
        )
      }

      i = i.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)

      const attr = {}
      attr[i] = v
      setStyle(attr, this.$fillContentName)
    })

    // set sub
    this.$fillContentSub.textContent = `${this.instance.value.fontSize ||
      'null'} / ${this.instance.value.lineHeight || 'null'}`
    
    if(value) {
      addClass(this.instance.classes.EXSIT, this.instance.$wrap)
      removeClass(this.instance.classes.WRITE, this.instance.$wrap)
    } else {
      removeClass(this.instance.classes.EXSIT, this.instance.$wrap)
      addClass(this.instance.classes.WRITE, this.instance.$wrap)
    }
  }

  transformTextAlign(value) {
    if (value === 'left') {
      return 'flex-start'
    }

    if (value === 'right') {
      return 'flex-end'
    }

    return value
  }
}
