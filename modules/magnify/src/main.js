import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import Breakpoints from '@pluginjs/breakpoints'
// import Hammer from 'hammerjs'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import { addClass, removeClass } from '@pluginjs/classes'
import { query, wrap, unwrap, appendTo, append } from '@pluginjs/dom'
import { innerWidth, innerHeight, setStyle, getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { isElement, isPlainObject, isString } from '@pluginjs/is'
import Loader from '@pluginjs/loader'
import ImageLoader from '@pluginjs/image-loader'
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
class Magnify extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.element.tagName !== 'IMG' || this.element.tagName !== 'PICTURE') {
      this.$wrap = this.element
      addClass(this.classes.WRAP, this.$wrap)
      this.$image = query('img, picture', this.$wrap)
    } else {
      this.$image = this.element
      this.$wrap = wrap(`<div class="${this.classes.WRAP}"></div>`, this.$image)
    }

    this.loaded = false
    this.large = this.options.image
    this.zoom = this.options.zoom
    this.width = innerWidth(this.$wrap)
    this.height = innerHeight(this.$wrap)
    this.ratio = this.width / this.height

    addClass(this.classes.IMAGE, this.$image)

    addClass(
      this.getClass(this.classes.MODE, 'mode', this.options.mode),
      this.$wrap
    )

    if (this.options.theme) {
      addClass(this.getThemeClasss(), this.$wrap)
    }

    if (this.options.target) {
      if (isElement(this.options.target)) {
        this.$target = this.options.target
      } else {
        this.$target = query(this.options.target)
      }
      addClass(this.classes.TARGET, this.$target)
    }

    if (this.options.mode === 'inside') {
      this.$zoom = this.$wrap
    } else {
      if (!this.options.target) {
        this.initPlacement()
      }

      this.$zoom = this.$image
    }

    if (this.options.loader) {
      this.LOADER = Loader.of(this.$wrap, this.options.loader)
    }

    this.initDimension()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initPlacement() {
    Breakpoints.init()

    let prevPlacement = null
    const setupPlacement = placement => {
      if (prevPlacement) {
        removeClass(
          this.getClass(
            this.classes.OUTSIDEPLACEMENT,
            'placement',
            prevPlacement
          ),
          this.$wrap
        )
      }
      addClass(
        this.getClass(this.classes.OUTSIDEPLACEMENT, 'placement', placement),
        this.$wrap
      )
      prevPlacement = placement
    }

    this.placements = this.options.placement.split(',').map(placement => {
      const arr = placement.trim().split(' ')
      if (arr.length === 1) {
        return arr[0]
      } else if (arr.length > 1) {
        return {
          placement: arr[0],
          breakpoint: arr[1]
        }
      }
      return placement
    })

    let globalPlacement = null

    if (this.placements.length === 1) {
      setupPlacement(this.placements[0])
    } else {
      this.placements.forEach(item => {
        if (isString(item)) {
          globalPlacement = item
          setupPlacement(item)
        } else {
          if (Breakpoints.is(item.breakpoint)) {
            setupPlacement(item.placement)
          }
          Breakpoints.on(item.breakpoint, {
            enter: () => {
              setupPlacement(item.placement)
            },
            leave: () => {
              if (globalPlacement) {
                setupPlacement(globalPlacement)
              }
            }
          })
        }
      })
    }
  }

  initDimension() {
    const _initDimension = () => {
      this.width = innerWidth(this.$wrap)
      this.height = innerHeight(this.$wrap)
      this.ratio = this.width / this.height
    }
    if (this.$image.complete && this.$image.naturalWidth) {
      _initDimension()
    } else {
      ImageLoader.of(this.$image).on('loaded', () => {
        _initDimension()
      })
    }
  }

  initTargetDimension() {
    if (this.$target) {
      this.targetWidth = innerWidth(this.$target)
      this.targetHeight = innerHeight(this.$target)
    } else {
      this.targetWidth = null
      this.targetHeight = null
    }
  }

  bind() {
    if (this.options.trigger === 'hover') {
      bindEvent(
        this.eventName('mouseenter touchstart'),
        () => {
          this.show()
        },
        this.$zoom
      )
      bindEvent(
        this.eventName('mouseleave touchend'),
        () => {
          this.hide()
        },
        this.$zoom
      )
    } else if (this.options.trigger === 'click') {
      bindEvent(
        this.eventName('click'),
        () => {
          this.show()
        },
        this.$zoom
      )
      bindEvent(
        this.eventName('mouseleave touchend'),
        () => {
          this.hide()
        },
        this.$zoom
      )
    } else if (this.options.trigger === 'toggle') {
      bindEvent(
        this.eventName('click'),
        () => {
          if (this.is('shown')) {
            this.hide()
          } else {
            this.show()
          }
        },
        this.$zoom
      )
    }

    bindEvent(
      this.eventName('mouseenter touchstart'),
      this.onEnter.bind(this),
      this.$zoom
    )
    bindEvent(this.eventName('dragstart'), () => false, this.$zoom)
    bindEvent(this.eventName('selectstart'), () => false, this.$zoom)

    if (this.options.zoomable) {
      bindEvent(
        this.eventName('wheel'),
        e => {
          e.preventDefault()

          if (e.deltaY < 0) {
            this.zoomUp(this.options.zoomStep)
          } else if (e.deltaY > 0) {
            this.zoomDown(this.options.zoomStep)
          }
        },
        this.$zoom
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$zoom)
  }

  onEnter() {
    addClass(this.classes.MOVING, this.$wrap)

    bindEvent(
      this.eventName('mousemove touchmove'),
      this.onMove.bind(this),
      this.$zoom
    )

    bindEvent(
      this.eventName('mouseleave touchend touchcancel'),
      this.onLeave.bind(this),
      this.$zoom
    )

    this.offset = getOffset(this.$zoom)
    this.initTargetDimension()

    this.enter('moving')
    this.trigger(EVENTS.ENTER)
  }

  onMove(event) {
    if (!this.is('moving')) {
      return
    }
    this.position = this.getPosition(event)
    if (this.is('shown')) {
      this.positionTarget(this.position.x, this.position.y)
      this.trigger(EVENTS.MOVE)
    }
  }

  onLeave() {
    if (!this.is('moving')) {
      return
    }

    removeClass(this.classes.MOVING, this.$wrap)
    removeEvent(
      this.eventName('mousemove mouseup touchmove touchend touchcancel'),
      this.$zoom
    )

    this.leave('moving')
    this.trigger(EVENTS.LEAVE)
  }

  getPosition(event) {
    const result = {
      x: null,
      y: null
    }

    event = event.originalEvent || event || window.event

    if (event.touches && event.touches.length) {
      event = event.touches[0]
    } else if (event.changedTouches && event.changedTouches.length) {
      event = event.changedTouches[0]
    }

    if (event.pageX) {
      result.x = event.pageX
      result.y = event.pageY
    } else {
      result.x = event.clientX
      result.y = event.clientY
    }

    return {
      x: (result.x - this.offset.left) / this.width,
      y: (result.y - this.offset.top) / this.height
    }
  }

  swap(small, large) {
    if (isElement(small)) {
      this.$image = small
    } else if (isPlainObject(small)) {
      Object.assign(this.$image, small)
    } else if (isString(small)) {
      this.$image.src = this.small
    }

    ;['sizes', 'srcset', 'src'].forEach(prop => {
      this.$targetImage[prop] = ''
    })

    this.large = large
    this.initDimension()
    this.initTargetDimension()
    this.$targetImage.remove()
    this.$targetImage = null
    this.loaded = false
    this.position = null

    if (this.is('loading')) {
      this.leave('loading')
    }
  }

  load(done) {
    this.enter('loading')
    if (this.LOADER) {
      this.LOADER.show()
    }

    ImageLoader.of(this.large)
      .on('loaded', () => {
        done.call(this)
        this.loaded = true

        if (this.is('error')) {
          removeClass(this.classes.ERRORSHOW, this.$error)
          this.leave('error')
        }
      })
      .on('error', () => {
        if (!this.$error) {
          this.$error = appendTo(
            template.render(this.options.templates.error.call(this), {
              classes: this.classes,
              text: this.options.error
            }),
            this.$wrap
          )
        }
        addClass(this.classes.ERRORSHOW, this.$error)

        if (this.options.errorDuration) {
          setTimeout(() => {
            removeClass(this.classes.ERRORSHOW, this.$error)
          }, this.options.errorDuration)
        }

        this.enter('error')
        this.trigger(EVENTS.ERROR)
      })
      .on('always', () => {
        if (this.LOADER) {
          this.LOADER.hide()
        }
        this.leave('loading')
      })
  }

  show() {
    if (this.is('hided')) {
      this.leave('hided')
    }

    if (!this.is('shown') && !this.is('loading')) {
      const _show = () => {
        if (this.is('hided')) {
          return
        }
        this.prepareTargetImage()

        addClass(this.classes.SHOW, this.$wrap)
        addClass(this.classes.TARGETSHOW, this.$target)

        this.trigger(EVENTS.SHOW)
        this.enter('shown')
      }

      if (!this.loaded) {
        this.load(_show.bind(this))
      } else {
        _show()
      }
    }
  }

  prepareTargetImage() {
    if (!this.$target) {
      this.$target = appendTo(
        `<div class="${this.classes.TARGET}"></div>`,
        this.$wrap
      )
    }

    if (!this.$targetImage) {
      if (isElement(this.large)) {
        this.$targetImage = this.large
      } else {
        this.$targetImage = new Image()
        if (isString(this.large)) {
          this.$targetImage.src = this.large
        } else if (isPlainObject(this.large)) {
          Object.assign(this.$targetImage, this.large)
        }
      }
      this.initTargetDimension()
      this.zoomTo(this.zoom)
      append(this.$targetImage, this.$target)
    }
  }

  zoomTo(zoom) {
    if (zoom < this.targetWidth / this.width) {
      zoom = this.targetWidth / this.width
    }

    this.zoom = zoom

    if (this.$targetImage) {
      setStyle(
        {
          width: `${this.width * zoom}px`,
          height: `${this.height * zoom}px`
        },
        this.$targetImage
      )

      if (this.position) {
        this.positionTarget(this.position.x, this.position.y)
      }
    }
  }

  zoomUp(val) {
    this.zoomBy(val)
  }

  zoomDown(val) {
    this.zoomBy(-1 * val)
  }

  zoomBy(val) {
    this.zoomTo(this.zoom + parseFloat(val))
  }

  positionTarget(x, y) {
    let left = parseInt(-x * this.zoom * this.width + this.targetWidth / 2, 10)
    let top = parseInt(-y * this.zoom * this.height + this.targetHeight / 2, 10)

    if (this.options.limit) {
      if (left > 0) {
        left = 0
      } else if (left < this.targetWidth - this.zoom * this.width) {
        left = this.targetWidth - this.zoom * this.width
      }
      if (top > 0) {
        top = 0
      } else if (top < this.targetHeight - this.zoom * this.height) {
        top = this.targetHeight - this.zoom * this.height
      }
    }
    let transform
    if (this.zoom === 1) {
      transform = `translate(${left}px,${top}px)`
    } else {
      transform = `translate3d(${left}px,${top}px,0)`
    }
    setStyle('transform', transform, this.$targetImage)
  }

  hide() {
    if (this.is('shown')) {
      removeClass(this.classes.SHOW, this.$wrap)
      removeClass(this.classes.TARGETSHOW, this.$target)
      this.trigger(EVENTS.HIDE)
      this.leave('shown')
    }

    if (!this.is('hided')) {
      this.enter('hided')
    }
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  resize() {
    this.initDimension()
    this.initTargetDimension()
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      if (this.$wrap === this.element) {
        if (this.options.theme) {
          removeClass(this.getThemeClasss(), this.$wrap)
        }
        removeClass(this.classes.WRAP, this.$wrap)
        removeClass(
          this.getClass(this.classes.MODE, 'mode', this.options.mode),
          this.$wrap
        )
        removeClass(
          this.getClass(
            this.classes.OUTSIDEPLACEMENT,
            'placement',
            this.options.placement
          ),
          this.$wrap
        )
      } else {
        unwrap(`.${this.classes.WRAP}`, this.$image)
      }

      if (this.LOADER) {
        this.LOADER.destroy()
      }
      removeClass(this.classes.IMAGE, this.$image)

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Magnify
