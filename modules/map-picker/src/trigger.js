import { compose } from '@pluginjs/utils'
import { parseHTML, query, children } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import PopDialog from '@pluginjs/pop-dialog'

export default class Trigger {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.initialize()
    this.bind()
  }

  initialize() {
    this.$trigger = parseHTML(
      this.instance.createEl('trigger', {
        classes: this.classes
      })
    )

    // create empty
    this.$empty = parseHTML(
      this.instance.createEl('empty', {
        classes: this.classes,
        addPlace: this.instance.translate('addPlace')
      })
    )

    // create fill
    this.$fill = parseHTML(
      this.instance.createEl('fill', {
        classes: this.classes,
        action: this.classes.FILLACTION
      })
    )
    this.$fillName = query(`.${this.classes.FILLNAME}`, this.$fill)
    this.$fillCoord = query(`.${this.classes.FILLCOORD}`, this.$fill)

    // create fill action
    this.$triggerAction = parseHTML(
      this.instance.createEl('triggerAction', {
        classes: this.classes
      })
    )

    this.$trigger.append(this.$empty, this.$fill, this.$triggerAction)
    this.instance.$wrap.append(this.$trigger)

    this.buildPop()
  }

  buildPop() {
    const that = this

    this.DELETEPOP = PopDialog.of(
      query(`.${this.classes.REMOVE}`, this.$triggerAction),
      {
        placement: 'bottom',
        content: this.instance.translate('deleteTitle'),
        buttons: {
          cancel: { label: this.instance.translate('cancel') },
          delete: {
            label: this.instance.translate('delete'),
            color: 'danger',
            fn(resolve) {
              addClass(that.classes.REMOVEANIMATE, that.$fill)
              setTimeout(() => {
                that.instance.clear()
                removeClass(that.classes.REMOVEANIMATE, that.$fill)
              }, 500)
              resolve()
            }
          }
        },
        onShow: () => that.instance.enter('holdHover'),
        onHide: () => {
          removeClass(this.classes.HOVER, this.$trigger)
          that.instance.leave('holdHover')
        }
      }
    )
  }

  bind() {
    compose(
      // empty
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.EMPTY}`,
        () => {
          if (this.instance.is('disabled')) {
            return
          }
          if (!this.instance.is('open')) {
            this.instance.open()
          }
          addClass(this.classes.OPENDISABLE, this.$trigger)
        }
      ),
      // fill action button event
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.TRIGGERACTION} .${this.classes.EDIT}`,
        () => {
          if (this.instance.is('disabled')) {
            return
          }
          this.instance.open()
            return false /* eslint-disable-line */
        }
      ),
      // $fill event
      bindEvent(this.instance.eventName('mouseleave'), () => {
        if (this.instance.is('disabled') || this.instance.is('holdHover')) {
          return
        }

        removeClass(this.classes.HOVER, this.$trigger)
        this.instance.leave('holdHover')
      }),
      // $fill event
      bindEvent(
        this.instance.eventName('mouseover'),
        `.${this.classes.TRIGGERACTION}`,
        () => {
          if (this.instance.is('disabled')) {
            return
          }

          addClass(this.classes.HOVER, this.$trigger)
        }
      )
    )(this.instance.$wrap)
  }

  clear() {
    children(query(`.${this.classes.FILLCONTENT}`, this.$fill)).forEach(el => {
      el.textContent = ''
    })
  }
}
