import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import { getStyle } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import { query, find, append, parseHTML } from '@pluginjs/dom'
import template from '@pluginjs/template'
import Hammer from 'hammerjs'
import anime from 'animejs'
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
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    this.position = this.options.initial || 0.5
    this.vertical = this.options.direction === 'vertical'

    this.setupStates()
    this.initialize()
  }

  initialize() {
    let classes = this.classes.CONTAINER

    classes += ` ${this.getClass(
      this.classes.DIRECTION,
      'direction',
      this.options.direction
    )}`

    if (this.options.theme) {
      classes += ` ${this.getThemeClass()}`
    }
    if (!this.options.showLabel) {
      classes += ` ${this.classes.HIDE}`
    }

    addClass(classes, this.element)

    this.parseImage()
    this.createHandle()
    this.createLabels()

    setTimeout(() => {
      this.initPos(this.options.initial)

      this.adjust(this.distance, this.options.duration)
    }, 0)

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initPos(percent) {
    this.clientReact = this.element.getBoundingClientRect()
    this.width = this.clientReact.width
    this.height = this.clientReact.height
    this.size = this.vertical ? this.height : this.width
    this.distance = this.toDistance(percent)
  }

  toDistance(percent) {
    const offset = this.size * percent

    return offset - this.size / 2
  }

  parseImage() {
    this.$before = compose(
      addClass(this.classes.BEFORE),
      find('img:first-child')
    )(this.element)
    this.$after = compose(
      addClass(this.classes.AFTER),
      find('img:last-child')
    )(this.element)
  }

  createHandle() {
    this.$handle = query(`.${this.classes.HANDLE}`, this.element)

    if (this.$handle) {
      return
    }

    this.$handle = parseHTML(
      template.render(this.options.templates.handle.call(this), {
        classes: this.classes,
        arrows: {
          before: this.options.arrows[this.vertical ? 'up' : 'left'],
          after: this.options.arrows[this.vertical ? 'down' : 'right']
        }
      })
    )
    append(this.$handle, this.element)
  }

  createLabels() {
    if (!this.options.labels) {
      return
    }

    const themes = this.getThemeClass(
      this.options.labelTheme,
      this.classes.LABELTHEME
    )

    this.$labels = query(`.${this.classes.LABELS}`, this.element)

    if (!this.$labels) {
      this.$labels = parseHTML(
        template.render(this.options.templates.labels.call(this), {
          classes: this.classes,
          labels: this.options.labels,
          theme: themes
        })
      )
      append(this.$labels, this.element)
    }

    addClass(themes, this.$labels)

    this.$labelBefore = query(`.${this.classes.LABELBEFORE}`, this.$labels)
    this.$labelAfter = query(`.${this.classes.LABELAFTER}`, this.$labels)
  }

  adjust(distance, duration = 0) {
    if (this.vertical) {
      if (Math.abs(distance) > this.height / 2) {
        return
      }

      anime({
        targets: this.$before,
        clip: `rect(0,${this.width}px,${this.height / 2 + distance}px,0)`,
        duration,
        easing: this.options.easing
      })

      anime({
        targets: this.$handle,
        translateY: `${distance}px`,
        duration,
        easing: this.options.easing
      })
      this.handleLabel(distance)
    } else {
      if (Math.abs(distance) > this.width / 2) {
        return
      }

      anime({
        targets: this.$before,
        clip: `rect(0,${this.width / 2 + distance}px,${this.height}px,0)`,
        duration,
        easing: this.options.easing
      })

      anime({
        targets: this.$handle,
        translateX: `${distance}px`,
        duration,
        easing: this.options.easing
      })
      this.handleLabel(distance)
    }
  }

  bind() {
    let matrix = [0, 0, 0, 0, 0, 0]
    let [transform, regex, deltaX, deltaY] = [0, 0, 0, 0]

    if (this.options.drag) {
      this.handle = new Hammer(this.$handle, {
        touchAction: 'none'
      })

      this.handle.on('panleft panright panup pandown panstart panend', e => {
        switch (e.type) {
          case 'panstart':
            transform = getStyle('transform', this.$handle)
            regex = '\\((.+?)\\)'

            if (transform && transform !== 'none') {
              matrix = transform.match(regex)[1].split(',')
            }
            addClass(this.classes.DRAGGING, this.element)

            this.enter('dragging')
            this.trigger(EVENTS.DRAG)
            break
          case 'panleft':
          case 'panright':
            if (this.vertical) {
              return
            }

            deltaX = Number(matrix[4]) + e.deltaX

            this.adjust(deltaX)
            this.position = (deltaX + this.size / 2) / this.size
            break
          case 'panup':
          case 'pandown':
            if (!this.vertical) {
              return
            }

            deltaY = Number(matrix[5]) + e.deltaY

            this.adjust(deltaY)
            this.position = (deltaY + this.size / 2) / this.size
            break
          case 'panend':
            removeClass(this.classes.DRAGGING, this.element)

            this.leave('dragging')
            this.trigger(EVENTS.DRAGGED)
            break
          default:
            break
        }
      })
    }

    if (this.options.clickMove) {
      this.container = new Hammer(this.element)

      this.container.on('tap', e => {
        const { target } = e

        if (this.$handle === target || this.$handle.contains(target)) {
          return
        }

        this.clientReact = this.element.getBoundingClientRect()

        const { x, y } = e.center
        const distance = this.vertical
          ? y - this.clientReact.top - this.height / 2
          : x - this.clientReact.left - this.width / 2

        this.adjust(distance, this.options.duration)
        this.position = (distance + this.size / 2) / this.size
      })
    }
  }

  handleLabel(distance) {
    if (!this.options.labels) {
      return
    }

    if (distance < 100 - this.size / 2) {
      addClass(this.classes.LABELHIDE, this.$labelBefore)
      this.enter('labelBeforeHide')
    } else if (distance > this.size / 2 - 100) {
      addClass(this.classes.LABELHIDE, this.$labelAfter)
      this.enter('labelAfterHide')
    } else {
      removeClass(this.classes.LABELHIDE, this.$labelBefore)
      removeClass(this.classes.LABELHIDE, this.$labelAfter)
      this.leave('labelAfterHide')
      this.leave('labelBeforeHide')
    }
  }

  unbind() {
    this.handle.off('panleft panright panup pandown panstart panend')
    this.container.off('tap')
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
    this.initPos(this.position)
    this.adjust(this.distance)
  }
}

export default BeforeAfter
