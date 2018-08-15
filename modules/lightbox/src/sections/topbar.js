import { compose } from '@pluginjs/utils'
import { append } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'

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

    this.bind()
  }

  bind() {
    compose(
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.PLAY}`,
        event => {
          event.preventDefault()
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.FULLSCREEN}`,
        event => {
          event.preventDefault()
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

          function getBlob(url) {
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

          function saveAs(blob, filename) {
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

          function download(url, filename) {
            getBlob(url).then(blob => {
              saveAs(blob, filename)
            })
          }

          download(url, filename)
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.classes.CLOSE}`,
        event => {
          event.preventDefault()

          this.instance.hide()
        }
      )
    )(this.element)
  }

  unbind() {
    removeEvent(this.instance.eventName('click'), this.close)
  }

  setCounter(index) {
    this.counter.innerHTML = `${index + 1} / ${this.instance.length}`
  }
}

export default Topbar
