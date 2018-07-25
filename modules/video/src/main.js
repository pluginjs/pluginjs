import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import { eventable, register, stateable, styleable } from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import HTML5API from './source/html5'
import VIMEOAPI from './source/vimeo'
import YOUTUBEAPI from './source/youtube'

const sources = {}

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS
})
class Video extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    if (typeof sources[this.options.type] !== 'undefined') {
      this.player = new sources[this.options.type](
        this,
        this.element,
        this.options
      )
    }
    this.load()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  load() {
    if (!this.is('loaded')) {
      this.player.load()
      this.enter('loaded')
    }
  }

  switchVideo(id) {
    this.player.switchVideo(id)
  }

  duration() {
    return this.player.duration()
  }

  currentTime() {
    return this.player.currentTime()
  }

  setCurrentTime(val) {
    this.player.setCurrentTime(val)
  }

  setSize(width, height) {
    this.player.setSize(width, height)
    this.options.width = width
  }

  play() {
    this.player.play()
  }

  stop() {
    this.player.stop()
  }

  volume(val) {
    this.player.volume(val)
  }

  pause() {
    this.player.pause()
  }

  mute() {
    this.player.mute()
  }

  unMute() {
    this.player.unMute()
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
    }
    if (this.is('loaded')) {
      this.leave('loaded')
      this.player.destroy()
    }
    if (this.plugin) {
      this.trigger(EVENTS.DESTROY)
    }
    super.destroy()
  }

  static registerSource(type, API) {
    sources[type] = API
  }
}

Video.registerSource('youtube', YOUTUBEAPI)
Video.registerSource('vimeo', VIMEOAPI)
Video.registerSource('html5', HTML5API)

export default Video
