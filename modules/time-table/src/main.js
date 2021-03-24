import Component from '@pluginjs/component'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import { addClass } from '@pluginjs/classes'
import { wrap } from '@pluginjs/dom'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import Controller from './components/controller'
import View from './components/view'
import Classifier from './components/classifier'
import Util from './util'
// data-fns
import {
  getDaysInMonth,
  startOfMonth,
  getDay,
  subDays,
  subWeeks,
  subMonths,
  addDays,
  addMonths,
  addWeeks
} from 'date-fns'

// const COMPONENTS = {}

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class TimeTable extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()

    this.wrap = wrap(
      `<div class="${this.classes.NAMESPACE}"></div>`,
      this.element
    )

    this.setupI18n()

    this.initialize()
  }

  initialize() {
    // hide input element
    addClass(this.classes.DATA, this.element)
    this.currentClass = this.translate('all')
    this.currentMode = this.options.view
    this.addEventColor()
    this.updateTime()

    this.initLocale()

    this.classifier = new Classifier(this)
    this.controller = new Controller(this)
    this.view = new View(this)
  }

  switchClass(className) {
    this.currentClass = className
    this.initData()
    this.view.update()
  }

  changeView(mode) {
    this.currentMode = mode
    this.controller.update()
    this.view.changeView(mode)
    this.view.update()
  }

  nextWeek() {
    this.currentDay = addWeeks(this.currentDay, 1)
    this.updateWeek()

    this.controller.update()
    this.view.update()
  }

  preWeek() {
    this.currentDay = subWeeks(this.currentDay, 1)
    this.updateWeek()

    this.controller.update()
    this.view.update()
  }

  nextMonth() {
    this.currentDay = addMonths(this.currentDay, 1)
    this.updateMonth()

    this.controller.update()
    this.view.update()
  }

  preMonth() {
    this.currentDay = subMonths(this.currentDay, 1)
    this.updateMonth()

    this.controller.update()
    this.view.update()
  }

  next() {
    switch (this.currentMode) {
      case 'weekly':
        this.nextWeek()
        break
      case 'monthly':
        this.nextMonth()
        break
      default:
        break
    }
  }

  previous() {
    switch (this.currentMode) {
      case 'weekly':
        this.preWeek()
        break
      case 'monthly':
        this.preMonth()
        break
      default:
        break
    }
  }

  updateTime() {
    // todo  denpend options
    this.currentDay = new Date('2017-12-7')

    this.initData()

    this.updateWeek()
    this.updateMonth()
  }

  updateMonth() {
    this.daysInMonth = getDaysInMonth(this.currentDay)

    this.monthFirstDay = startOfMonth(this.currentDay).getDay()
  }

  updateWeek() {
    // updateWeek denpend this.currentDay
    const currentDayOfWeek = getDay(this.currentDay)

    this.currentWeek = []

    // current day is sunday
    if (currentDayOfWeek === 0) {
      this.currentWeek.push(this.currentDay)
      for (let i = 1; i < 7; i++) {
        this.currentWeek.push(addDays(this.currentDay, i))
      }
    } else {
      // the days before currentDay in this week
      for (let i = currentDayOfWeek; i >= 0; i--) {
        this.currentWeek.push(subDays(this.currentDay, i))
      }
      // the days after currentDay in this week
      for (let i = 0; i < 6 - currentDayOfWeek; i++) {
        this.currentWeek.push(addDays(this.currentDay, i + 1))
      }
    }
  }

  initData() {
    const currentClass = this.currentClass

    this.data = []

    if (currentClass === this.translate('all')) {
      this.data = this.options.data
    } else {
      this.options.data.map(item => { /* eslint-disable-line */
        if (item.class === currentClass) {
          this.data.push(item)
        }
      })
    }
  }

  addEventColor() {
    this.options.data.map(item => { /* eslint-disable-line */
      item.color = Util.randomColor()
    })
  }

  initLocale() {
    this.month = this.translate('month')
    for (const mon in this.month) {
      if (Object.prototype.hasOwnProperty.call(this.month, mon)) {
        const v = this.month[mon]
        this.month[v] = mon
      }
    }
    this.fullMonth = this.translate('fullMonth')
    for (const mon in this.fullMonth) {
      if (Object.prototype.hasOwnProperty.call(this.fullMonth, mon)) {
        const v = this.fullMonth[mon]
        this.fullMonth[v] = mon
      }
    }
    this.weekday = this.translate('weekday')
    this.fullWeek = this.translate('fullWeek')
    this.choice = this.translate('choice')
    this.today = this.translate('today')
    this.add = this.translate('add')
    this.all = this.translate('all')
  }
}

export default TimeTable
