import Component from '@pluginjs/component'
import { isString, isDomNode } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { offset as getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { queryAll, query, getData } from '@pluginjs/dom'
import Pj from '@pluginjs/factory'
import Scroll from '@pluginjs/scroll'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class ScrollTo extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    this.options.mobile.duration = parseInt(this.options.mobile.duration, 10)
    this.options.duration = parseInt(this.options.duration, 10)

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.roll()

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)

    Pj.emitter.on(this.eventNameWithId('scroll'), () => {
      this.roll()
    })
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      'li',
      event => {
        if (this.is('disable')) {
          return
        }

        const target = event.target
        this.active(target)

        const href = target.getAttribute(this.options.href)

        if (href) {
          this.jump(href)
        }
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    Pj.emitter.off(this.eventNameWithId('scroll'))
  }

  isMobile() {
    return (
      window.document.documentElement.clientWidth < this.options.mobile.width
    )
  }

  active($index) {
    if (typeof $index === 'undefined') {
      return
    }

    Array.from(this.element.children).map(c =>
      removeClass(this.classes.ACTIVE, c)
    )
    addClass(this.classes.ACTIVE, $index)
  }

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  findAnchor(href) {
    return Array.from(this.element.children).filter(
      c => getData('scrollto', c) === href
    )[0]
  }

  roll() {
    queryAll('[id]', window.document).map(item => { /* eslint-disable-line */
      if (
        this.scrollTop() > getOffset(item).top - this.options.offsetTop &&
        this.scrollTop() < getOffset(item).top + item.clientHeight
      ) {
        const anchorHref = item.getAttribute('id')
        const anchor = this.findAnchor(anchorHref)
        this.anchor = item
        this.active(anchor)
      }
    })
  }

  jump(href) {
    let $href
    if (isString(href)) {
      if (href.indexOf('#') !== 0) {
        href = `#${href}`
      }
      $href = query(href)
    } else if (isDomNode(href)) {
      $href = href
    }

    let easing
    let duration

    if (this.isMobile()) {
      duration = this.options.mobile.duration
      easing = this.options.mobile.easing
    } else {
      duration = this.options.duration
      easing = this.options.easing
    }

    if ($href) {
      addClass(this.classes.ANIMATING, window.document)

      const top = getOffset($href).top

      this.trigger(EVENTS.JUMP, top)

      Scroll.to({
        y: top,
        duration,
        easing,
        complete: () => {
          removeClass(this.classes.ANIMATING, window.document)
          this.trigger(EVENTS.READY)
        }
      })
    }
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

export default ScrollTo
