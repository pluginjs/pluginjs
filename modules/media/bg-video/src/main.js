import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import templateEngine from '@pluginjs/template'
import { addClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import Video from '@pluginjs/video'
import { append, parseHTML, query } from '@pluginjs/dom'
import Pj, {
  eventable,
  register,
  stateable,
  styleable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  },
  INFO
)
class BgVideo extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options)
    this.initClasses(CLASSES)

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.video = parseHTML(this.createHtml())

    append(this.video, this.element)

    this.appendVideo(this.options.video)

    this.trigger(EVENTS.READY)
    this.enter('initialized')
  }

  appendVideo(options) {
    this.videoApi = Video.of(this.video, {
      type: this.options.type,
      url: options.url,
      id: options.id,
      loop: options.repeat,
      poster: options.mobileImage,
      autoplay: options.autoplay,
      onLoaded: () => {
        if (options.mute) {
          this.videoApi.mute()
        }
        this.setVideoSize()
      }
    })

    this.videoApi.load()
  }

  setVideoSize() {
    this.player = query('iframe', this.video)
    if (!this.player) {
      this.player = query('video', this.video)
    }
    this.ratio =
      parseInt(getStyle('width', this.player), 10) /
      parseInt(getStyle('height', this.player), 10)

    const { width, height } = this.getPlayerSize()

    Pj.emitter.on('resize', this.resizeHandle, this)

    addClass(this.classes.POINTEREVENTNONE, this.player)
    setStyle(
      {
        width,
        height,
        visibility: 'visible'
      },
      this.player
    )
  }

  getPlayerSize() {
    const size = {}
    const elementWidth = parseInt(getStyle('width', this.element), 10)
    const elementHeight = parseInt(getStyle('height', this.element), 10)
    const elementratio = elementWidth / elementHeight
    if (this.ratio < elementratio) {
      size.width = `${elementWidth.toString()}px`
      size.height = `${Math.ceil(elementWidth / this.ratio).toString()}px`
    } else {
      size.width = `${Math.ceil(elementHeight * this.ratio).toString()}px`
      size.height = `${elementHeight.toString()}px`
    }

    return size
  }

  resizeHandle() {
    const { width, height } = this.getPlayerSize()
    setStyle(
      {
        width,
        height
      },
      this.player
    )
  }

  createHtml() {
    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes
    })
    return html
  }

  play() {
    this.videoApi.play()
    this.trigger(EVENTS.PLAY)
  }

  pause() {
    this.videoApi.pause()
    this.trigger(EVENTS.PAUSE)
  }

  stop() {
    this.videoApi.stop()
    this.trigger(EVENTS.STOP)
  }

  setVolume(value) {
    this.videoApi.volume(value)
  }

  change(options = {}) {
    this.videoApi.destroy()
    const o = deepMerge(DEFAULTS, options)
    this.appendVideo(o)
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
    }

    this.videoApi('destroy')
    this.video.remove()

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default BgVideo
