// import getYear from 'date-fns/get_year'
// import getMonth from 'date-fns/get_month'
// import subWeeks from 'date-fns/sub_weeks'
// import subMonths from 'date-fns/sub_months'
// import subDays from 'date-fns/sub_days'
// import addWeeks from 'date-fns/add_weeks'
import format from 'date-fns/format'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import { append, parseHTML, query } from '@pluginjs/dom'

class Controller {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes

    this.$element = parseHTML(
      this.createEl('controller', {
        class: this.classes.CONTROL,
        previewClass: this.classes.PREVIEW,
        nextClass: this.classes.NEXT,
        textClass: this.classes.TEXT,
        arrowClass: this.classes.ARROW
      })
    )

    append(this.$element, instance.wrap)

    this.init()
  }

  init() {
    this.$content = query('span', this.$element)
    this.update()

    this.bind()
  }

  update() {
    switch (this.instance.currentMode) {
      case 'weekly':
        this.show()
        this.updateWeek()
        break
      case 'monthly':
        this.show()
        this.updateMonth()
        break
      case 'listly':
        this.hide()
        break
      default:
        break
    }
  }

  updateMonth() {
    const controllerStr = format(
      this.instance.currentDay,
      this.options.monthly.controllerLabel
    )
    this.$content.textContent = controllerStr
  }

  updateWeek() {
    let controllerStr = ''
    controllerStr += format(
      this.instance.currentWeek[0],
      this.options.weekly.controllerLabel[0]
    )
    controllerStr += format(
      this.instance.currentWeek[this.instance.currentWeek.length - 1],
      this.instance.options.weekly.controllerLabel[1]
    )
    // log('test  cssss', this.controllerStr)
    this.$content.textContent = controllerStr
  }

  bind() {
    bindEvent(
      this.instance.eventName('click'),
      `.${this.classes.ARROW}`,
      e => {
        const isNext = e.target.classList.contains(this.classes.NEXT)
        if (isNext) {
          this.instance.next()
        } else {
          this.instance.previous()
        }
      },
      this.$element
    )
  }

  hide() {
    if (!hasClass(this.classes.HIDE, this.$element)) {
      addClass(this.classes.HIDE, this.$element)
    }
  }

  show() {
    if (hasClass(this.classes.HIDE, this.$element)) {
      removeClass(this.classes.HIDE, this.$element)
    }
  }

  createEl(tempName, options) {
    return templateEngine.compile(this.options.templates[tempName]())(options)
  }
  get() {
    return this.$content.textContent
  }
}

export default Controller
