import templateEngine from '@pluginjs/template'

class Loading {
  constructor(instance) {
    this.instance = instance
    this.classes = instance.classes
    this.events = instance.events
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
    this.instance.trigger(this.events.LOADINGSHOW, this)
  }

  hide() {
    this.instance.trigger(this.events.LOADINGHIDE, this)
  }

  error() {
    this.instance.trigger(this.events.LOADINGERROR, this)
  }
}

export default Loading
