import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events' // , bindEventOnce
import { parseHTML, query } from '@pluginjs/dom'
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
        icon: 'pj-icon pj-icon-play-circle',
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
            fn: resolve => {
              removeClass(that.classes.SHOW, that.instance.$wrap)
              that.instance.removeVideo()
              that.instance.$fillCover.setAttribute('src', '')
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

    // info actions hover hold
    bindEvent(
      this.instance.eventName('mouseenter'),
      () => {
        addClass(this.classes.HOVER, this.element)
      },
      this.$triggerAction
    )

    bindEvent(
      this.instance.eventName('mouseleave'),
      () => {
        if (this.instance.is('holdHover')) {
          return
        }
        removeClass(this.classes.HOVER, this.element)
        return
      },
      this.$triggerAction
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
      )
    )(this.element)
  }
}
