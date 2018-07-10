import Component from '@pluginjs/component'
// import Hammer from 'hammerjs'
import { deepMerge } from '@pluginjs/utils'
// import { addClass, removeClass } from '@pluginjs/classes'
// import { bindEvent, removeEvent } from '@pluginjs/events'
// import { setStyle } from '@pluginjs/styled'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
// import { action, processor } from './decorators'
// import Arrows from '@pluginjs/arrows'
// import Dots from '@pluginjs/dots'
// import { cube, linear, fade } from './animate'

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Slider extends Component {
  state = true
  current = 0

  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)
    //     // this.sliderBox = this.element.querySelector(`.${this.classes.BOX}`)
    //     // this.sliderCards = this.element.querySelectorAll(`.${this.classes.CARD}`)
    //     // this.itemSelector = this.classes.ITEM
    this.initStates()
    // this.initialize()
    this.setupI18n()
    //     // this.defaultLocation = this.initLocation()
    //     // this.location = this.defaultLocation
  }

  // initialize() {}
}

export default Slider
