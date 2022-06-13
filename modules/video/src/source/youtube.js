/* eslint-disable camelcase */
import { events as EVENTS } from '../constant'
import { setStyle } from '@pluginjs/styled'
import { append } from '@pluginjs/dom'
import Pj from '@pluginjs/factory'

window.PJYTAPIREADY = false

class Youtube {
  constructor(instance, element) {
    this.element = element
    this.options = Object.assign(
      {
        autoplay: true,
        controls: false,
        muted: false,
        disablekb: false,
        fs: false,
        iv_load_policy: true,
        loop: true,
        modestbranding: false,
        playsinline: true,
        rel: false,
        showinfo: false
      },
      instance.options
    )
    this.instance = instance
  }

  init(done) {
    this.$player = document.createElement('div')
    append(this.$player, this.element)

    if (!window.PJYTAPIREADY) {
      Pj.emitter.on('video:youtube:ready', () => {
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
    this.api = new window.YT.Player(this.$player, {
      videoId: this.getId(),
      width: options.width,
      height: options.height,
      playerVars: {
        autoplay: options.autoplay ? 1 : 0,
        cc_load_policy: options.cc_load_policy ? 1 : 0,
        controls: options.controls ? 2 : 0,
        disablekb: options.keyboard ? 0 : 1,
        enablejsapi: 0,
        fs: options.fullscreen ? 1 : 0,
        iv_load_policy: options.iv_load_policy ? 1 : 3,
        loop: options.loop ? 1 : 0,
        playlist: this.getId(),
        modestbranding: options.modestbranding ? 1 : 0,
        origin: window.location.origin,
        playsinline: options.playsinline ? 1 : 0,
        rel: options.rel ? 1 : 0,
        showinfo: options.showinfo ? 1 : 0,
        wmode: 'opaque'
      },
      events: {
        onReady: () => {
          this.instance.trigger(EVENTS.LOADED)
          this.instance.hidePoster()

          if (options.muted) {
            this.api.mute()
          }
        },
        onStateChange: event => {
          if (event.data === 1) {
            this.instance.trigger(EVENTS.PLAY)
          } else if (event.data === 2) {
            this.instance.trigger(EVENTS.PAUSE)
          } else if (event.data === 0) {
            this.instance.trigger(EVENTS.ENDED)
          } else if (event.data === 3) {
            this.instance.trigger(EVENTS.BUFFERING)
          }
        },
        onError: error => {
          this.instance.trigger(EVENTS.ERROR, error)
        }
      }
    })
  }

  getId() {
    if (this.options.id) {
      return this.options.id
    } else if (this.options.url) {
      if(this.options.url.indexOf('?v=') !== -1) {
        return this.options.url.split('/')[3].split('?v=')[1]
      } else {
        return this.options.url.split('/')[3]
      }
    }
    return undefined /* eslint-disable-line */
  }

  static prepare() {
    window.onYouTubeIframeAPIReady = () => {
      window.PJYTAPIREADY = true

      Pj.emitter.emit('video:youtube:ready')
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  }

  setSize(width, height) {
    setStyle(
      {
        width,
        height
      },
      this.element
    )
    setStyle(
      {
        width,
        height
      },
      this.element
    )
  }

  swichVideo(id) {
    this.api.loadVideoById({ videoId: id })
  }

  currentTime() {
    return this.api.getCurrentTime()
  }

  duration() {
    return this.api.getDuration()
  }

  setCurrentTime(val) {
    this.api.seekTo(val, true)
  }

  volume(value) {
    this.api.setVolume(value)
  }

  mute() {
    this.api.mute()
  }

  unMute() {
    this.api.unMute()
  }

  pause() {
    this.api.pauseVideo()
  }

  stop() {
    this.api.stopVideo()
    this.instance.trigger(EVENTS.STOP)
  }

  play() {
    this.api.playVideo()
  }

  destroy() {
    if (this.api) {
      this.api.destroy()
    }

    this.$player.remove()
  }
}

export default Youtube
