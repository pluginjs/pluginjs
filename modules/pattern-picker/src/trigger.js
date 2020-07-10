import template from '@pluginjs/template'
import { compose } from '@pluginjs/utils'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { query, parseHTML, append } from '@pluginjs/dom'
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
    append(this.$trigger, this.instance.$wrap)
    append(this.$empty, this.$trigger)
    append(this.$fill, this.$trigger)
    append(this.$triggerAction, this.$trigger)

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
          if (this.instance.is('disabled')) {
            return
          }
          addClass(this.classes.OPENDISABLE, this.$trigger)
          // this.instance.render()
        }
      ),
      // info action hover
      bindEvent(this.instance.eventName('mouseenter'), () => {
        if (this.instance.is('disabled')) {
          return
        }
        addClass(this.classes.HOVER, this.$trigger)
      }),
      bindEvent(this.instance.eventName('mouseleave'), () => {
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
        buttons: [
          {
            action: 'cancel',
            label: that.instance.translate('cancel')
          },
          {
            action: 'delete',
            label: that.instance.translate('delete'),
            color: 'danger',
            fn(resolve) {
              that.instance.clear()
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
      }
    )
  }
}
