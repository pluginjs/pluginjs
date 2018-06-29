import Component from '@pluginjs/component'
import Hammer from 'hammerjs'
import { deepMerge } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
// import { bindEvent, removeEvent } from '@pluginjs/events'
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
class Swipeable extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.element =
      typeof element === 'string' ? document.querySelector(element) : element
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)

    addClass(this.classes.NAMESPACE, this.element)

    if (this.options.axis) {
      if (this.options.axis === 'x') {
        addClass(this.classes.HORIZONTAL, this.element)
      } else if (this.options.axis === 'y') {
        addClass(this.classes.VERTICAL, this.element)
      }
    }

    this.frictionFactor =
      this.options.frictionFactor < 1 ? 1 : this.options.frictionFactor
    this.power = this.options.power

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.position = { x: 0, y: 0 }
    this.pointer = {}
    this.type = ''
    // this.dragPoint = { x: 0, y: 0 }

    this.getLocation(this.element)

    setStyle(
      {
        transform: `
          translate3d(${this.position.x}px, ${this.position.y}px, 0)
        `
      },
      this.element
    )

    this.startPosition = { x: 0, y: 0 }
    this.isEnabled = true

    this.buildDrag()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const $target = this.element
    this.$drag
      .on('panstart', () => {
        if (!this.isEnabled) {
          return
        }
        this.setType('dragStart')
        setStyle({ transition: '', 'transition-timing-function': '' }, $target)
        this.startPosition.x = this.position.x
        this.startPosition.y = this.position.y
        addClass('is-dragging', this.element)
        this.trigger(EVENTS.DRAGSTART)
      })
      .on('panmove', e => {
        if (!this.isEnabled) {
          return
        }
        this.setType('dragMove')
        let dragX = e.deltaX
        let dragY = e.deltaY

        dragX = this.options.axis === 'y' ? 0 : dragX
        dragY = this.options.axis === 'x' ? 0 : dragY

        this.position.x = this.startPosition.x + dragX
        this.position.y = this.startPosition.y + dragY

        setStyle(
          {
            transform: `
              translate3d(${this.position.x}px, ${this.position.y}px, 0)
            `
          },
          $target
        )
      })
      .on('panend', e => {
        if (!this.isEnabled) {
          return
        }
        if (this.options.decay) {
          let decayX = e.velocityX
          let decayY = e.velocityY

          decayX = this.options.axis === 'y' ? 0 : decayX
          decayY = this.options.axis === 'x' ? 0 : decayY

          this.position.x += this.getMoveSize(decayX)
          this.position.y += this.getMoveSize(decayY)

          setStyle(
            {
              transform: `
                translate3d(${this.position.x}px, ${this.position.y}px, 0)
              `,
              transition: `transform ${this.options.timeConstant}ms`,
              'transition-timing-function': 'ease-out'
            },
            $target
          )
        }
        this.setType('dragEnd')
        removeClass('is-dragging', this.element)
        this.trigger(EVENTS.DRAGEND)
      })
  }

  setType(type) {
    this.type = type
  }

  getMoveSize(velocity) {
    let size =
      Math.pow(velocity, 2) / (2 * this.frictionFactor) * (10 * this.power)
    if (velocity < 0) {
      size *= -1
    }

    return size
  }

  getLocation(ele) {
    const transform = getStyle('transform', ele)
    if (transform === 'none') {
      return 0
    }
    const matrixValues = transform.split(',')
    const xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4
    const translateX = parseInt(matrixValues[xIndex], 10)
    const translateY = parseInt(matrixValues[xIndex + 1], 10)
    this.position.x += translateX
    this.position.y += translateY
    return { translateX, translateY }
  }

  // on(type, event) {
  //   switch (type) {
  //     case 'dragStart':
  //       this.$drag.on('panstart', e => {
  //         this.isDragging = true
  //         this.setPointer(e.center.x, e.center.y)
  //         this.dragStart()
  //         this.triggerEvent(event)
  //       })
  //       break
  //     case 'dragMove':
  //       this.$drag.on('panmove', e => {
  //         if (!this.isDragging) {
  //           return
  //         }
  //         this.setPointer(e.center.x, e.center.y)
  //         this.dragMove(e.deltaX, e.deltaY)
  //         this.triggerEvent(event)
  //       })
  //       break
  //     case 'dragEnd':
  //       this.$drag.on('panend', e => {
  //         this.isDragging = false
  //         this.setPointer(e.center.x, e.center.y)
  //         this.dragEnd()
  //         this.triggerEvent(event)
  //       })
  //       break
  //     default:
  //       this.$drag.on(type, () => {
  //         this.triggerEvent(event)
  //       })
  //   }
  // }

  // unbind() {}

  buildDrag() {
    this.$drag = new Hammer(this.element, { touchAction: 'auto' })
  }

  // enable() {}

  // disable() {}

  // destroy() {}
}

export default Swipeable
