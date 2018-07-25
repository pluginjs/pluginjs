import templateEngine from '@pluginjs/template'

import { events as EVENTS } from '../constant'
import { setStyle } from '@pluginjs/styled'
import { append, parseHTML, query } from '@pluginjs/dom'

window.AsYTAPIReady = false

class Youtube {
  constructor(instance, element, options) {
    this.element = element
    this.options = options
    this.instance = instance
    this.classes = instance.classes
  }

  load() {
    this.wrap = parseHTML(this.createHtml())
    append(this.wrap, this.element)
    if (this.options.poster) {
      this.poster = query(`.${this.instance.classes.POSTER}`, this.wrap)
      setStyle(
        { 'background-image': `url(${this.options.poster})` },
        this.poster
      )
    }
    if (window.AsYTAPIReady) {
      this.init()
      this.instance.trigger(EVENTS.LOAD)
    } else {
      this.loadApi()
    }
  }

  init() {
    this.iframe = document.createElement('div')
    append(this.iframe, this.wrap)

    this.setdefault()

    const playerSettings = {
      volume: 0, // 0 - 100
      autohide: 0, // autohide controls
      autoplay: this.options.autoplay, // autoplay on load
      color: 'red', // red, white
      controls: this.options.controls, // show control UI
      disablekb: 0, // enable/disable keyboard control
      enablejsapi: 1,
      fs: 0, // display fullscreen button
      hl: null, // interface language
      // iv_load_policy: 3,
      loop: 1, // loop video flag (doesn't work properly)
      modestbranding: 1, // show/hide youtube logo
      playsinline: 0,
      rel: 0, // shows relative videos
      showinfo: 0,
      start: 0, // set beginning of the video
      end: 0, // set end of the video
      quality: 'default' // small, medium, large, hd720, hd1080, highres or default
    }

    this.media = new window.YT.Player(this.iframe, {
      videoId: this.getId(),
      mute: true,
      repeat: true,
      playButtonClass: 'YTPlayer-play',
      pauseButtonClass: 'YTPlayer-pause',
      muteButtonClass: 'YTPlayer-mute',
      volumeUpClass: 'YTPlayer-volume-up',
      volumeDownClass: 'YTPlayer-volume-down',
      start: 0,
      pauseOnScroll: false,
      fitToBackground: true,
      playerVars: playerSettings,
      events: {
        onReady: () => {
          this.instance.trigger(EVENTS.LOADED)
          if (this.options.poster) {
            this.poster.style.display = 'none'
          }
        }
      }
    })
    this.bind()
  }

  getId() {
    if (this.options.id) {
      return this.options.id
    } else if (this.options.url) {
      return this.options.url.split('/')[3].split('?v=')[1]
    }
    return undefined /* eslint-disable-line */
  }

  loadApi() {
    window.onYouTubeIframeAPIReady = () => {
      this.init()
      window.AsYTAPIReady = true
      this.instance.trigger(EVENTS.LOAD)
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  setdefault() {
    this.options.autoplay = this.options.autoplay ? 1 : 0
    this.options.controls = this.options.controls ? 1 : 0
  }

  setSize(width, height) {
    setStyle(
      {
        width,
        height
      },
      this.wrap
    )
  }

  switchVideo(id) {
    this.media.loadVideoById({ videoId: id })
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

  bind() {
    this.media.addEventListener('onStateChange', event => {
      if (event.data === 1) {
        this.instance.trigger(EVENTS.PLAY)
      } else if (event.data === 2) {
        this.instance.trigger(EVENTS.PAUSE)
      } else if (event.data === 0) {
        this.instance.trigger(EVENTS.PLAYEND)
        if (this.options.loop === true) {
          this.play()
        }
      }
    })
    this.media.addEventListener('onError', () => {
      this.instance.trigger(EVENTS.PLAYERR)
    })
  }

  currentTime() {
    return this.media.getCurrentTime()
  }

  duration() {
    return this.media.getDuration()
  }

  setCurrentTime(val) {
    this.media.seekTo(val, true)
  }

  volume(value) {
    this.media.setVolume(value)
  }

  mute() {
    this.media.mute()
  }

  unMute() {
    this.media.unMute()
  }

  pause() {
    this.media.pauseVideo()
  }

  stop() {
    this.media.stopVideo()
    this.instance.trigger(EVENTS.STOP)
  }

  play() {
    this.media.playVideo()
  }

  destroy() {
    const element = query('iframe', this.wrap)
    if (element) {
      element.src = '//about:blank'
    }
    this.wrap.remove()
  }
}

export default Youtube
