import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import { find, finds, attr, Each, dataset } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import is from '@pluginjs/is'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
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
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS
})
class Wizard extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    this.$steps = finds(this.options.step, this.element)

    // this.$steps = this.$element.find(this.options.step)

    this.id = attr('id', this.element)

    // this.id = this.$element.attr('id')

    if (!this.id) {
      this.id = `${NAMESPACE}-${++counter}`
      attr({ id: this.id }, this.element)
      // this.$element.attr('id', this.id)
    }

    this.setupI18n()
    this.trigger(EVENTS.INIT)
    this.initStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
      // this.$element.addClass(this.getThemeClass())
    }

    this.steps = []
    const that = this

    Each(this.$steps, (element, index) => {
      that.steps.push(new Step(element, that, index))
    })
    // this.$steps.each(function(index) {
    //   that.steps.push(new Step(this, that, index))
    // })

    this.present = 0
    this.transitioning = null

    Each(this.steps, step => {
      step.setup()
    })

    // $.each(this.steps, (i, step) => {
    //   step.setup()
    // })

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
      {
        type: this.eventName('click'),
        identity: this.options.step,
        handler: e => {
          const index = dataset('wizardIndex', e.target)
          // const index = $(this).data('wizard-index')
          if (!that.get(index).is('disabled')) {
            that.goTo(index)
          }

          e.preventDefault()
          e.stopPropagation()
        }
      },
      this.element
    )

    // this.$element.on(this.eventName('click'), this.options.step, function(e) {
    //   const index = $(this).data('wizard-index')

    //   if (!that.get(index).is('disabled')) {
    //     that.goTo(index)
    //   }

    //   e.preventDefault()
    //   e.stopPropagation()
    // })
  }

  unbind() {
    if (this.options.keyboard) {
      this.KEYBOARD.unbind()
    }
    this.element.off(this.eventName())
  }

  getButtons() {
    const className = this.classes.BUTTONS.CONTAINER
    const $buttons = find(`.${className}`, this.element)
    // console.log($buttons)
    // const $buttons = $(this.element).find(`.${className}`)
    const id = `#${this.id}`

    Each(finds('a', $buttons), a => {
      attr({ href: id }, a)
    })
    // $buttons.find('a').attr({ href: id })

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
    // const $back = this.$buttons.find('[data-wizard="back"]')
    // const $next = this.$buttons.find('[data-wizard="next"]')
    // const $finish = this.$buttons.find('[data-wizard="finish"]')

    if (this.present === 0) {
      addClass(classes.DISABLED, $back)
      // $back.addClass(classes.DISABLED)
    } else {
      removeClass(classes.DISABLED, $back)
      // $back.removeClass(classes.DISABLED)
    }

    if (this.present === this.lastIndex()) {
      addClass(classes.HIDE, $next)
      removeClass(classes.HIDE, $finish)
      // $next.addClass(classes.HIDE)
      // $finish.removeClass(classes.HIDE)
    } else {
      removeClass(classes.HIDE, $next)
      addClass(classes.HIDE, $finish)
      // $next.removeClass(classes.HIDE)
      // $finish.addClass(classes.HIDE)
    }
  }

  updateSteps() {
    Each(this.steps, (step, i) => {
      if (i > this.present) {
        step.leave('error')
        step.leave('active')
        step.leave('done')

        if (!this.options.enableWhenVisited) {
          step.enter('disabled')
        }
      }
    })
    // $.each(this.steps, (i, step) => {
    //   if (i > this.present) {
    //     step.leave('error')
    //     step.leave('active')
    //     step.leave('done')

    //     if (!this.options.enableWhenVisited) {
    //       step.enter('disabled')
    //     }
    //   }
    // })
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
    if (is.string(index) && index.substring(0, 1) === '#') {
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
          const $input = finds(':input', this.pane)
          // const $input = this.pane.find(':input')
          if ($input.length > 0) {
            // $input[0]
            // console.log('11111')
            $input.eq(0).focus()
          } else {
            // console.log('22222')
            this.pane.focus()
          }
        }

        if (is.function(callback)) {
          callback.call(that)
        }
        // if ($.isFunction(callback)) {
        //   callback.call(that)
        // }

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
        // this.$element.removeClass(this.getThemeClass())
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

// Pj.$doc.on('click', '[data-wizard]', function(e) {
//   let href
//   const $this = $(this)
//   const $target = $(
//     $this.attr('data-target') ||
//       ((href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''))
//   )

//   const wizard = $target.data(NAMESPACE)

//   if (!wizard) {
//     return
//   }

//   const method = $this.data(NAMESPACE)

//   if (/^(back|next|first|finish|reset)$/.test(method)) {
//     wizard[method]()
//   }

//   e.preventDefault()
// })

export default Wizard
