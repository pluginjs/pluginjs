import template from '@pluginjs/template'
import { compose } from '@pluginjs/utils'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { query, parseHTML } from '@pluginjs/dom'
import PopDialog from '@pluginjs/pop-dialog'

export default class Trigger {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.options = this.instance.options

    this.initialize()
  }

  initialize() {
    this.$trigger = parseHTML(
      template.compile(this.options.templates.trigger())({
        classes: this.classes
      })
    )
    this.$fill = parseHTML(
      template.compile(this.options.templates.fill())({
        classes: this.classes
      })
    )
    this.$empty = parseHTML(
      template.compile(this.options.templates.empty())({
        classes: this.classes,
        icon: 'pj-icon pj-icon-image',
        text: this.instance.translate('choosePattern')
      })
    )
    this.$triggerAction = parseHTML(
      template.compile(this.options.templates.triggerAction())({
        classes: this.classes
      })
    )
    this.instance.$wrap.append(this.$trigger)
    this.$trigger.append(this.$empty, this.$fill, this.$triggerAction)

    this.buildPop()
    this.bind()
  }

  bind() {
    // editor
    compose(
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.EDITOR}`,
        () => {
          if (this.instance.is('disabled')) {
            return
          }
          addClass(this.classes.OPENDISABLE, this.$trigger)
          this.instance.DROPDOWN.show()
        return false // eslint-disable-line
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.EMPTY}`,
        () => {
          addClass(this.classes.OPENDISABLE, this.$trigger)
          this.instance.render()
        }
      ),
      // info action hover
      bindEvent('mouseover', `.${this.classes.TRIGGERACTION}`, () => {
        if (this.instance.is('disabled')) {
          return
        }
        addClass(this.classes.HOVER, this.$trigger)
      }),
      bindEvent('mouseout', `.${this.classes.TRIGGERACTION}`, () => {
        if (this.instance.is('disabled')) {
          return
        }
        if (this.instance.is('holdHover')) {
          return
        }
        removeClass(this.classes.HOVER, this.$trigger)
        this.instance.leave('holdHover')
        return
      })
    )(this.$trigger)
  }

  buildPop() {
    const that = this
    this.CLEARPOP = PopDialog.of(
      query(`.${this.classes.REMOVE}`, this.$triggerAction),
      {
        content: that.instance.translate('deleteTitle'),
        placement: 'bottom',
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
        onShow: () => {
          that.instance.enter('holdHover')
        },
        onHide: () => {
          removeClass(that.classes.HOVER, that.$trigger)
          that.instance.leave('holdHover')
        }
      }
    )
  }
}
