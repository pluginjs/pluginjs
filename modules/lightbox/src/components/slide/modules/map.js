import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query, prepend } from '@pluginjs/dom'
import Base from './base'

class Map extends Base {
  constructor(instance) {
    super(instance)

    this.init()
  }

  init() {
    this.map = this.instance.getElement('map')
    prepend(this.map, this.content)

    this.loadHandler = () => {
      if (this.append) {
        this.updateStatus('loaded')
      }
    }

    this.bind()
  }

  bind() {
    bindEvent('load', this.loadHandler, this.map)
    // this.map.on('load', this.loadHandler)
  }

  unbind() {
    removeEvent('load', this.map)
    // this.map.off('load', this.loadHandler)
  }

  addScr(index) {
    const data = this.items[index]

    this.setTitle(data.title)

    const src = `${data.href}&output=embed`
    // this.update
    this.map.setAttribute('src', src)
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

  resetSrc() {
    this.map.src = '//about:blank'
  }

  remove() {
    this.map.src = '//about:blank'
    this.append = false

    super.remove()
  }
}

export default Map
Map
