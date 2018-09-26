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
    this.element = parseHTML(
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

    this.$triggerAction = parseHTML(
      template.compile(this.options.templates.triggerAction())({
        classes: this.classes
      })
    )

    this.instance.$wrap.append(this.element)
    this.element.append(this.$empty, this.$fill, this.$triggerAction)

    this.$edit = query(`.${this.classes.EDITOR}`, this.instance.$wrap)

    this.buildPop()
  }

  buildPop() {
    const that = this
    this.DELETEPOP = PopDialog.of(
      query(`.${this.classes.REMOVE}`, this.$triggerAction),
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
                    that.instance.$fillCover.setAttribute('src', '')
                    fadeIn(that.$triggerAction)
                  }
                },
                that.$triggerAction
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
          removeClass(this.classes.HOVER, this.$triggerAction)
          this.instance.leave('holdHover')
        }
      }
    )
  }

  bind() {
    bindEvent(
      this.instance.eventName('click'),
      () => {
        addClass(this.classes.OPENDISABLE, this.element)
        this.instance.DROPDOWN.show()
      },
      this.$edit
    )

    compose(
      // empty
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.EMPTY}`,
        () => {
          addClass(this.classes.OPENDISABLE, this.element)
        }
      ),
      // info actions
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.EDITOR}`,
        () => {
          addClass(this.classes.OPENDISABLE, this.element)
          this.instance.DROPDOWN.show()
          return false
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.REMOVE}`,
        () => {
          removeClass(this.classes.OPENDISABLE, this.element)
          this.instance.DROPDOWN.hide()
        }
      ),
      // info actions hover hold
      bindEvent(
        this.instance.eventName('mouseover'),
        `.${this.classes.TRIGGERACTION}`,
        () => {
          addClass(this.classes.HOVER, this.element)
        }
      ),
      bindEvent(
        this.instance.eventName('mouseout'),
        `.${this.classes.TRIGGERACTION}`,
        () => {
          if (this.instance.is('holdHover')) {
            return
          }
          removeClass(this.classes.HOVER, this.element)
          return
        }
      )
    )(this.element)
  }
}
