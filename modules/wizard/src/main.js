import Component from '@pluginjs/component'
import {
  find,
  attr,
  data,
  queryAll,
  query,
  setData,
  getData
} from '@pluginjs/dom'
import { each } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent, trigger } from '@pluginjs/events'
import { isString, isFunction } from '@pluginjs/is'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import Keyboard from './keyboard'
import Step from './step'

let counter = 0

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Wizard extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    setData(NAMESPACE, this, this.element)
    this.$steps = queryAll(this.options.step, this.element)

    this.id = attr('id', this.element)

    if (!this.id) {
      this.id = `${NAMESPACE}-${++counter}`
      attr({ id: this.id }, this.element)
    }

    this.setupI18n()
    this.trigger(EVENTS.INIT)
    this.initStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.steps = []
    const that = this

    each(this.$steps, (element, index) => {
      that.steps.push(new Step(element, that, index))
    })

    this.present = 0
    this.transitioning = null

    each(this.steps, step => {
      step.setup()
    })

    this.setup()

    this.bind()

    if (this.options.keyboard) {
      this.KEYBOARD = new Keyboard(this)
    }
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const that = this
    bindEvent(
      this.eventName('click'),
      this.options.step,
      e => {
        const index = getData('wizard-index', e.target)

        if (!that.get(index).is('disabled')) {
          that.goTo(index)
        }

        e.preventDefault()
        e.stopPropagation()
      },
      this.element
    )
  }

  unbind() {
    if (this.options.keyboard) {
      this.KEYBOARD.unbind()
    }
    removeEvent(this.eventName(), window)
  }

  getButtons() {
    const className = this.classes.BUTTONS.CONTAINER
    const $buttons = find(`.${className}`, this.element)

    const id = `#${this.id}`

    queryAll('a', $buttons).forEach(a => {
      attr({ href: id }, a)
    })

    return $buttons
  }

  setup() {
    this.$buttons = this.getButtons()

    this.updateButtons()
  }

  updateButtons() {
    const classes = this.classes.BUTTON
    const $back = find('[data-wizard="back"]', this.$buttons)
    const $next = find('[data-wizard="next"]', this.$buttons)
    const $finish = find('[data-wizard="finish"]', this.$buttons)

    if (this.present === 0) {
      addClass(classes.DISABLED, $back)
    } else {
      removeClass(classes.DISABLED, $back)
    }

    if (this.present === this.lastIndex()) {
      addClass(classes.HIDE, $next)
      removeClass(classes.HIDE, $finish)
    } else {
      removeClass(classes.HIDE, $next)
      addClass(classes.HIDE, $finish)
    }
  }

  updateSteps() {
    each(this.steps, (step, i) => {
      if (i > this.present) {
        step.leave('error')
        step.leave('active')
        step.leave('done')

        if (!this.options.enableWhenVisited) {
          step.enter('disabled')
        }
      }
    })
  }

  keydown(e) {
    if (/input|textarea/i.test(e.target.tagName)) {
      return
    }

    switch (e.which) {
      case 37:
        this.back()
        break
      case 39:
        this.next()
        break
      default:
        return
    }

    e.preventDefault()
  }

  get(index) {
    if (isString(index) && index.substring(0, 1) === '#') {
      const id = index.substring(1)
      for (const i in this.steps) {
        if (attr('id', this.steps[i].pane) === id) {
          return this.steps[i]
        }
      }
    }

    if (index < this.length() && this.steps[index]) {
      return this.steps[index]
    }

    return null
  }

  goTo(index, callback) {
    if (index === this.present || this.is('transitioning') === true) {
      return false
    }

    const current = this.current()
    const to = this.get(index)

    if (index > this.present) {
      if (!current.validate()) {
        current.leave('done')
        current.enter('error')

        return -1
      }
      current.leave('error')

      if (index > this.present) {
        current.enter('done')
      }
    }

    const that = this
    const process = () => {
      that.trigger(EVENTS.BEFORECHANGE, current, to)
      that.enter('transitioning')
      current.hide()
      to.show(function() {
        that.present = index
        that.leave('transitioning')
        that.leave('disabled')

        that.updateButtons()
        that.updateSteps()

        if (that.options.autoFocus) {
          const $input = queryAll('input', this.pane)
          if ($input.length > 0) {
            trigger('focus', $input[0])
          } else {
            trigger('focus', this.pane)
          }
        }

        if (isFunction(callback)) {
          callback.call(that)
        }

        that.trigger(EVENTS.AFTERCHANGE, current, to)
      })
    }

    if (to.loader) {
      to.load(() => {
        process()
      })
    } else {
      process()
    }

    return true
  }

  length() {
    return this.steps.length
  }

  current() {
    return this.get(this.present)
  }

  currentIndex() {
    return this.present
  }

  lastIndex() {
    return this.length() - 1
  }

  next() {
    if (this.present < this.lastIndex()) {
      const from = this.present
      const to = this.present + 1

      this.goTo(to, function() {
        this.trigger(EVENTS.NEXT, this.get(from), this.get(to))
      })
    }

    return false
  }

  back() {
    if (this.present > 0) {
      const from = this.present
      const to = this.present - 1

      this.goTo(to, function() {
        this.trigger(EVENTS.BACK, this.get(from), this.get(to))
      })
    }

    return false
  }

  first() {
    return this.goTo(0)
  }

  finish() {
    if (this.present === this.lastIndex()) {
      const current = this.current()
      if (current.validate()) {
        this.trigger(EVENTS.FINISH)
        current.leave('error')
        current.enter('done')
      } else {
        current.enter('error')
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

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

queryAll('[data-wizard]', window.document).forEach(ele => {
  ele.addEventListener('click', e => {
    let href
    const target =
      attr('data-target', e.target) ||
      query(
        (href = attr('href', e.target)) && href.replace(/.*(?=#[^\s]+$)/, '')
      )
    const wizard = getData(NAMESPACE, target)

    if (!wizard) {
      return
    }

    const method = data(NAMESPACE, e.target)

    if (/^(back|next|first|finish|reset)$/.test(method)) {
      wizard[method]()
    }

    e.preventDefault()
  })
})

export default Wizard
