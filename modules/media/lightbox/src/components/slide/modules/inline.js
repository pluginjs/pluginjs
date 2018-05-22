import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query, prepend } from '@pluginjs/dom'
import Base from './base'

class Inline extends Base {
  constructor(instance) {
    super(instance)

    this.init()
  }

  init() {
    this.inline = this.instance.getElement('inline')
    prepend(this.inline, this.content)
  }

  update(index) {
    const data = this.items[index]
    this.inline.innerHTML = ''

    this.setTitle(data.title)

    this.htmlPop = query(data.href).cloneNode(true)

    bindEvent(
      {
        type: 'click',
        handler: event => {
          event.stopPropagation()
        }
      },
      this.htmlPop
    )

    if (!this.htmlPop) {
      this.updateStatus('error')
    } else {
      this.updateStatus('loaded')
      if (hasClass(this.classes.HIDE, this.htmlPop)) {
        removeClass(this.classes.HIDE, this.htmlPop)
      }
      append(this.htmlPop, this.inline)
    }
  }

  updateStatus(status) {
    if (status === 'error') {
      removeClass(this.classes.LOADED, this.content)
      this.loader.innerHTML = 'Content not found'
      removeClass(this.classes.HIDE, this.loader)
      // todo   show  error tip
    } else if (status === 'loaded') {
      addClass(this.classes.LOADED, this.content)
      addClass(this.classes.HIDE, this.loader)
    }
  }

  remove() {
    addClass(this.classes.HIDE, this.htmlPop)
    super.remove()
  }
}

export default Inline
