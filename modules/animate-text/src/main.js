import Component from '@pluginjs/component'
import { addClass } from '@pluginjs/classes'
import { text, append } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
// import anime from 'animejs'
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
// import match from './effect'

import fade from './effects/fade'
import fadeDown from './effects/fadeDown'
import fadeUp from './effects/fadeUp'
import fadeLeft from './effects/fadeLeft'
import fadeRight from './effects/fadeRight'
import zoom from './effects/zoom'
import bounce from './effects/bounce'
import swing from './effects/swing'

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

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  // initialize() {
  //   addClass(this.classes.NAMESPACE, this.element)
  //   this.bind()
  //   this.initWord()
  //   const options = ['mode', 'loop', 'delay', 'duration'].reduce(
  //     (newOptions, key) => ({
  //       ...newOptions,
  //       [key]: this.options[key]
  //     }),
  //     { target: this.element }
  //   )
  //   const getAnimeConfigByOptions = options => {
  //     const { mode, ...animeOptions } = options
  //     if (mode === 'custom') {
  //       return this.options.scripts
  //     }
  //     // const isMultiple = Boolean(this.element.children.length)
  //     // if (isMultiple) {
  //     //   addClass(this.classes.CONTAINER, this.element)
  //     // }
  //     // const animeGateWay = match(isMultiple, mode)
  //     const animeGateWay = match(false, mode)
  //     return animeGateWay(animeOptions)
  //   }
  //   const animeConfig = getAnimeConfigByOptions(options)
  //   // if (animeConfig.childrens) {
  //   //   anime(animeConfig.container)
  //   //   animeConfig.childrens.forEach((children, index) =>
  //   //     setTimeout(() => anime(children), index * 1000)
  //   //   )
  //   // } else {
  //   //   anime(animeConfig)
  //   // }
  //   anime(animeConfig)
  //   this.enter('initialized')
  //   this.trigger(EVENTS.READY)
  // }

  splitWord(str, splitChar = true) {
    const words = str.split(' ')
    words.forEach((word, index, array) => {
      const chars = word.split('')
      const newWord = document.createElement('span')
      addClass(this.classes.WORD, newWord)

      if (splitChar) {
        chars.forEach(char => {
          const newChar = document.createElement('span')
          text(char, newChar)
          addClass(this.classes.CHAR, newChar)
          append(newChar, newWord)
        })
      }

      append(newWord, this.element)

      if (index < array.length - 1) {
        const space = document.createElement('span')
        addClass(this.classes.SPACE, space)
        text(' ', space)
        append(space, this.element)
      }
    })
  }

  render(dom) {
    this.element.textContent = ''
    this.element.append(dom)
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

AnimateText.registerEffect('fade', fade)
AnimateText.registerEffect('fadeDown', fadeDown)
AnimateText.registerEffect('fadeUp', fadeUp)
AnimateText.registerEffect('fadeLeft', fadeLeft)
AnimateText.registerEffect('fadeRight', fadeRight)
AnimateText.registerEffect('zoom', zoom)
AnimateText.registerEffect('bounce', bounce)
AnimateText.registerEffect('swing', swing)

export default AnimateText
