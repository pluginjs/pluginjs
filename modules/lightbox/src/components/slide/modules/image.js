import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query, prepend } from '@pluginjs/dom'
import Base from './base'

class Image extends Base {
  constructor(instance) {
    super(instance)

    this.init()
  }

  init() {
    this.image = this.instance.getElement('image')

    this.image.ondragstart = () => false

    prepend(this.image, this.content)
  }

  update(index) {
    const itemData = this.items[index]

    this.setTitle(itemData.title)

    if (itemData.loadError) {
      this.updateStatus('error')
      return
    }

    if (!itemData.loaded) {
      this.updateStatus('loading')
      const loadCallback = () => {
        this.updateStatus('loaded')
        this.image.src = itemData.href
        this.instance.trigger('loaded', itemData)
      }

      const errorCallback = () => {
        this.updateStatus('error')
      }

      this.loadImage(index, loadCallback, errorCallback)
    } else {
      this.updateStatus('loaded')
      this.image.src = itemData.href
    }

    this.index = index
  }

  loadImage(index, loadCallback, errorCallback) {
    const itemData = this.items[index]
    if (itemData.loaded || itemData.loadError) {
      return
    }

    if (!itemData.hasBind || this.instance.length <= 2) {
      itemData.img = parseHTML(`<img class=${this.classes.IMG} />`)

      itemData.img.onload = () => {
        itemData.loaded = true
        if (typeof loadCallback === 'function') {
          if (index !== this.index) {
            return
          }
          loadCallback()
        }
      }

      itemData.img.onerror = () => {
        itemData.loadError = true
        if (typeof errorCallback === 'function') {
          if (index !== this.index) {
            return
          }
          errorCallback()
        }
      }

      itemData.img.setAttribute('src', itemData.href)
      itemData.hasBind = true
    }
  }

  updateStatus(status) {
    if (status === 'error') {
      this.content.removeClass(this.classes.LOADED, this.content)
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

  // appendTo(el) {
  //   this.image.appendTo(el)
  //   this.loader = el.find(`.${this.classes.LOADER}`)
  // }
  //
  // remove() {
  //   this.image.detach()
  // }
}

export default Image
Image
