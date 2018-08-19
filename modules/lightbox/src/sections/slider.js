import { append } from '@pluginjs/dom'
import { deepMerge } from '@pluginjs/utils'
import SLIDER from '@pluginjs/slider'

class Slider {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.element = this.instance.getElement('slider')
    append(this.element, this.instance.container)

    setTimeout(() => {
      this.initSlider()
    }, 0)
  }

  initSlider() {
    const instance = this.instance
    this.plugin = SLIDER.of(
      this.element,
      deepMerge(instance.options, {
        data: instance.processData(instance.data, 'orig'),
        current: instance.active,
        onChange() {
          instance.topbar.setCounter(this.current)
          instance.caption.setInfo(instance.data[this.current])

          if (instance.options.thumbs) {
            instance.thumbs.plugin.go(this.current, false)
          }
        }
      })
    )
  }
}

export default Slider
