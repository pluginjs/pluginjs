import Component from '@pluginjs/component'
import { pointer, pointerEvent, touch } from '@pluginjs/feature'
import { getTime, compose } from '@pluginjs/utils'
import { getWidth, getHeight, setStyle } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import { query, find, append, parseHTML } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import easing from '@pluginjs/easing'
import template from '@pluginjs/template'
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
  methods: METHODS
})
class BeforeAfter extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    // Current state information for the drag operation.
    this._drag = {
      time: null,
      pointer: null
    }

    this._position = null // position cache for the drag operation.
    this.position = 0
    this.width = getWidth(this.element)
    this.height = getHeight(this.element)
    this.easing = easing.get(this.options.easing) || easing.get('ease')

    this.initStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.CONTAINER, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    addClass(
      this.getClass(
        this.classes.DIRECTION,
        'direction',
        this.options.direction
      ),
      this.element
    )

    this.$before = compose(
      addClass(this.classes.BEFORE),
      find('img:first-child')
    )(this.element)
    this.$after = compose(
      addClass(this.classes.AFTER),
      find('img:last-child')
    )(this.element)

    this.createHandle()
    if (this.options.labels) {
      this.createLabels()
    }

    this.bind()
    this.adjust(this.position)
    this.animateTo(this.options.initial, false)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  createHandle() {
    this.$handle = query(`.${this.classes.HANDLE}`, this.element)
    if (!this.$handle) {
      let arrows

      if (this.options.direction === 'vertical') {
        arrows = {
          before: this.options.arrows.up,
          after: this.options.arrows.down
        }
      } else {
        arrows = {
          before: this.options.arrows.left,
          after: this.options.arrows.right
        }
      }
      this.$handle = parseHTML(
        template.render(this.options.templates.handle.call(this), {
          classes: this.classes,
          arrows
        })
      )
      append(this.$handle, this.element)
    }
  }

  createLabels() {
    this.$labels = query(`.${this.classes.LABELS}`, this.element)
    if (!this.$labels) {
      this.$labels = parseHTML(
        template.render(this.options.templates.labels.call(this), {
          classes: this.classes,
          labels: this.options.labels,
          theme: this.getThemeClass(
            this.options.labelTheme,
            this.classes.LABELTHEME
          )
        })
      )
      append(this.$labels, this.element)
    }

    this.$labelBefore = query(`.${this.classes.LABELBEFORE}`, this.$labels)
    this.$labelAfter = query(`.${this.classes.LABELAFTER}`, this.$labels)
  }

  adjust(position) {
    this.adjustClip(position)
    this.adjustHandle(position)
  }

  adjustClip(position) {
    const width = this.width
    const height = this.height
    const clipWidth = position * width
    const clipHeight = position * height

    if (this.options.direction === 'vertical') {
      setStyle('clip', `rect(0,${width}px,${clipHeight}px,0)`, this.$before)
    } else {
      setStyle('clip', `rect(0,${clipWidth}px,${height}px,0)`, this.$before)
    }
  }

  adjustHandle(position) {
    if (this.options.direction === 'vertical') {
      setStyle('top', `${position * this.height}px`, this.$handle)
    } else {
      setStyle('left', `${position * this.width}px`, this.$handle)
    }
  }

  bind() {
    if (this.options.mouseDrag) {
      bindEvent(
        this.eventName('mousedown'),
        this.onDragStart.bind(this),
        this.$handle
      )
      bindEvent(
        this.eventName('dragstart selectstart'),
        () => false,
        this.$handle
      )
    }

    if (this.options.touchDrag && touch) {
      bindEvent(
        this.eventName('touchstart'),
        this.onDragStart.bind(this),
        this.$handle
      )
      bindEvent(
        this.eventName('touchcancel'),
        this.onDragEnd.bind(this),
        this.$handle
      )
    }

    if (this.options.pointerDrag && pointer) {
      bindEvent(
        this.eventName(pointerEvent('pointerdown')),
        this.onDragStart.bind(this),
        this.$handle
      )
      bindEvent(
        this.eventName(pointerEvent('pointercancel')),
        this.onDragEnd.bind(this),
        this.$handle
      )
    }

    if (this.options.clickMove) {
      bindEvent(
        this.eventName('mousedown'),
        this.onClick.bind(this),
        this.element
      )
    }

    bindEvent(
      this.eventName('mouseenter'),
      () => {
        addClass(this.classes.HOVERING, this.element)
        this.enter('hovering')
        this.trigger(EVENTS.HOVER)
      },
      this.element
    )

    bindEvent(
      this.eventName('mouseleave'),
      () => {
        removeClass(this.classes.HOVERING, this.element)

        if (!this.is('hovering')) {
          return
        }
        this.leave('hovering')
        this.trigger(EVENTS.HOVERED)
      },
      this.element
    )

    if (this.options.labels) {
      bindEvent(
        'beforeAfter:change',
        (e, instance, position) => {
          if (position < 0.25) {
            if (!instance.is('labelBeforeHide')) {
              addClass(instance.classes.LABELHIDE, instance.$labelBefore)
              instance.enter('labelBeforeHide')
            }
          } else if (instance.is('labelBeforeHide')) {
            removeClass(instance.classes.LABELHIDE, instance.$labelBefore)
            instance.leave('labelBeforeHide')
          }

          if (position > 0.75) {
            if (!instance.is('labelAfterHide')) {
              addClass(instance.classes.LABELHIDE, instance.$labelAfter)
              instance.enter('labelAfterHide')
            }
          } else if (instance.is('labelAfterHide')) {
            removeClass(instance.classes.LABELHIDE, instance.$labelAfter)
            instance.leave('labelAfterHide')
          }
        },
        this.element
      )
    }
  }

  onClick(event) {
    if (event.which === 3) {
      return
    }

    if (this.is('dragging')) {
      return
    }

    if (this.$handle === event.target || this.$handle.contains(event.target)) {
      return
    }

    this._drag.time = new Date().getTime()
    this._drag.pointer = this.pointer(event)

    const { offsetLeft, offsetTop } = this.element
    const distance = this.distance(
      {
        x: offsetLeft,
        y: offsetTop
      },
      this._drag.pointer
    )

    this.moveTo(this.getProportionFromDistance(distance), true)
  }

  getProportionFromDistance(distance) {
    if (this.options.direction === 'vertical') {
      return distance / this.height
    }
    return distance / this.width
  }

  // Handles `touchstart` and `mousedown` events.
  onDragStart(event) {
    if (event.which === 3) {
      return
    }

    addClass(this.classes.DRAGGING, this.element)

    this._drag.time = new Date().getTime()
    this._drag.pointer = this.pointer(event)

    const callback = () => {
      this.enter('dragging')
      this.trigger(EVENTS.DRAG)
    }

    if (this.options.mouseDrag) {
      compose(
        bindEvent(this.eventName('mousemove'), () => {
          bindEvent(
            this.eventName('mousemove'),
            this.onDragMove.bind(this),
            window.document
          )
          callback()
        }),
        bindEvent(this.eventName('mouseup'), this.onDragEnd.bind(this))
      )(window.document)
    }

    if (this.options.touchDrag && touch) {
      compose(
        bindEvent(this.eventName('touchmove'), () => {
          bindEvent(
            this.eventName('touchmove'),
            this.onDragMove.bind(this),
            window.document
          )
          callback()
        }),
        bindEvent(this.eventName('touchend'), this.onDragEnd.bind(this))
      )(window.document)
    }

    if (this.options.pointerDrag && pointer) {
      compose(
        bindEvent(this.eventName(pointerEvent('pointermove')), () => {
          bindEvent(
            this.eventName(pointerEvent('pointermove')),
            this.onDragMove.bind(this),
            window.document
          )
          callback()
        }),
        bindEvent(
          this.eventName(pointerEvent('pointerup')),
          this.onDragEnd.bind(this)
        )
      )(window.document)
    }

    bindEvent(
      this.eventName('blur'),
      this.onDragEnd.bind(this),
      window.document
    )
  }

  // Handles the `touchmove` and `mousemove` events.
  onDragMove(event) {
    const distance = this.distance(this._drag.pointer, this.pointer(event))

    if (!this.is('dragging')) {
      return
    }

    event.preventDefault()

    this.moveBy(this.getProportionFromDistance(distance), true, true)
  }

  // Handles the `touchend` and `mouseup` events.
  onDragEnd() {
    compose(
      ...'mousemove mouseup touchmove touchend pointermove pointerup MSPointerMove MSPointerUp blur'
        .split(' ')
        .map(eventName => removeEvent(this.eventName(eventName)))
    )(window.document)

    this.position = this._position
    removeClass(this.classes.DRAGGING, this.element)

    if (!this.is('dragging')) {
      return
    }

    this.leave('dragging')
    this.trigger(EVENTS.DRAGGED)
  }

  // Gets unified pointer coordinates from event.
  // @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
  pointer(event) {
    const result = {
      x: null,
      y: null
    }

    event = event.originalEvent || event || window.event

    if (event.touches && event.touches.length) {
      event = event.touches[0]
    } else {
      event =
        event.changedTouches && event.changedTouches.length
          ? event.changedTouches[0]
          : event
    }
    if (event.pageX) {
      result.x = event.pageX
      result.y = event.pageY
    } else {
      result.x = event.clientX
      result.y = event.clientY
    }

    return result
  }

  moveBy(value, trigger = true, sync = false) {
    value = parseFloat(value)

    this.moveTo(this.position + value, trigger, sync)
  }

  moveTo(position, trigger = true, sync = false) {
    if (this.is('disabled')) {
      return
    }
    position = parseFloat(position)

    if (position < 0) {
      position = 0
    } else if (position > 1) {
      position = 1
    }

    if (!this.is('dragging') && sync !== true) {
      this.animateTo(position, trigger)
    } else {
      this.adjust(position)

      if (trigger) {
        this.trigger(EVENTS.CHANGE, position)
      }
      if (sync) {
        this._position = position
      } else {
        this.position = position
      }
    }
  }

  animateTo(position, trigger) {
    this.enter('animating')

    const startTime = getTime()
    const start = this.position
    const end = position

    const run = time => {
      let percent = (time - startTime) / this.options.duration

      if (percent > 1) {
        percent = 1
      }

      percent = this.easing(percent)
      const current = parseFloat(start + percent * (end - start), 10)
      this.adjust(current)

      if (trigger) {
        this.trigger(EVENTS.CHANGE, current)
      }
      this.position = current

      if (percent === 1) {
        window.cancelAnimationFrame(this._frameId)
        this.position = position
        this._frameId = null

        this.leave('animating')
      } else {
        this._frameId = window.requestAnimationFrame(run)
      }
    }

    this._frameId = window.requestAnimationFrame(run)
  }

  // Gets the distance of two pointer.
  distance(first, second) {
    if (this.options.direction === 'vertical') {
      return second.y - first.y
    }
    return second.x - first.x
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    removeEvent(this.eventName(), this.$handle)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  resize() {
    if (!this.is('disabled')) {
      this.width = getWidth(this.element)
      this.height = getHeight(this.element)

      this.adjust(this.position)
    }
  }
}

export default BeforeAfter
