import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import is from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { queryAll, query } from '@pluginjs/dom'
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
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

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
  }
)
class ScrollTo extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
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

    Pj.emitter.on('scroll', () => {
      this.roll()
    })
  }

  bind() {
    bindEvent(
      {
        type: this.eventName('click'),
        identity: {
          type: 'tagName',
          value: 'li'
        },
        handler: event => {
          if (this.is('disable')) {
            return
          }

          const target = event.target
          this.active(target)

          const href = target.getAttribute(this.options.href)

          if (href) {
            this.jump(href)
          }
        }
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  isMobile() {
    return Pj.windowWidth < this.options.mobile.width
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
      c => c.dataset.scrollto == href
    )[0]
  }

  roll() {
    queryAll('[id]', Pj.doc).map(item => {
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
    if (is.string(href)) {
      if (href.indexOf('#') !== 0) {
        href = `#${href}`
      }
      $href = query(href)
    } else if (is.domNode(href)) {
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
      addClass(this.classes.ANIMATING, Pj.doc)

      const top = getOffset($href).top

      this.trigger(EVENTS.JUMP, top)

      if (Pj.scroll.to) {
        Pj.scroll.to({
          y: top,
          duration,
          easing,
          complete: () => {
            removeClass(this.classes.ANIMATING, Pj.doc)
            this.trigger(EVENTS.READY)
          }
        })
      } else {
        $('html, body').animate(
          { scrollTop: top },
          {
            duration,
            easing,
            complete: () => {
              removeClass(this.classes.ANIMATING, Pj.doc)
              this.trigger(EVENTS.READY)
            }
          }
        )
      }
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
