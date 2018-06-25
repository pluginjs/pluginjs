/* Credit to https://github.com/desandro/draggabilly */
import Component from '@pluginjs/component'
import Hammer from 'hammerjs'
import { deepMerge } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import getSize from './getSize'
import { bindEvent } from '@pluginjs/events'
import {
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
class Draggable extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.element =
      typeof element === 'string' ? document.querySelector(element) : element

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)

    addClass(this.classes.NAMESPACE, this.element)

    this.initStates()
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
    this.type = ''
    this.getPosition()

    this.dragPoint = { x: 0, y: 0 }

    this.startPosition = Object.assign({}, this.position)

    const style = getComputedStyle(this.element)
    if (!positionType[style.position]) {
      this.element.style.position = 'relative'
    }

    this.enable()
  }

  getPosition() {
    const style = getComputedStyle(this.element)
    const x = this.getPositionCoord(style.left, 'width')
    const y = this.getPositionCoord(style.top, 'height')
    // clean up 'auto' or other non-integer values
    this.position.x = isNaN(x) ? 0 : x
    this.position.y = isNaN(y) ? 0 : y

    this.addTransformPosition(style)
  }

  getPositionCoord(side, measure) {
    if (side.indexOf('%') !== -1) {
      const parentSize = getSize(this.element.parentNode)
      return !parentSize ? 0 : parseFloat(side) / 100 * parentSize[measure]
    }

    return parseInt(side, 10)
  }

  addTransformPosition(style) {
    const transform = style.transform
    if (transform.indexOf('martix') !== 0) {
      return
    }

    const matrixValues = transform.split(',')
    const xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4
    const translateX = parseInt(matrixValues[xIndex], 10)
    const translateY = parseInt(matrixValues[xIndex + 1], 10)
    this.position.x += translateX
    this.position.Y += translateY
  }

  bind() {
    bindEvent(
      {
        type: this.eventName('mousedown'),
        handler: e => {
          this.type = 'pointerDown'
          this.setPointer(e.pageX, e.pageY)
        }
      },
      this.element
    )
    this.bindHandles(true)
  }

  bindHandles(isAdd) {
    if (isAdd) {
      this.$drag = new Hammer(this.element, { touchAction: 'auto' })
      this.on('dragStart')
      this.on('dragMove')
      this.on('dragEnd')
    } else {
      this.$drag
        .off('panstart')
        .off('panmove')
        .off('panend')
      return
    }
  }

  on(type, event) {
    switch (type) {
      case 'dragStart':
        this.$drag.on('panstart', e => {
          this.isDragging = true
          this.setPointer(e.center.x, e.center.y)
          this.dragStart()
          this.triggerEvent(event)
        })
        break
      case 'dragMove':
        this.$drag.on('panmove', e => {
          if (!this.isDragging) {
            return
          }
          this.setPointer(e.center.x, e.center.y)
          this.dragMove(e.deltaX, e.deltaY)
          this.triggerEvent(event)
        })
        break
      case 'dragEnd':
        this.$drag.on('panend', e => {
          this.isDragging = false
          this.setPointer(e.center.x, e.center.y)
          this.dragEnd()
          this.triggerEvent(event)
        })
        break
      default:
        this.$drag.on(type, () => {
          this.triggerEvent(event)
        })
    }
  }

  off(type, event) {
    this.$drag.off(type, () => {
      this.triggerEvent(event)
    })
  }

  dragStart() {
    if (!this.isEnabled) {
      return
    }
    this.type = 'dragStart'
    this.getPosition()
    this.measureContainment()
    // position  drag began
    this.startPosition.x = this.position.x
    this.startPosition.y = this.position.y
    // reset left/top style
    this.setLeftTop()

    this.dragPoint.x = 0
    this.dragPoint.y = 0

    addClass('is-dragging', this.element)
    this.trigger(EVENTS.DRAGSTART)
    this.animate()
  }

  getContainer() {
    const containment = this.options.containment
    if (!containment) {
      return null
    }
    const isElement = containment instanceof HTMLElement
    // use as element
    if (isElement) {
      return containment
    }
    // querySelector if string
    if (typeof containment === 'string') {
      return document.querySelector(containment)
    }

    return this.element.parentNode
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

  dragMove(deltaX, deltaY) {
    if (!this.isEnabled) {
      return
    }
    this.type = 'dragMove'
    let dragX = deltaX
    let dragY = deltaY

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
    this.trigger(EVENTS.DRAGMOVE)
  }

  applyGrid(value, grid, method) {
    method = method || 'round'
    return grid ? Math[method](value / grid) * grid : value
  }

  containDrag(axis, drag, grid) {
    if (!this.options.containment) {
      return drag
    }

    const measure = axis === 'x' ? 'width' : 'height'
    const rel = this.relativeStartPosition[axis]
    const min = this.applyGrid(-rel, grid, 'ceil')
    let max = this.containerSize[measure]
    max = this.applyGrid(max, grid, 'floor')
    return Math.max(min, Math.min(max, drag))
  }

  dragEnd() {
    if (!this.isEnabled) {
      return
    }
    this.type = 'dragEnd'
    this.element.style.transform = ''
    this.setLeftTop()
    removeClass('is-dragging', this.element)
    this.trigger(EVENTS.DRAGEND)
  }

  setLeftTop() {
    this.element.style.left = `${this.position.x}px`
    this.element.style.top = `${this.position.y}px`
  }

  animate() {
    if (!this.isDragging) {
      return
    }
    this.positionDrag()

    const that = this
    requestAnimationFrame(() => {
      that.animate()
    })
  }

  positionDrag() {
    this.element.style.transform = `translate3d(${this.dragPoint.x}px,${
      this.dragPoint.y
    }px,0)`
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

  triggerEvent(event) {
    if (typeof event === 'function') {
      event()
    }
  }

  unbind() {
    this.bindHandles(false)
  }

  enable() {
    this.isEnabled = true
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    this.isEnabled = false
    if (this.isDragging) {
      this.dragEnd(null, null)
    }
    this.unbind()
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    this.disable()

    this.element.style.transform = ''
    this.element.style.left = ''
    this.element.style.top = ''
    this.element.style.position = ''

    this.trigger(EVENTS.DESTROY)
  }
}

export default Draggable
