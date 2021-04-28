import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import Breakpoints from '@pluginjs/breakpoints'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import { addClass, removeClass } from '@pluginjs/classes'
import { query, appendTo, attr } from '@pluginjs/dom'
import {
  outerWidth,
  outerHeight,
  innerWidth,
  innerHeight,
  setStyle,
  getOffset
} from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { isIE, isIE11 } from '@pluginjs/is'
import Loader from '@pluginjs/loader'
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
    this.$image = query('img', this.element)
    if (!this.$image) {
      return
    }

    this.pageX = null
    this.pageY = null
    this.imageRatio = 1
    this.lensSize = {}
    this.resetOptions()
    this.$wrap = query(this.options.wrapSelector)
      ? query(this.options.wrapSelector)
      : this.element
    addClass(this.classes.NAMESPACE, this.element)
    addClass(this.classes.IMAGE, this.$image)

    if (this.options.theme) {
      addClass(this.getThemeClasss(), this.element)
    }

    if (this.options.loader) {
      this.LOADER = Loader.of(this.element, this.options.loader)
    }

    this.initBreakpoints()
    this.resetZoom()
    this.initOverlay()
    this.initLens()
    this.initWindow()
    this.initMode()

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  resetOptions() {
    this.errorText = this.options.error
    this.errorDuration = this.options.errorDuration
    this.mode = this.options.mode
    this.zoom = this.options.zoom
    this.position = this.options.position
    this.windowWidth = this.options.windowWidth
    this.windowHeight = this.options.windowHeight
  }

  initBreakpoints() {
    Breakpoints.init()

    const screens = Breakpoints.all()
    this.initScreenOptions(screens)

    const that = this
    const currentName = Breakpoints.current().name

    if (this.screenOptions[currentName]) {
      Object.keys(this.screenOptions[currentName]).forEach(key => {
        this[key] = this.screenOptions[currentName][key]
      })
    }

    Breakpoints.on('change', function () {
      if (that.screenOptions[this.current.name]) {
        Object.keys(that.screenOptions[this.current.name]).forEach(key => {
          that[key] = that.screenOptions[this.current.name][key]
        })
      } else {
        that.resetOptions()
      }

      that.initMode()
      that.reset()
    })
  }

  initScreenOptions(screens) {
    this.screenOptions = {}
    Object.keys(this.options).forEach(key => {
      screens.forEach(screen => {
        const screenFirstUpper =
          screen.substring(0, 1).toUpperCase() + screen.substring(1)

        if (key.endsWith(screenFirstUpper)) {
          if (!this.screenOptions[screen]) {
            this.screenOptions[screen] = {}
          }

          this.screenOptions[screen][
            key.slice(0, key.indexOf(screenFirstUpper))
          ] = this.options[key]
        }
      })
    })
  }

  initOverlay() {
    this.$overlay = appendTo(
      template.render(this.options.templates.overlay.call(this), {
        classes: this.classes
      }),
      this.element
    )
  }

  initLens() {
    this.$lens = appendTo(
      template.render(this.options.templates.lens.call(this), {
        classes: this.classes
      }),
      this.element
    )
    this.$lensImage = query(`.${this.classes.LENSIMAGE}`, this.$lens)
  }

  initWindow() {
    this.$window = appendTo(
      template.render(this.options.templates.window.call(this), {
        classes: this.classes
      }),
      this.$wrap
    )
    this.$windowImage = query(`.${this.classes.WINDOWIMAGE}`, this.$window)

    setStyle(
      {
        width: this.windowWidth,
        height: this.windowHeight
      },
      this.$window
    )
  }

  initMode() {
    this.clearClass()

    switch (this.mode) {
      case 'window':
        addClass(
          this.getClass(this.classes.POSITION, 'position', this.position),
          this.$wrap
        )
        this.$targetImage = this.$windowImage
        this.targetWidth = this.windowWidth
        this.targetHeight = this.windowHeight
        break

      default:
        addClass(
          this.getClass(this.classes.MODE, 'mode', this.mode),
          this.element
        )
        this.$targetImage = this.$lensImage
        this.targetWidth = outerWidth(this.element)
        this.targetHeight = outerHeight(this.element)
    }
  }

  bind() {
    bindEvent(
      this.eventName('mouseenter touchstart'),
      () => {
        if (this.is('disabled')) {
          return
        }

        this.trigger(EVENTS.ENTER)

        this.show()
      },
      this.$image
    )

    bindEvent(this.eventName('dragstart'), () => false, this.$image)
    bindEvent(this.eventName('selectstart'), () => false, this.$image)

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
        this.$image
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$image)
  }

  show() {
    if (this.is('hided')) {
      this.leave('hided')
    }

    if (!this.is('shown')) {
      bindEvent(
        this.eventName('mousemove touchmove'),
        this.moveTarget.bind(this),
        this.$image
      )

      bindEvent(
        this.eventName('mouseleave touchend touchcancel'),
        () => {
          this.trigger(EVENTS.LEAVE)

          this.hide()
        },
        this.$image
      )

      addClass(this.classes.SHOW, this.$overlay)

      this.enter('stopLoading')
      this.loadingImage()

      this.enter('shown')
      this.trigger(EVENTS.SHOW)
    }
  }

  hide() {
    if (this.is('shown')) {
      if (this.LOADER) {
        this.LOADER.hide()
      }
      removeClass(this.classes.SHOW, this.$lens)
      removeClass(this.classes.SHOW, this.$overlay)
      removeClass(this.classes.SHOW, this.$window)

      removeEvent(
        this.eventName('mousemove mouseleave touchmove touchend touchcancel'),
        this.$image
      )
      this.leave('stopLoading')
      setStyle(
        {
          width: 'auto',
          height: 'auto',
          transform: 'none'
        },
        this.$windowImage
      )

      this.leave('shown')

      if (!this.is('hided')) {
        this.enter('hided')
      }

      this.trigger(EVENTS.HIDE)
    }
  }

  moveTarget(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!this.is('error')) {
      this.pageX = e.pageX
      this.pageY = e.pageY
      this.positionTarget(e, this.$image)

      this.trigger(EVENTS.MOVE, {
        x: e.pageX,
        y: e.pageY
      })
    }
  }

  loadingImage() {
    const imagePreview = new Image()
    const src = attr(this.options.source, this.$image)
    imagePreview.src = src

    if (this.is('stopLoading')) {
      if (this.mode === 'window') {
        attr('src', src, this.$windowImage)
      } else {
        attr('src', src, this.$lensImage)
      }

      if (this.LOADER) {
        this.LOADER.show()
      }
    }

    bindEvent(
      'load',
      () => {
        this.imageOnLoaded(imagePreview, src)
      },
      imagePreview
    )

    bindEvent(
      'error',
      () => {
        this.imageOnError()
      },
      imagePreview
    )
  }

  imageOnLoaded(imagePreview, src) {
    if (this.LOADER) {
      this.LOADER.hide()
    }

    if (this.is('error')) {
      removeClass(this.classes.ERRORSHOW, this.$error)
      this.leave('error')
    }

    if (this.is('stopLoading')) {
      if (this.mode === 'window') {
        addClass(this.classes.SHOW, this.$window)
      }
      if (this.mode === 'inside') {
        removeClass(this.classes.SHOW, this.$overlay)
      }
      this.imageRatio = imagePreview.width / imagePreview.height
      const e = {
        pageX: this.pageX,
        pageY: this.pageY
      }

      this.prepareImage()
      this.setImageSrc(src, this.$targetImage)
      this.setLens()
      this.positionTarget(e, this.$image)

      this.trigger(EVENTS.LOADED)
    }
  }

  imageOnError() {
    if (this.LOADER) {
      this.LOADER.hide()
    }

    removeClass(this.classes.SHOW, this.$overlay)

    if (!this.is('error')) {
      if (!this.$error) {
        this.$error = appendTo(
          template.render(this.options.templates.error.call(this), {
            classes: this.classes,
            text: this.errorText
          }),
          this.element
        )
      }

      addClass(this.classes.ERRORSHOW, this.$error)

      if (this.errorDuration) {
        setTimeout(() => {
          removeClass(this.classes.ERRORSHOW, this.$error)
          this.leave('error')
        }, this.errorDuration)
      }

      this.enter('error')
    }

    this.trigger(EVENTS.ERROR)
  }

  prepareImage() {
    const targetRatio = this.targetWidth / this.targetHeight
    const size = {
      width: this.targetWidth * this.zoom,
      height: this.targetHeight * this.zoom
    }

    if (this.imageRatio > targetRatio) {
      size.width = 'auto'
    }
    if (this.imageRatio < targetRatio) {
      size.height = 'auto'
    }

    this.setImageSize(size, this.$targetImage)
  }

  positionTarget(e, $image) {
    const mouseX = Math.round(e.pageX - getOffset($image).left)
    const mouseY = Math.round(e.pageY - getOffset($image).top)

    if (this.mode === 'round') {
      const x = (e.pageX - getOffset($image).left) / outerWidth($image)
      const y = (e.pageY - getOffset($image).top) / outerHeight($image)
      const left = 0.5 * this.lensSize.width - outerWidth(this.$targetImage) * x
      const top =
        0.5 * this.lensSize.height - outerHeight(this.$targetImage) * y

      const pos = this.getPosition(mouseX, mouseY)

      this.moveLens(pos.left, pos.top)
      setStyle(
        {
          transform: `translate(${left}px, ${top}px)`
        },
        this.$targetImage
      )
    } else {
      const pos = this.getPosition(mouseX, mouseY)
      const left = -Math.round(outerWidth(this.$targetImage) * pos.x)
      const top = -Math.round(outerHeight(this.$targetImage) * pos.y)

      if (this.mode === 'window') {
        this.moveLens(pos.left, pos.top)
      }
      this.moveTargetImage(left, top)
    }
  }

  moveTargetImage(left, top) {
    if (left >= 0) {
      left = 0
    }
    if (left <= this.targetWidth - outerWidth(this.$targetImage)) {
      left = this.targetWidth - outerWidth(this.$targetImage)
    }
    if (top >= 0) {
      top = 0
    }
    if (top <= this.targetHeight - outerHeight(this.$targetImage)) {
      top = this.targetHeight - outerHeight(this.$targetImage)
    }

    setStyle(
      {
        transform: `translate(${left}px, ${top}px)`
      },
      this.$targetImage
    )
  }

  setLens(showLens = true) {
    let height
    let width

    if (this.mode === 'round') {
      width = innerWidth(this.$lens)
      height = innerHeight(this.$lens)
    } else {
      const ratioWidth = this.targetWidth / outerWidth(this.$targetImage)
      const ratioHeight = this.targetHeight / outerHeight(this.$targetImage)
      width = Math.round(ratioWidth * outerWidth(this.$image))
      height = Math.round(ratioHeight * outerHeight(this.$image))

      if (this.mode === 'window') {
        const src = attr('src', this.$image)
        const size = {
          width: outerWidth(this.$image),
          height: outerHeight(this.$image)
        }
        this.setImageSize(size, src, this.$lensImage)
        this.setImageSrc(src, this.$lensImage)
      }
    }

    this.lensSize.width = width
    this.lensSize.height = height

    if (this.mode !== 'inside') {
      setStyle({ width, height }, this.$lens)
    }

    if (showLens) {
      addClass(this.classes.SHOW, this.$lens)
    }
  }

  getPosition(mouseX, mouseY) {
    let left = Math.round(mouseX - this.lensSize.width / 2)
    let top = Math.round(mouseY - this.lensSize.height / 2)

    if (this.mode !== 'round') {
      if (left <= 0) {
        left = 0
      }
      if (left >= outerWidth(this.$image) - this.lensSize.width) {
        left = outerWidth(this.$image) - this.lensSize.width
      }
      if (top <= 0) {
        top = 0
      }
      if (top >= outerHeight(this.$image) - this.lensSize.height) {
        top = outerHeight(this.$image) - this.lensSize.height
      }
    }

    return {
      left,
      top,
      x: left / outerWidth(this.$image),
      y: top / outerHeight(this.$image)
    }
  }

  moveLens(left, top) {
    setStyle(
      {
        transform: `translate(${left}px, ${top}px)`
      },
      this.$lens
    )

    setStyle(
      {
        transform: `translate(${-left}px, ${-top}px)`
      },
      this.$lensImage
    )
  }

  setImageSize(size, $image) {
    setStyle(
      {
        width: size.width,
        height: size.height
      },
      $image
    )

    attr(
      {
        width: size.width,
        height: size.height
      },
      $image
    )
  }

  setImageSrc(src, $image) {
    attr({ src }, $image)
  }

  resetZoom() {
    if (this.options.min < 1) {
      this.options.min = 1
    }
    if (this.zoom < this.options.min) {
      this.zoom = this.options.min
    } else if (this.zoom > this.options.max) {
      this.zoom = this.options.max
    }
  }

  zoomUp(val) {
    this.zoom = (this.zoom * 10 + parseFloat(val) * 10) / 10
    this.resetZoom()
    this.zoomTarget()
  }

  zoomDown(val) {
    this.zoom = (this.zoom * 10 - parseFloat(val) * 10) / 10
    this.resetZoom()
    this.zoomTarget()
  }

  zoomTo(val) {
    this.zoom = parseFloat(val)
    this.resetZoom()
    this.zoomTarget()
  }

  zoomTarget() {
    if (this.is('error')) {
      return
    }

    const e = {
      pageX: this.pageX,
      pageY: this.pageY
    }

    this.prepareImage()
    this.setLens(false)
    this.positionTarget(e, this.$image)

    this.trigger(EVENTS.ZOOM)
  }

  changeMode(mode) {
    if (
      this.is('initialized') &&
      ['round', 'window', 'inside'].includes(mode)
    ) {
      this.mode = mode

      this.initMode()
      this.reset()
    }
  }

  clearClass() {
    ;['left', 'right', 'top', 'bottom'].forEach(position => {
      removeClass(
        this.getClass(this.classes.POSITION, 'position', position),
        this.$wrap
      )
    })
    removeClass(this.classes.INSIDE, this.element)
    removeClass(this.classes.ROUND, this.element)
  }

  reset() {
    setStyle(
      {
        width: '',
        height: '',
        transform: ''
      },
      this.$lens
    )
    setStyle(
      {
        width: '',
        height: '',
        transform: ''
      },
      this.$lensImage
    )
    attr(
      {
        width: '',
        height: '',
        src: ''
      },
      this.$lensImage
    )
    attr(
      {
        width: '',
        height: '',
        src: ''
      },
      this.$windowImage
    )
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

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClasss(), this.element)
      }

      this.clearClass()

      if (this.$overlay) {
        if (isIE() || isIE11()) {
          this.$overlay.removeNode(true)
        } else {
          this.$overlay.remove()
        }
      }

      if (this.$lens) {
        if (isIE() || isIE11()) {
          this.$lens.removeNode(true)
        } else {
          this.$lens.remove()
        }
      }

      if (this.$window) {
        if (isIE() || isIE11()) {
          this.$window.removeNode(true)
        } else {
          this.$window.remove()
        }
      }

      if (this.LOADER) {
        this.LOADER.destroy()
      }

      removeClass(this.classes.IMAGE, this.$image)
      removeClass(this.classes.NAMESPACE, this.element)

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Magnify
