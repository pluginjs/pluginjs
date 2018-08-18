import Component from '@pluginjs/component'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable
} from '@pluginjs/decorator'
import template from '@pluginjs/template'
import { setStyle } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import { appendTo } from '@pluginjs/dom'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import HTML5SOURCE from './source/html5'
import VIMEOSOURCE from './source/vimeo'
import YOUTUBESOURCE from './source/youtube'

const sources = {}

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Video extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.NAMESPACE, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    if (this.options.poster) {
      this.$poster = appendTo(this.createPoster(), this.element)
      setStyle('background-image', `url(${this.options.poster})`, this.$poster)
    }

    if (typeof sources[this.options.type] !== 'undefined') {
      this.player = new sources[this.options.type](this, this.element)
    }
    this.player.init(() => {
      this.load()

      this.enter('initialized')
      this.trigger(EVENTS.READY)
    })
  }

  createPoster() {
    return template.render(this.options.templates.poster.call(this), {
      classes: this.classes
    })
  }

  hidePoster() {
    if (this.options.poster) {
      addClass(this.classes.POSTERHIDE, this.$poster)
    }
  }

  load() {
    if (!this.is('loaded')) {
      this.player.load()
      this.enter('loaded')
    }
  }

  switchVideo(id) {
    if (this.is('loaded')) {
      this.player.switchVideo(id)
    }
  }

  duration() {
    if (this.is('loaded')) {
      return this.player.duration()
    }

    return undefined
  }

  currentTime() {
    if (this.is('loaded')) {
      return this.player.currentTime()
    }

    return undefined
  }

  setCurrentTime(val) {
    if (this.is('loaded')) {
      this.player.setCurrentTime(val)
    }
  }

  setSize(width, height) {
    if (this.is('loaded')) {
      this.player.setSize(width, height)
      this.options.width = width
      this.options.height = height
    }
  }

  play() {
    if (this.is('loaded')) {
      this.player.play()
    }
  }

  stop() {
    if (this.is('loaded')) {
      this.player.stop()
    }
  }

  volume(val) {
    if (this.is('loaded')) {
      this.player.volume(val)
    }
  }

  pause() {
    if (this.is('loaded')) {
      this.player.pause()
    }
  }

  mute() {
    if (this.is('loaded')) {
      this.player.mute()
    }
  }

  unMute() {
    if (this.is('loaded')) {
      this.player.unMute()
    }
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')

      removeClass(this.classes.NAMESPACE, this.element)
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      if (this.options.poster) {
        this.$poster.remove()
      }

      this.player.destroy()
    }

    if (this.is('loaded')) {
      this.leave('loaded')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static registerSource(type, API) {
    sources[type] = API
  }

  static prepare(type) {
    if (typeof sources[type] !== 'undefined' && 'prepare' in sources[type]) {
      sources[type].prepare()
    }
  }
}

Video.registerSource('youtube', YOUTUBESOURCE)
Video.registerSource('vimeo', VIMEOSOURCE)
Video.registerSource('html5', HTML5SOURCE)

export default Video
