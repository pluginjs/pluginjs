import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import { addClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import anime from 'animejs'
import { eventable, register, stateable, styleable } from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import match from './effect'

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
class AnimateText extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.bind()
    const options = ['mode', 'loop', 'delay', 'duration'].reduce(
      (newOptions, key) => ({
        ...newOptions,
        [key]: this.options[key]
      }),
      { target: this.element }
    )
    const getAnimeConfigByOptions = options => {
      const { mode, ...animeOptions } = options
      if (mode === 'custom') {
        return this.options.scripts
      }
      const isMultiple = Boolean(this.element.children.length)
      if (isMultiple) {
        addClass(this.classes.CONTAINER, this.element)
      }
      const animeGateWay = match(isMultiple, mode)
      return animeGateWay(animeOptions)
    }
    const animeConfig = getAnimeConfigByOptions(options)
    if (animeConfig.childrens) {
      anime(animeConfig.container)
      animeConfig.childrens.forEach((children, index) =>
        setTimeout(() => anime(children), index * 1000)
      )
    } else {
      anime(animeConfig)
    }
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  render(dom) {
    this.element.textContent = ''
    this.element.append(dom)
  }

  bind() {
    bindEvent(
      { type: this.eventName('click touch'), handler: () => false },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default AnimateText
