import templateEngine from '@pluginjs/template'
import { events as EVENTS } from '../constant'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, trigger } from '@pluginjs/events'
import { append, parseHTML, query } from '@pluginjs/dom'

window.AsVimeoAPIReady = false

class Vimeo {
  constructor(instance, element, options) {
    this.element = element
    this.options = options
    this.instance = instance
    this.classes = instance.classes
  }

  load() {
    this.$wrap = parseHTML(this.createHtml())
    append(this.$wrap, this.element)
    if (this.options.poster) {
      this.poster = query(`.${this.instance.classes.POSTER}`, this.$wrap)
      setStyle('background-image', `url(${this.options.poster})`, this.poster)
    }

    if (window.AsVimeoAPIReady) {
      this.init()
      this.instance.trigger(EVENTS.LOAD)
    } else {
      this.loadApi()
      bindEvent(
        {
          type: 'AsVideoVimeoAPIReady',
          handler: () => {
            this.init()
            this.instance.trigger(EVENTS.LOAD)
          }
        },
        this.element
      )
    }
  }

  init() {
    const playerSettings = {
      id: this.getId(),
      loop: this.options.loop,
      autoplay: this.options.autoplay,
      // height:400,
      // url:'https://player.vimeo.com/video/76979871',
      title: false, // defaults to true
      portrait: false, // Show the user’s portrait on the video. Defaults to true.
      // maxwidth: '',
      // maxheight '',
      xhtml: false, // Make the embed code XHTML compliant. Defaults to false.
      byline: false, // Show the byline on the video. Defaults to true.
      autopause: false // Pause this video automatically when another one plays. Defaults to true.
    }

    this.media = new window.Vimeo.Player(this.$wrap, playerSettings)
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

  loadApi() {
    const tag = document.createElement('script')
    tag.src = 'https://player.vimeo.com/api/player.js'
    document.querySelector('body').appendChild(tag)

    let count = 1
    const vimeoApiReady = setInterval(() => {
      if (count > 50) {
        clearInterval(vimeoApiReady)
        this.instance.destroy()
      }
      count++
      if (typeof window.Vimeo === 'undefined') {
        return
      }
      window.AsVimeoAPIReady = true
      trigger('AsVideoVimeoAPIReady', this.element)
      clearInterval(vimeoApiReady)
    }, 350)
  }

  bind() {
    this.media.on('play', () => {
      this.instance.trigger(EVENTS.PLAY)
    })
    this.media.on('pause', () => {
      this.instance.trigger(EVENTS.PAUSE)
    })
    this.media.on('loaded', () => {
      this.instance.trigger(EVENTS.LOADED)
      if (this.options.poster) {
        this.poster.style.display = 'none'
      }
    })
  }

  setSize(width, height) {
    setStyle(
      {
        width,
        height
      },
      this.$wrap
    )
  }

  switchVideo(id) {
    this.media.loadVideo(id)
  }

  _currentTime() {
    this.media.getCurrentTime().then(seconds => {
      this.options.currentTime = seconds
    })
  }

  currentTime() {
    this._currentTime()
    return this.options.currentTime
  }

  _duration() {
    return this.media.getDuration().then(duration => {
      this.options.duration = duration
    })
  }

  duration() {
    this._duration()
    return this.options.duration
  }

  setCurrentTime(val) {
    this.media.setCurrentTime(val)
  }

  stop() {
    this.media.setCurrentTime(0)
    this.media.pause()
    this.instance.trigger(EVENTS.STOP)
  }

  mute() {
    this.volume(0)
  }

  unMute() {
    this.volume(50)
  }

  pause() {
    this.media.pause()
    this.instance.trigger('pause')
  }

  volume(value) {
    this.media.setVolume(value / 100)
  }

  play() {
    this.media.play()
  }

  destroy() {
    const element = query('iframe', this.$wrap)
    if (element) {
      element.src = '//about:blank'
    }
    this.$wrap.remove()
  }
}

export default Vimeo
