import { isArray } from '@pluginjs/is'
import { events as EVENTS } from '../constant'
import { setStyle } from '@pluginjs/styled'
import { append } from '@pluginjs/dom'
import { each } from '@pluginjs/utils'

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
    this.$player = document.createElement('video')

    this.$player.autoplay = this.options.autoplay
    this.$player.controls = this.options.controls
    this.$player.loop = this.options.loop
    this.$player.muted = this.options.muted

    append(this.$player, this.element)

    done()
  }

  load() {
    this.instance.trigger(EVENTS.LOAD)

    this.setSources(this.options.url)

    this.bind()
  }

  bind() {
    this.listeners = {
      canplay: () => {
        this.instance.trigger(EVENTS.LOADED)
        this.instance.hidePoster()
      },
      play: () => {
        this.instance.trigger(EVENTS.PLAY)
      },
      pause: () => {
        this.instance.trigger(EVENTS.PAUSE)
      },
      ended: () => {
        this.instance.trigger(EVENTS.ENDED)
      },
      waiting: () => {
        this.instance.trigger(EVENTS.BUFFERING)
      },
      error: error => {
        this.instance.trigger(EVENTS.ERROR, error)
      }
    }

    each(this.listeners, (event, listener) => {
      this.$player.addEventListener(event, listener)
    })
  }

  unbind() {
    each(this.listeners, (event, listener) => {
      this.$player.removeEventListener(event, listener)
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

    append(source, this.$player)
  }

  setSize(width, height) {
    setStyle(
      {
        width,
        height
      },
      this.$player
    )
  }

  swichVideo(src) {
    this.pause()
    this.$player.innerHTML = ''
    this.setSources(src)
    this.$player.load()
  }

  currentTime() {
    return this.$player.currentTime
  }

  duration() {
    return this.$player.duration
  }

  setCurrentTime(val) {
    this.$player.currentTime = val
  }

  pause() {
    this.$player.pause()
  }

  play() {
    this.$player.play()
  }

  mute() {
    this.$player.muted = true
  }

  unMute() {
    this.$player.muted = false
  }

  stop() {
    this.$player.currentTime = 0
    this.$player.pause()
    this.instance.trigger(EVENTS.STOP)
  }

  volume(value) {
    this.$player.volume = value / 100
  }

  destroy() {
    this.unbind()
    this.$player.remove()
  }
}

export default Html5
