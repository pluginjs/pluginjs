import templateEngine from '@pluginjs/template'
import { events as EVENTS } from './constant'

class Loading {
  constructor(instance) {
    this.instance = instance
    this.classes = instance.classes
    this.build()
  }
  build() {
    if (this._builded) {
      return
    }

    const options = this.instance.options
    templateEngine.render(options.templates.loading.call(this), {
      classes: this.classes
    })
    // this.element = query(html)
    // options.loading.appendTo

    this._builded = true
  }

  show() {
    this.instance.trigger(EVENTS.LOADINGSHOW)
  }

  hide() {
    this.instance.trigger(EVENTS.LOADINGHIDE)
  }

  error() {
    this.instance.trigger(EVENTS.LOADINGERROR)
  }
}

export default Loading
