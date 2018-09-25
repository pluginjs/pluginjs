import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events' // , bindEventOnce
import { parseHTML, query, fadeIn, fadeOut } from '@pluginjs/dom'
import PopDialog from '@pluginjs/pop-dialog'

export default class Trigger {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.options = this.instance.options

    this.build()
    this.bind()
  }

  build() {
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
        icon: 'pj-icon pj-icon-chevron-circle-up',
        text: this.instance.translate('inputPlaceholder')
      })
    )

    this.$infoAction = parseHTML(
      template.compile(this.options.templates.infoAction())({
        classes: this.classes
      })
    )

    this.instance.$wrap.append(this.$trigger)
    this.$trigger.append(this.$empty, this.$fill)
    this.$fill.append(this.$infoAction)

    this.buildPop()
  }

  buildPop() {
    const that = this
    this.DELETEPOP = PopDialog.of(
      query(`.${this.classes.REMOVE}`, this.$infoAction),
      {
        content: this.instance.translate('deleteTitle'),
        placement: 'bottom',
        buttons: {
          cancel: { label: this.instance.translate('cancel') },
          delete: {
            label: this.instance.translate('delete'),
            color: 'danger',
            fn(resolve) {
              fadeOut(
                {
                  delay: 100,
                  callback: () => {
                    removeClass(that.classes.SHOW, that.instance.$wrap)
                    that.instance.removeVideo()
                    that.instance.$infoCover.setAttribute({ src: '' })
                    fadeIn(that.$infoAction)
                  }
                },
                that.$infoAction
              )

              resolve()
            }
          }
        },
        onShow: () => {
          addClass(this.classes.SHOW, this.instance.$wrap)
          this.instance.enter('holdHover')
        },
        onHide: () => {
          removeClass(this.classes.SHOW, this.instance.$wrap)
          removeClass(this.classes.HOVER, this.$infoAction)
          this.instance.leave('holdHover')
        }
      }
    )
  }

  bind() {
    bindEvent(
      this.instance.eventName('click'),
      () => {
        addClass(this.classes.OPENDISABLE, this.$trigger)
        this.instance.$defaultDropdown.show()
      },
      this.$icon
    )
    bindEvent(
      this.instance.eventName('click'),
      () => {
        removeClass(this.classes.OPENDISABLE, this.$trigger)
      },
      window.document
    )

    compose(
      // empty
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.EMPTY}`,
        () => {
          addClass(this.classes.OPENDISABLE, this.$trigger)
        }
      ),
      // info actions
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.EDITOR}`,
        () => {
          addClass(this.classes.OPENDISABLE, this.$trigger)
          this.instance.$defaultDropdown.show()
          return false
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.REMOVE}`,
        () => {
          removeClass(this.classes.OPENDISABLE, this.$trigger)
          this.instance.$defaultDropdown.hide()
        }
      ),
      // info actions hover hold
      bindEvent(
        this.instance.eventName('mouseover'),
        `.${this.classes.FILL}`,
        () => {
          addClass(this.classes.HOVER, this.$infoAction)
        }
      ),
      bindEvent(
        this.instance.eventName('mouseout'),
        `.${this.classes.FILL}`,
        () => {
          if (this.instance.is('holdHover')) {
            return
          }
          removeClass(this.classes.HOVER, this.$infoAction)
          return
        }
      )
    )(this.$trigger)
  }
}
