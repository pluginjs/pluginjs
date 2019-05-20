import { append } from '@pluginjs/dom'
import { deepMerge } from '@pluginjs/utils'
import THUMBS from '@pluginjs/thumbnails'

class Thumbs {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    if (!this.instance.options.hasThumbs) {
      return
    }

    this.element = this.instance.getElement('thumbs')

    append(this.element, this.instance.footer)

    setTimeout(() => {
      this.initThumbs()
    }, 0)
  }

  initThumbs() {
    const instance = this.instance

    this.plugin = THUMBS.of(
      this.element,
      deepMerge(instance.options, instance.options.thumb, {
        data: instance.processData(instance.data, 'thumb'),
        current: instance.active,
        mode: 'center',
        onChange() {
          instance.slider.plugin.go(this.current, false)
          instance.topbar.setCounter(this.current)
          instance.caption.setInfo(instance.data[this.current])
        }
      })
    )
  }
}

export default Thumbs
