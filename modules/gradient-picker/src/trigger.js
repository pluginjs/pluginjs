import template from '@pluginjs/template'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { fadeOut, fadeIn, query, parseHTML } from '@pluginjs/dom'
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
    this.$fillImg = query(`.${this.classes.FILLIMG}`, this.$fill)

    this.$empty = parseHTML(
      template.compile(this.options.templates.empty())({
        classes: this.classes,
        icon: 'pj-icon pj-icon-paint',
        text: this.instance.translate('chooseGradient')
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
    // empty
    bindEvent(
      this.instance.eventName('click'),
      () => {
        addClass(this.classes.OPENDISABLE, this.$trigger)
        return false
      },
      this.$empty
    )

    // editor
    bindEvent(
      this.instance.eventName('click'),
      `.${this.classes.EDITOR}`,
      () => {
        addClass(this.classes.OPENDISABLE, this.$trigger)
        this.instance.DROPDOWN.show()
        return false
      },
      this.$triggerAction
    )

    // info hover
    bindEvent(
      this.instance.eventName('mouseover'),
      () => {
        addClass(this.classes.HOVER, this.$trigger)
      },
      this.$triggerAction
    )
    bindEvent(
      this.instance.eventName('mouseout'),
      () => {
        if (this.instance.is('holdHover')) {
          return false
        }
        removeClass(this.classes.HOVER, this.$trigger)
        this.instance.leave('holdHover')
        return null
      },
      this.$triggerAction
    )
  }

  buildPop() {
    const that = this
    // init popDialog
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
              fadeOut(
                {
                  duration: 100,
                  callback: () => {
                    that.instance.clear()
                    fadeIn(
                      {
                        duration: 100
                      },
                      that.$triggerAction
                    )
                  }
                },
                that.$triggerAction
              )
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
