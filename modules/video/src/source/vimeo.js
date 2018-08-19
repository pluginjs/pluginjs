import { events as EVENTS } from '../constant'
import { setStyle } from '@pluginjs/styled'
import { append, query } from '@pluginjs/dom'
import Pj from '@pluginjs/factory'

window.PJVIMEOAPIREADY = false

class Vimeo {
  constructor(instance, element) {
    this.element = element
    this.options = Object.assign(
      {
        autopause: true,
        autoplay: false,
        background: !instance.options.controls,
        byline: false,
        color: '#00adef',
        loop: true,
        muted: false,
        playsinline: true,
        portrait: false,
        speed: false,
        title: false,
        transparent: false
      },
      instance.options
    )
    this.instance = instance
  }

  init(done) {
    this._duration = null
    this._currentTime = null

    this.$player = document.createElement('div')
    setStyle(
      {
        width: this.options.width,
        height: this.options.height
      },
      this.$player
    )
    append(this.$player, this.element)

    if (!window.PJVIMEOAPIREADY) {
      Pj.emitter.on('video:vimeo:ready', () => {
        done()
      })

      this.constructor.prepare()
    } else {
      done()
    }
  }

  load() {
    this.instance.trigger(EVENTS.LOAD)

    const options = this.options
    this.api = new window.Vimeo.Player(this.$player, {
      id: this.getId(),
      autopause: options.autopause,
      autoplay: options.autoplay,
      background: options.background,
      byline: options.byline,
      color: options.color,
      loop: options.loop,
      muted: options.muted,
      playsinline: options.playsinline,
      portrait: options.portrait,
      speed: options.speed,
      title: options.title,
      transparent: options.transparent
    })

    this.bind()
  }

  getId() {
    if (this.options.id) {
      return this.options.id
    } else if (this.options.url) {
      return this.options.url.split('/')[3].split('?')[0]
    }
    return undefined /* eslint-disable-line */
  }

  static prepare() {
    if (!window.PJVIMEOAPIREADY) {
      const script = document.createElement('script')
      script.onload = () => {
        window.PJVIMEOAPIREADY = true

        Pj.emitter.emit('video:vimeo:ready')
      }

      script.src = 'https://player.vimeo.com/api/player.js'
      const firstScript = document.getElementsByTagName('script')[0]
      firstScript.parentNode.insertBefore(script, firstScript)
    }
  }

  bind() {
    this.api.on('play', () => {
      this.instance.trigger(EVENTS.PLAY)
    })
    this.api.on('pause', () => {
      this.instance.trigger(EVENTS.PAUSE)
    })
    this.api.on('ended', () => {
      this.instance.trigger(EVENTS.ENDED)
    })
    this.api.on('loaded', () => {
      this.instance.trigger(EVENTS.LOADED)
      this.instance.hidePoster()

      this.$iframe = query('iframe', this.$player)
      this.$iframe.setAttribute('width', '100%')
      this.$iframe.setAttribute('height', '100%')

      if (this.options.background && !this.options.muted) {
        this.volume(50)
      }

      this.api.getDuration().then(duration => {
        this._duration = duration
      })
    })

    this.api.on('timeupdate', time => {
      this._currentTime = time.seconds
    })
    this.api.on('error', error => {
      this.instance.trigger(EVENTS.ERROR, error)
    })
    this.api.on('bufferstart', () => {
      this.instance.trigger(EVENTS.BUFFERING)
    })
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

  swichVideo(id) {
    this.api.loadVideo(id)
  }

  currentTime() {
    return this._currentTime
  }

  duration() {
    return this._duration
  }

  setCurrentTime(val) {
    this.api.setCurrentTime(val)
  }

  stop() {
    this.api.setCurrentTime(0)
    this.api.pause()
    this.instance.trigger(EVENTS.STOP)
  }

  mute() {
    this.api.getVolume().then(volume => {
      this._preVolume = volume
    })
    this.volume(0)
  }

  unMute() {
    if (this._preVolume) {
      this.api.setVolume(this._preVolume)
    }
  }

  pause() {
    this.api.pause()
  }

  volume(value) {
    if (typeof value === 'undefined') {
      return this.api.getVolume()
    }
    return this.api.setVolume(value / 100)
  }

  play() {
    this.api.play()
  }

  destroy() {
    if (this.api) {
      this.api.destroy()
    }

    this.$player.remove()
  }
}

export default Vimeo
