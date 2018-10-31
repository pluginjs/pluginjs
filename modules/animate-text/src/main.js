import Component from '@pluginjs/component'
import { addClass } from '@pluginjs/classes'
import { text, append } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { isArray } from '@pluginjs/is'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

import effects from './effects/index'

const EFFECTS = {}

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class AnimateText extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)

    this.loop = this.options.loop
    this.mode = this.options.mode
    this.delay = this.options.delay
    this.duration = this.options.duration

    this.setupClasses()

    addClass(this.classes.NAMESPACE, this.element)

    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (typeof EFFECTS[this.mode] !== 'undefined') {
      this.effect = new EFFECTS[this.mode](this)
    }

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  splitWord(str, splitChar = false) {
    const words = str.split(' ')
    words.forEach((word, index, array) => {
      if (!splitChar) {
        const newWord = document.createElement('span')
        text(word, newWord)
        addClass(this.classes.WORD, newWord)
        append(newWord, this.element)
      } else {
        const chars = word.split('')
        chars.forEach(char => {
          const newChar = document.createElement('span')
          text(char, newChar)
          addClass(this.classes.CHAR, newChar)
          append(newChar, this.element)
        })
      }

      if (index < array.length - 1) {
        const space = document.createElement('span')
        addClass(this.classes.SPACE, space)
        text(' ', space)
        append(space, this.element)
      }
    })
  }

  switchWord() {
    addClass(this.classes.SWITCH, this.element)
    const content = document.createElement('span')
    addClass(this.classes.WORD, content)
    text(text(this.element), content)
    text('', this.element)
    append(content, this.element)

    this.alt = isArray(this.options.alt)
      ? this.options.alt
      : [].push(this.options.alt)

    this.alt.forEach(alt => {
      const span = document.createElement('span')
      addClass(this.classes.WORD, span)
      text(alt, span)
      append(span, this.element)
    })
  }

  bind() {
    bindEvent(this.eventName('click touch'), () => false, this.element)
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

  static registerEffect(name, effect) {
    EFFECTS[name] = effect
  }
}

Object.keys(effects).forEach(effect => {
  AnimateText.registerEffect(effect, effects[effect])
})

export default AnimateText
