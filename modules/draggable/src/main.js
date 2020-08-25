/* Credit to https://github.com/desandro/draggabilly */
import Component from '@pluginjs/component'
import Hammer from 'hammerjs'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import getSize from './getSize'
import { bindEvent, removeEvent } from '@pluginjs/events'
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
class Draggable extends Component {
  constructor(element, options = {}) {
    super(element)

    this.element =
      typeof element === 'string' ? document.querySelector(element) : element

    this.setupOptions(options)
    this.setupClasses()

    addClass(this.classes.NAMESPACE, this.element)

    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.axis) {
      if (this.options.axis === 'x') {
        addClass(this.classes.HORIZONTAL, this.element)
      } else if (this.options.axis === 'y') {
        addClass(this.classes.VERTICAL, this.element)
      }
    }

    this.build()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  build() {
    const positionType = {
      relative: true,
      absolute: true,
      fixed: true
    }

    this.position = {}
    this.pointer = {}
    this._getPosition()

    this.dragPoint = { x: 0, y: 0 }

    this.startPosition = Object.assign({}, this.position)

    const style = getComputedStyle(this.element)
    if (!positionType[style.position]) {
      this.element.style.position = 'relative'
    }

    this.enable()
  }

  _getPosition() {
    const style = getComputedStyle(this.element)
    const x = this.getPositionCoord(style.left, 'width')
    const y = this.getPositionCoord(style.top, 'height')

    this.position.x = isNaN(x) ? 0 : x
    this.position.y = isNaN(y) ? 0 : y
    this.addTransformPosition(style)
  }

  getPositionCoord(side, measure) {
    if (side.indexOf('%') !== -1) {
      const parentSize = getSize(this.element.parentNode)
      return !parentSize ? 0 : (parseFloat(side) / 100) * parentSize[measure]
    }

    return parseInt(side, 10)
  }

  addTransformPosition(style) {
    const transform = style.transform
    if (transform.indexOf('matrix') !== 0) {
      return
    }
    const matrixValues = transform.split(',')
    const xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4
    const translateX = parseInt(matrixValues[xIndex], 10)
    const translateY = parseInt(matrixValues[xIndex + 1], 10)
    this.position.x += translateX
    this.position.y += translateY
  }

  bind() {
    bindEvent(
      this.eventName('mousedown'),
      e => {
        this.setPointer(e.pageX, e.pageY)
        this.trigger(EVENTS.POINTER)
      },
      this.element
    )
    this.bindHandles(true)
  }

  bindHandles(isAdd) {
    if (isAdd) {
      this.$drag = new Hammer(this.element)
      this.$drag.get('pan').set({
        threshold: 0,
        direction:
          this.options.axis === 'y'
            ? Hammer.DIRECTION_VERTICAL
            : Hammer.DIRECTION_HORIZONTAL
      })
      this.$drag.on('panstart panmove panend', e => {
        switch (e.type) {
          case 'panstart':
            this.dragStart(e)
            break
          case 'panmove':
            this.dragMove(e)
            break
          case 'panend':
            this.dragEnd(e)
            break
          default:
            return
        }
      })
    } else {
      this.$drag.off('panstart panmove panend')
    }
  }

  dragStart(e) {
    if (!this.isEnabled) {
      return
    }
    this.isDragging = true
    this.setPointer(e.center.x, e.center.y)
    this.getPosition()
    this.measureContainment()

    this.startPosition.x = this.position.x
    this.startPosition.y = this.position.y

    this.setLeftTop()

    this.dragPoint.x = 0
    this.dragPoint.y = 0
    addClass('is-dragging', this.element)

    this.trigger(EVENTS.DRAGSTART)
  }

  measureContainment() {
    const container = this.getContainer()
    if (!container) {
      return
    }
    const elementSize = getSize(this.element)
    const containerSize = getSize(container)
    const elementRect = this.element.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const borderSizeX =
      containerSize.borderLeftWidth + containerSize.borderRightWidth
    const borderSizeY =
      containerSize.borderTopWidth + containerSize.borderBottomWidth

    const position = {
      x:
        elementRect.left - (containerRect.left + containerSize.borderLeftWidth),
      y: elementRect.top - (containerRect.top + containerSize.borderTopWidth)
    }

    this.relativeStartPosition = {
      x:
        elementRect.left - (containerRect.left + containerSize.borderLeftWidth),
      y: elementRect.top - (containerRect.top + containerSize.borderTopWidth)
    }

    this.containerSize = {
      width: containerSize.width - borderSizeX - position.x - elementSize.width,
      height:
        containerSize.height - borderSizeY - position.y - elementSize.height
    }
  }

  getContainer() {
    const container = this.options.container
    if (!container) {
      return null
    }
    const isElement = container instanceof HTMLElement

    if (isElement) {
      return container
    }

    if (typeof container === 'string') {
      return document.querySelector(container)
    }

    return this.element.parentNode
  }

  dragMove(e) {
    if (!this.isEnabled) {
      return
    }
    this.setPointer(e.center.x, e.center.y)

    let dragX = e.deltaX
    let dragY = e.deltaY

    const grid = this.options.grid
    const gridX = grid && grid[0]
    const gridY = grid && grid[1]

    dragX = this.applyGrid(dragX, gridX)
    dragY = this.applyGrid(dragY, gridY)

    dragX = this.containDrag('x', dragX, gridX)
    dragY = this.containDrag('y', dragY, gridY)

    dragX = this.options.axis === 'y' ? 0 : dragX
    dragY = this.options.axis === 'x' ? 0 : dragY

    this.position.x = this.startPosition.x + dragX
    this.position.y = this.startPosition.y + dragY

    this.dragPoint.x = dragX
    this.dragPoint.y = dragY

    setStyle(
      'transform',
      `translate3d(${this.dragPoint.x}px, ${this.dragPoint.y}px, 0)`,
      this.element
    )

    this.trigger(EVENTS.DRAGMOVE)
  }

  applyGrid(value, grid, method) {
    method = method || 'round'
    return grid ? Math[method](value / grid) * grid : value
  }

  containDrag(axis, drag, grid) {
    if (!this.options.container) {
      return drag
    }

    const measure = axis === 'x' ? 'width' : 'height'
    const rel = this.relativeStartPosition[axis]
    const min = this.applyGrid(-rel, grid, 'ceil')
    let max = this.containerSize[measure]
    max = this.applyGrid(max, grid, 'floor')
    return Math.max(min, Math.min(max, drag))
  }

  dragEnd(e) {
    if (!this.isEnabled) {
      return
    }
    this.isDragging = false
    this.setPointer(e.center.x, e.center.y)
    this.element.style.transform = ''
    this.setLeftTop()
    removeClass('is-dragging', this.element)
    this.trigger(EVENTS.DRAGEND)
  }

  setLeftTop() {
    this.element.style.left = `${this.position.x}px`
    this.element.style.top = `${this.position.y}px`
  }

  setPosition(x, y) {
    this.position.x = x
    this.position.y = y
    this.setLeftTop()
  }

  setPointer(x, y) {
    this.pointer.x = x
    this.pointer.y = y
  }

  getPosition() {
    return this.position
  }

  unbind() {
    this.bindHandles(false)
    removeEvent(this.eventName(), this.element)
  }

  enable() {
    this.isEnabled = true
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
      this.isEnabled = false
      if (this.isDragging) {
        this.dragEnd(null, null)
      }
      this.unbind()
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.disable()
      this.element.style.transform = ''
      this.element.style.left = ''
      this.element.style.top = ''
      this.element.style.position = ''
      this.leave('initialized')
    }
    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Draggable
