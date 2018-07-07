import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query, prepend } from '@pluginjs/dom'
import Base from './base'

class Iframe extends Base {
  constructor(instance) {
    super(instance)

    this.init()
  }

  init() {
    this.iframe = this.instance.getElement('iframe')

    prepend(this.iframe, this.content)

    this.loadHandler = () => {
      if (this.append) {
        this.updateStatus('loaded')
      }
    }

    this.bind()
  }

  bind() {
    bindEvent(
      {
        type: 'load',
        handler: this.loadHandler
      },
      this.iframe
    )
    // this.iframe.on('load', this.loadHandler)
  }

  addScr(index) {
    const data = this.items[index]

    this.setTitle(data.title)

    this.iframe.setAttribute('src', data.href)
    this.updateStatus('loading')
  }

  updateStatus(status) {
    if (status === 'error') {
      removeClass(this.classes.LOADED, this.content)
      this.loader.innerHTML = 'loadError'
      removeClass(this.classes.HIDE, this.loader)
      // todo   show  error tip
    } else if (status === 'loading') {
      removeClass(this.classes.LOADED, this.content)
      this.loader.innerHTML = 'loading'
      removeClass(this.classes.HIDE, this.loader)
      // todo    show loadind  tip
    } else if (status === 'loaded') {
      addClass(this.classes.LOADED, this.content)
      addClass(this.classes.HIDE, this.loader)
    }
  }

  appendTo(el) {
    super.appendTo(el)
    setTimeout(() => {
      this.append = true
    }, 200)
  }

  remove() {
    this.iframe.src = '//about:blank'
    this.append = false

    super.remove()
  }

  resetSrc() {
    this.iframe.src = '//about:blank'
  }
}

export default Iframe
rame
