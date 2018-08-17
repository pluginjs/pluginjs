import { compose } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { append, closest } from '@pluginjs/dom'
import { bindEvent, removeEvent, bindEventOnce } from '@pluginjs/events'
import Fullscreen from '@pluginjs/fullscreen'

class Topbar {
  constructor(instance) {
    this.instance = instance
    this.classes = instance.classes
    this.initialize()
  }

  initialize() {
    this.instance.options.actions.unshift('counter')
    this.element = this.instance.getElement('topbar')

    this.instance.options.actions.forEach(item => {
      this[item] = this.instance.getElement(item)
      append(this[item], this.element)
    })
    this.setCounter(this.instance.active)
    append(this.element, this.instance.container)

    this.fullscreen = new Fullscreen(this.instance.container)

    this.bind()
  }

  bind() {
    compose(
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.PLAY}`,
        event => {
          event.preventDefault()

          this.autoPlay()
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.FULLSCREEN}`,
        event => {
          event.preventDefault()

          this.fullscreen.toggle()

          if (this.fullscreen.isFullscreen()) {
            this.mini()
          } else {
            this.full()
          }
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.DOWNLOAD}`,
        event => {
          event.preventDefault()

          const url = this.instance.data[this.instance.slider.plugin.current]
            .orig
          const filename = url.substr(url.lastIndexOf('/') + 1)

          this.down(url, filename)
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.CLOSE}`,
        event => {
          event.preventDefault()

          this.off()
        }
      )
    )(this.element)
  }

  autoPlay() {
    if (this.instance.is('play')) {
      this.stop()
    } else {
      this.start()

      bindEventOnce(
        this.instance.eventName('mousedown'),
        event => {
          if (closest(`.${this.classes.PLAY}`, event.target) === this.play) {
            return
          }

          this.stop()
        },
        this.instance.container
      )
    }
  }

  start() {
    this.instance.slider.plugin.intervalToggle(true)
    addClass(this.classes.AUTOPLAY, this.instance.container)

    this.instance.enter('play')
  }

  stop() {
    this.instance.slider.plugin.intervalToggle(false)
    removeClass(this.classes.AUTOPLAY, this.instance.container)

    this.instance.leave('play')
  }

  off() {
    this.instance.hide()

    if (this.fullscreen.isFullscreen()) {
      this.mini()
    }
  }

  full() {
    this.fullscreen.request()
    addClass(this.classes.ISFULL, this.instance.container)
  }

  mini() {
    this.fullscreen.exit()
    removeClass(this.classes.ISFULL, this.instance.container)
  }

  getBlob(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()

      xhr.open('GET', url, true)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        }
      }

      xhr.send()
    })
  }

  saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename)
    } else {
      const link = document.createElement('a')
      const body = document.querySelector('body')

      link.href = window.URL.createObjectURL(blob)
      link.download = filename

      // fix Firefox
      link.style.display = 'none'
      body.appendChild(link)

      link.click()
      body.removeChild(link)

      window.URL.revokeObjectURL(link.href)
    }
  }

  down(url, filename) {
    this.getBlob(url).then(blob => {
      this.saveAs(blob, filename)
    })
  }

  unbind() {
    removeEvent(this.instance.eventName('click'), this.close)
  }

  setCounter(index) {
    this.counter.innerHTML = `${index + 1} / ${this.instance.length}`
  }
}

export default Topbar
