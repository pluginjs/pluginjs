import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import { children, find } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import Pj, {
  eventable,
  register,
  stateable,
  styleable,
  themeable
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
import Animate from './animate'
import Responsive from './responsive'

@themeable()
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
class Accordion extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.initPointer()
    this.processHtml()

    this.ANIMATE = new Animate(this)
    this.RESPONSIVE = new Responsive(this)

    this.bind()
    this.open(this.current, false)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initPointer() {
    this.$panes = children(this.element)
    this.$headers = this.$panes.map(find(`.${this.classes.PANEHEADER}`))
    this.$contents = this.$panes.map(find(`.${this.classes.PANECONTENT}`))
    this.$contentInners = this.$contents.map(
      find(`.${this.classes.PANECONTENTINNER}`)
    )

    this.size = this.$panes.length
    this.isResponsive =
      this.options.breakWidth === null
        ? false
        : Pj.windowWidth <= this.options.breakWidth

    this.resetData()
  }

  resetData() {
    const $activeItem = this.$panes
      .map(find(`.${this.classes.ACTIVE}`))
      .filter(Boolean)
    if ($activeItem.length > 0) {
      this.current = $activeItem.map((_, index) => index)
    } else if (this.options.initialIndex) {
      this.current = this.parseIndex(this.options.initialIndex)
    } else {
      this.current = [0]
    }

    this.prev = this.current
  }

  processHtml() {
    addClass(this.classes.NAMESPACE, this.element)

    if (this.options.horizontal) {
      addClass(this.classes.HORIZONTAL, this.element)
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }
    this.$panes.map(addClass(this.classes.PANE))
    this.$headers.map(addClass(this.classes.PANEHEADER))
    this.$contents.map(addClass(this.classes.PANECONTENT))
    this.$contentInners.map(addClass(this.classes.PANECONTENTINNER))
  }

  parseIndex(index) {
    let arr = []

    switch (typeof index) {
      case 'string':
        if (index === 'all') {
          for (let i = 0; i < this.size; i++) {
            arr.push(i)
          }
        }
        break
      case 'number':
        arr.push(index)
        break
      case 'object':
        if (Array.isArray(index)) {
          arr = index
        }
        break
      case 'undefined':
        arr = [0]
        break
      default:
        break
    }

    if (!this.options.multiple) {
      arr = [arr[0]]
    }

    return arr
  }

  bind() {
    this.$panes.map((pane, index) =>
      bindEvent(
        {
          type: this.eventName('click'),
          identity: `.${this.classes.PANEHEADER}`,
          handler: () => {
            if (this.is('disabled')) {
              return false
            }
            this.toggle(index)
            return false
          }
        },
        pane
      )
    )
  }

  toggle(index) {
    const pos = this.current.includes(index)
    this.prev = this.current

    if (!this.options.multiple) {
      this.close(this.prev)
    }

    if (!pos) {
      if (
        !this.options.multiple ||
        this.is('built') ||
        this.options.horizontal
      ) {
        this.current = []
      }

      this.current.push(index)
      this.open(index)
    } else {
      this.current.splice(this.current.indexOf(index), 1)
      this.close(index)
    }
  }

  open(index, trigger = true) {
    if (index === null) {
      return
    }

    const arr = Array.isArray(index) ? index : [index]
    const target = this.is('built') ? this.RESPONSIVE : this.ANIMATE
    arr.map(index => {
      if (!this.is('built')) {
        addClass(this.classes.ACTIVE, this.$panes[index])
      }
      return target.open(index, trigger)
    })

    if (this.is('initialized')) {
      this.trigger(EVENTS.OPEN, index)
    }
  }

  close(index, trigger = true) {
    if (index === null) {
      return
    }

    const arr = Array.isArray(index) ? index : [index]
    const target = this.is('built') ? this.RESPONSIVE : this.ANIMATE
    arr.forEach(index => {
      target.close(index, trigger)

      if (!this.is('built')) {
        removeClass(this.classes.ACTIVE, this.$panes[index])
      }
    })

    if (this.is('initialized')) {
      this.trigger(EVENTS.CLOSE, index)
    }
  }

  resize() {
    this.ANIMATE.resetWidth(true)
    this.RESPONSIVE.resize()
    this.trigger(EVENTS.RESIZE)
  }
}

export default Accordion
