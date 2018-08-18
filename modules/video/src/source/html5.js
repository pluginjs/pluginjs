import { isArray } from '@pluginjs/is'
import { events as EVENTS } from '../constant'
import { setStyle } from '@pluginjs/styled'
import { append } from '@pluginjs/dom'

class Html5 {
  constructor(instance, element) {
    this.element = element
    this.options = Object.assign(
      {
        autoplay: false,
        controls: true,
        loop: true,
        muted: false
      },
      instance.options
    )
    this.instance = instance
  }

  init(done) {
    this.$video = document.createElement('video')

    this.$video.autoplay = this.options.autoplay
    this.$video.controls = this.options.controls
    this.$video.loop = this.options.loop
    this.$video.muted = this.options.muted

    append(this.$video, this.element)

    done()
  }

  load() {
    this.instance.trigger(EVENTS.LOAD)

    this.setSources(this.options.url)

    this.bind()
  }

  bind() {
    this.$video.addEventListener('canplay', () => {
      this.instance.trigger(EVENTS.LOADED)
      this.instance.hidePoster()
    })
    this.$video.addEventListener('play', () => {
      this.instance.trigger(EVENTS.PLAY)
    })
    this.$video.addEventListener('pause', () => {
      this.instance.trigger(EVENTS.PAUSE)
    })
    this.$video.addEventListener('ended', () => {
      this.instance.trigger(EVENTS.ENDED)
    })
    this.$video.addEventListener('waiting', () => {
      this.instance.trigger(EVENTS.BUFFERING)
    })
    this.$video.addEventListener('error', error => {
      this.instance.trigger(EVENTS.ERROR, error)
    })
  }

  setSources(sources) {
    if (isArray(sources)) {
      sources.forEach(source => {
        this.addSource(source)
      })
    } else {
      this.addSource(sources)
    }
  }

  addSource(url) {
    const type = url.split('.').pop()
    const source = document.createElement('source')

    source.src = url
    source.type = `video/${type}`

    append(source, this.$video)
  }

  setSize(width, height) {
    setStyle(
      {
        width,
        height
      },
      this.$video
    )
  }

  switchVideo(src) {
    this.pause()
    this.$video.innerHTML = ''
    this.setSources(src)
    this.$video.load()
  }

  currentTime() {
    return this.$video.currentTime
  }

  duration() {
    return this.$video.duration
  }

  setCurrentTime(val) {
    this.$video.currentTime = val
  }

  pause() {
    this.$video.pause()
  }

  play() {
    this.$video.play()
  }

  mute() {
    this.$video.muted = true
  }

  unMute() {
    this.$video.muted = false
  }

  stop() {
    this.$video.currentTime = 0
    this.$video.pause()
    this.instance.trigger(EVENTS.STOP)
  }

  volume(value) {
    this.$video.volume = value / 100
  }

  destroy() {
    this.$video.remove()
  }
}

export default Html5
