import templateEngine from '@pluginjs/template'
import is from '@pluginjs/is'
import { events as EVENTS } from '../constant'
import { setStyle } from '@pluginjs/styled'
import { append, parseHTML, query } from '@pluginjs/dom'

class Html5 {
  constructor(video, element, options) {
    this.element = element
    this.options = options
    this.instance = video
    this.classes = video.classes
  }

  load() {
    this.$wrap = parseHTML(this.createHtml())
    append(this.$wrap, this.element)
    if (this.options.poster) {
      this.poster = query(`.${this.instance.classes.POSTER}`, this.$wrap)
      setStyle(
        { 'background-image': `url(${this.options.poster})` },
        this.poster
      )
    }

    this.video = document.createElement('video')
    this.setDefaultParameters()
    append(this.video, this.$wrap)

    this.instance.trigger(EVENTS.LOAD)
    this.instance.trigger(EVENTS.LOADED)
    if (this.options.poster) {
      this.poster.style.display = 'none'
    }
    this.bind()
  }

  setDefaultParameters() {
    if (is.array(this.options.url)) {
      for (let i = 0; i < this.options.url.length; i++) {
        const videoTypeArr = this.options.url[i].split('.')
        const videoType = videoTypeArr[videoTypeArr.length - 1]

        this.addSourceToVideo(this.options.url[i], videoType)
      }
    } else {
      const videoTypeArr = this.options.url.split('.')
      const videoType = videoTypeArr[videoTypeArr.length - 1]

      this.addSourceToVideo(this.options.url, videoType)
    }

    this.video.autoplay = this.options.autoplay
    this.video.controls = this.options.controls
    this.video.loop = this.options.loop
  }

  createHtml() {
    let poster = ''

    if (this.options.poster !== '') {
      poster = templateEngine.render(this.options.templates.poster.call(this), {
        classes: this.classes
      })
    }

    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes,
      poster
    })
    return html
  }

  addSourceToVideo(src, type) {
    const source = document.createElement('source')

    source.src = src
    source.type = `video/${type}`

    append(source, this.video)
  }

  setSize(width, height) {
    setStyle(
      {
        width,
        height
      },
      this.video
    )
    setStyle(
      {
        width,
        height
      },
      this.$wrap
    )
  }

  switchVideo(id) {
    this.video.src = id
  }

  bind() {
    this.eventListener('play')
    this.eventListener('pause')
    this.eventListener('error')
    // this.eventListener('stalled')
  }

  registerEvent(eventName, callback, element) {
    if (!this.listeners) {
      this.listeners = {}
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }

    this.listeners[eventName].push(callback)

    element.addEventListener(eventName, callback)
  }

  removeListener(eventName, element) {
    this.listeners[eventName].map(callback => {
      return element.removeEventListener(eventName, callback)
    })
  }

  unbind() {
    this.removeListener('error', this.video)
    this.removeListener('play', this.video)
    this.removeListener('pause', this.video)
  }

  eventListener(eventName) {
    const capitalEvent = eventName.toUpperCase()
    this.registerEvent(
      eventName,
      () => {
        this.instance.trigger(EVENTS[capitalEvent])
      },
      this.video
    )
  }

  currentTime() {
    return this.video.currentTime
  }

  duration() {
    return this.video.duration
  }

  setCurrentTime(val) {
    this.video.currentTime = val
  }

  pause() {
    this.video.pause()
  }

  play() {
    this.video.play()
  }

  mute() {
    this.video.muted = true
  }

  unMute() {
    this.video.muted = false
  }

  stop() {
    this.video.currentTime = 0
    this.video.pause()
    this.instance.trigger(EVENTS.STOP)
  }

  volume(value) {
    this.video.volume = value / 100
  }

  destroy() {
    this.unbind()
    const element = query('video', this.$wrap)
    if (element) {
      element.src = '//about:blank'
    }
    this.$wrap.remove()
  }
}

export default Html5
