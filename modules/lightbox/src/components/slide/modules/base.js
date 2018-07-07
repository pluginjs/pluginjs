import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, query } from '@pluginjs/dom'

class Base {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.items = instance.items

    this.content = instance.getElement('content')
    if (this.options.title) {
      this.title = instance.getElement('title')
      bindEvent(
        {
          type: 'click',
          handler: event => {
            event.stopPropagation()
          }
        },
        this.title
      )

      append(this.title, this.content)
    }
  }

  setTitle(title) {
    if (this.options.title) {
      this.title.innerHTML = title
    }
  }

  appendTo(el) {
    append(this.content, el)
    this.inner = el
    this.loader = query(`.${this.classes.LOADER}`, el)
  }

  remove() {
    this.content.remove()
  }
}

export default Base

