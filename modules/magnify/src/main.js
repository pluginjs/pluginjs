import Component from '@pluginjs/component'
import template from '@pluginjs/template'
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
import { query, wrap, unwrap, appendTo, empty, append } from '@pluginjs/dom'
import { getWidth, getHeight, setStyle } from '@pluginjs/styled'
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
      this.$img = query('img, picture', this.$wrap)
    } else {
      this.$img = this.element
      this.$wrap = wrap(`<div class="${this.classes.WRAP}"></div>`, this.$img)
    }

    this.loaded = false
    this.large = this.options.image
    this.zoom = this.options.zoom
    this.width = getWidth(this.$wrap)
    this.height = getHeight(this.$wrap)
    this.ratio = this.width / this.height

    addClass(this.classes.IMAGE, this.$img)

    addClass(
      this.getClass(this.classes.MODE, 'mode', this.options.mode),
      this.$wrap
    )
    if (this.options.theme) {
      addClass(this.getThemeClasss(), this.$wrap)
    }
    if (this.options.loader) {
      this.LOADER = Loader.of(this.$wrap, this.options.loader)
    }

    this.getDimension()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  getDimension() {
    ImageLoader.of(this.$img).on('loaded', () => {
      this.width = this.$img.width
      this.height = this.$img.height
      this.ratio = this.width / this.height
    })
  }

  bind() {
    if (this.options.trigger === 'hover') {
      bindEvent(
        this.eventName('mouseenter touchstart'),
        () => {
          this.show()
        },
        this.$wrap
      )
      bindEvent(
        this.eventName('mouseleave touchend'),
        () => {
          this.hide()
        },
        this.$wrap
      )
    } else if (this.options.trigger === 'click') {
      bindEvent(
        this.eventName('click'),
        () => {
          this.show()
        },
        this.$wrap
      )
      bindEvent(
        this.eventName('mouseleave touchend'),
        () => {
          this.hide()
        },
        this.$wrap
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
        this.$wrap
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
  }

  swap(small, large) {
    if (isElement(small)) {
      this.$img = small
    } else if (isPlainObject(small)) {
      Object.assign(this.$img, small)
    } else if (isString(small)) {
      this.$img.src = this.small
    }

    this.getDimension()
    this.large = large
    this.$enlared.remove()
    this.$enlared = null
    this.loaded = false

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
        this.prepareEnlarged()
        addClass(this.classes.SHOW, this.$wrap)
        addClass(this.classes.ENLAREDSHOW, this.$enlared)
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

  prepareEnlarged() {
    if (!this.$enlared) {
      this.$enlared = appendTo(
        template.render(this.options.templates.enlarged.call(this), {
          classes: this.classes
        }),
        this.$wrap
      )

      let $img
      if (isElement(this.large)) {
        $img = this.large
      } else {
        $img = new Image()
        if (isString(this.large)) {
          $img.src = this.large
        } else if (isPlainObject(this.large)) {
          Object.assign($img, this.large)
        }
      }

      setStyle(
        {
          width: `${this.width * this.zoom}px`,
          height: `${this.height * this.zoom}px`
        },
        $img
      )

      empty(this.$enlared)
      append($img, this.$enlared)
    }
  }

  hide() {
    if (this.is('shown')) {
      removeClass(this.classes.SHOW, this.$wrap)
      removeClass(this.classes.ENLAREDSHOW, this.$enlared)
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
      } else {
        unwrap(`.${this.classes.WRAP}`, this.$img)
      }

      if (this.LOADER) {
        this.LOADER.destroy()
      }
      removeClass(this.classes.IMAGE, this.$img)

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Magnify
