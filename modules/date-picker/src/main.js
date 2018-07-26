import Component from '@pluginjs/component'
import { deepMerge, curry, compose } from '@pluginjs/utils'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import Hammer from 'hammerjs'
import Popper from 'popper.js'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  hideElement,
  setStyle,
  outerHeight,
  outerWidth
} from '@pluginjs/styled'
import {
  append,
  parentWith,
  parent,
  closest,
  insertAfter,
  children,
  wrap as wrapElement,
  unwrap,
  query,
  queryAll,
  parseHTML,
  find
} from '@pluginjs/dom'
import Pj from '@pluginjs/pluginjs'
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
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import Keyboard from './keyboard'

const $doc = Pj.doc
// const compileTemplate = template.compile

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(true)
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class DatePicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.$element = this.element
    const data = this.getDataOptions()

    this.defaultOptions = deepMerge(DEFAULTS, options, data)
    this.options = deepMerge(DEFAULTS, options, data)
    this.firstClassName = this.$element.className
    this.initClasses(CLASSES)

    Object.entries(data).forEach(([value, option]) => {
      this.options[option] = this.parseHtmlString(option, value)
      this.defaultOptions[option] = this.parseHtmlString(option, value)
    })

    this.$inputWrap = wrapElement(
      parseHTML(
        template.render(this.options.templates.inputWrap.call(this), {
          classes: this.classes
        })
      ),
      addClass(this.classes.INPUT, this.$element)
    )
    console.log(this.$inputWrap)
    addClass(this.classes.INPUTMODE, this.$element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$inputWrap)
    }

    this.$inputIcon = parseHTML(
      template.render(this.options.templates.inputIcon.call(this), {
        classes: this.classes
      })
    )

    append(this.$inputIcon, this.$inputWrap)

    this.setupI18n()
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.mode = this.options.mode
    this.format = this.parseFormat('yyyy-mm-dd')
    this.outputFormat = this.parseFormat(
      this.options.outputFormat || 'yyyy/mm/dd'
    )

    const inputDate = this.$element.value
    if (inputDate) {
      this.options.date = this.formatDate(inputDate, this.format)
    }

    this.focused = 0

    this.hasKeyboard = this.options.keyboard
    this.map = {}
    this.views = []
    this.isMobile = this.options.mobileMode // with other judgements

    const $wrap = parseHTML(
      template.render(this.options.templates.wrap.call(this), {
        classes: this.classes
      })
    )
    const content = template.render(this.options.templates.content.call(this), {
      classes: this.classes
    })
    const $title = parseHTML(
      template.render(this.options.templates.title.call(this), {
        classes: this.classes
      })
    )
    const buttons = this.translate('buttons')
    this.$picker = $wrap

    // set model default property
    switch (this.mode) {
      case 'single':
        this.calendarsNum = 1
        break
      case 'range':
        this.calendarsNum = 2
        break
      case 'multiple':
        this.calendarsNum = this.isMobile ? 1 : this.options.calendars
        this.options.views = ['days']
        break
      default:
        break
    }

    // set base Views
    for (let i = 0; i < this.calendarsNum; i++) {
      this.$picker.append(parseHTML(content))
      this.views[i] = this.options.views[i] || 'days'
    }

    // check mobileMode
    if (this.isMobile) {
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      const min = Math.min(innerWidth, innerHeight)
      this.$element.setAttribute('readonly', 'readonly')
      this.$mobileTrigger = parseHTML(
        `<div class='${this.classes.MOBILETRIGGER}'></div>`
      )
      insertAfter(this.$mobileTrigger, hideElement(this.$element))
      this.$cover = parseHTML(`<div class="${this.classes.COVER}"></div>`)

      addClass(this.classes.ISMOBILE, append($title, this.$picker))

      setStyle({ fontSize: `${Math.round(min * 0.04)}px` }, this.$picker)

      this.picker = new Hammer(this.$picker)
      this.mobileTrigger = new Hammer(this.$mobileTrigger)
    }

    // make $wrap can be focused
    this.$picker.setAttribute('tabindex', '0')
    this.$inputWrap.append(this.$picker)

    //
    this.$pickerWrap = wrapElement(
      parseHTML(`<div class='${this.classes.PICKERWRAP}'></div>`),
      this.$picker
    )

    // init status in different display mode
    this.initStatus(this.options.displayMode)
    // init pointer
    this.initSections()
    // init default Date
    this.initDate()

    for (let j = 0; j < this.calendarsNum; j++) {
      this.manageViews(j)
      if (this.isMobile) {
        this.$buttonCancels[j].innerHTML = buttons[0]
        this.$buttonSaves[j].innerHTML = buttons[1]
      }
    }

    // init alwaysShow
    this.initShowHide(this.options.alwaysShow)

    this.setValue(false)

    if (!this.isMobile) {
      this.setupPopper()
    }

    if (this.options.keyboard) {
      this.KEYBOARD = new Keyboard(this)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initStatus(displayMode) {
    if (displayMode === 'inline') {
      this.options.alwaysShow = true
      addClass(this.classes.INLINEMODE, this.$inputWrap)
      addClass(this.classes.SHOW, this.$pickerWrap)

      compose(
        bindEvent({
          type: 'focus',
          handler: this.focus.bind(this)
        }),
        bindEvent({
          type: 'blur',
          handler: this.blur.bind(this)
        })
      )(this.$picker)
    } else if (displayMode === 'dropdown') {
      if (this.isMobile) {
        this.mobileTrigger.on('tap', () => {
          this.show()
        })
      } else {
        compose(
          bindEvent({
            type: 'focus',
            handler: this.focus.bind(this)
          }),
          bindEvent({
            type: 'blur',
            handler: this.blur.bind(this)
          })
        )(this.$element)
      }
      // this.$element.on('blur', $.proxy(this.toggle, this));
      bindEvent(
        {
          type: 'click.inputIcon',
          handler: this.toggle.bind(this)
        },
        this.$inputIcon
      )

      // addClass(this.namespace + '_absolute', this.$picker);
    }
  }

  initSections() {
    this.$calendars = queryAll(`.${this.classes.CONTENT}`, this.$picker)
    this.$calendarPrevs = this.$calendars.map(find(`.${this.classes.PREV}`))
    this.$calendarCaptions = this.$calendars.map(
      find(`.${this.classes.CAPTION}`)
    )
    this.$calendarNexts = this.$calendars.map(find(`.${this.classes.NEXT}`))
    this.$daypickers = this.$calendars.map(find(`.${this.classes.DATS}`))
    this.$monthpickers = this.$calendars.map(find(`.${this.classes.MONTHS}`))
    this.$yearpickers = this.$calendars.map(find(`.${this.classes.YEARS}`))
    this.$buttonCancels = this.$calendars.map(
      find(`.${this.classes.BUTTONCANCELS}`)
    )
    this.$buttonSaves = this.$calendars.map(
      find(`.${this.classes.BUTTONSAVES}`)
    )
  }

  initShowHide(alwaysShow) {
    if (alwaysShow === true) {
      this.show()
    }
  }

  initDate() {
    const date =
      this.options.date === 'today'
        ? new Date()
        : this.parseDate(this.options.date, this.format)

    this.privateDate = {}

    this.privateDate.currentDate = [new Date(date)]

    if (this.mode === 'multiple') {
      this.privateDate.selectedDate = []
      this.privateDate.focusDate = new Date(date)
      this.privateDate.focusDate.setHours(0, 0, 0, 0)
    } else {
      this.privateDate.selectedDate = [new Date(date)]
      this.privateDate.focusDate = [new Date(date)]
    }

    this.privateDate.currentDay = []
    this.privateDate.currentMonth = []
    this.privateDate.currentYear = []

    this.privateDate.currentMonthDate = []
    this.privateDate.currentYearDate = []

    this.privateDate.selectedDay = []
    this.privateDate.selectedMonth = []
    this.privateDate.selectedYear = []

    this.privateDate.selectedMonthDate = []
    this.privateDate.selectedYearDate = []

    this.privateDate.cache = {}
    this.privateDate.cache.currentDate = []
    this.privateDate.cache.selectedDate = []

    for (let i = 0; i < this.calendarsNum; i++) {
      this.privateDate.currentDate[i] =
        this.privateDate.currentDate[i] || new Date(date)
      if (this.mode === 'multiple') {
        this.setDate(
          this.privateDate.currentDate[i],
          'month',
          this.privateDate.currentDate[i].getMonth() + i
        )
      } else {
        this.privateDate.selectedDate[i] =
          this.privateDate.selectedDate[i] || new Date(date)
        this.privateDate.selectedDate[i].setHours(0, 0, 0, 0)

        this.privateDate.focusDate[i] =
          this.privateDate.focusDate[i] || new Date(date)
        this.privateDate.focusDate[i].setHours(0, 0, 0, 0)
      }
      this.updateDate(i)
    }
  }

  manageViews(index) {
    switch (this.views[index]) {
      case 'days':
        this.generateDaypicker(index)
        compose(
          addClass(this.classes.ISDAYS),
          removeClass(this.classes.ISMONTHS),
          removeClass(this.classes.ISYEARS)
        )(this.$calendars[index])
        break
      case 'months':
        this.generateMonthpicker(index)
        compose(
          removeClass(this.classes.ISDAYS),
          addClass(this.classes.ISMONTHS),
          removeClass(this.classes.ISYEARS)
        )(this.$calendars[index])
        break
      case 'years':
        this.generateYearpicker(index)
        compose(
          removeClass(this.classes.ISDAYS),
          removeClass(this.classes.ISMONTHS),
          addClass(this.classes.ISYEARS)
        )(this.$calendars[index])
        break
      default:
        break
    }
  }

  generateDaypicker(index) {
    this.generateHeader(
      index,
      `${this.translate('months')[this.privateDate.currentMonth[index]]} ${
        this.privateDate.currentYear[index]
      }`
    )
    this.$daypickers[index].innerHTML = this.generateDays(index)
  }

  generateMonthpicker(index) {
    this.generateHeader(index, this.privateDate.currentYear[index])
    this.$monthpickers[index].innerHTML = this.generateMonths(index)
  }

  generateYearpicker(index) {
    this.generateHeader(
      index,
      `${this.privateDate.currentYear[index] - 6} ${
        this.options.rangeSeparator
      } ${this.privateDate.currentYear[index] + 3}`
    )
    this.$yearpickers[index].innerHTML = this.generateYears(index)
  }

  generateHeader(index, caption) {
    this.$calendarCaptions[index].innerHTML = caption
    this.judgeLock(index)
  }

  generateDays(index) {
    const year = this.privateDate.currentYear[index]
    const month = this.privateDate.currentMonth[index]
    let day
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    let daysFromPrevMonth = firstDay - this.options.firstDayOfWeek
    let html = `<div class="${this.classes.HEAD}">`
    let isUntouch
    let isActive
    let isInRange
    let rangeUntouch
    let content
    let className
    let status = []
    const dateArray = []

    daysFromPrevMonth =
      daysFromPrevMonth < 0 ? 7 + daysFromPrevMonth : daysFromPrevMonth

    for (let i = 0; i < 7; i++) {
      const pos =
        this.options.firstDayOfWeek + i > 6
          ? this.options.firstDayOfWeek + i - 7
          : this.options.firstDayOfWeek + i
      html += `<span>${this.translate('daysShort')[pos]}</span>`
    }
    html += `</div><div class="${this.classes.BODY}"><div class="${
      this.classes.ROW
    }">`
    for (let j = 0; j < 42; j++) {
      day = j - daysFromPrevMonth + 1
      isActive = false
      isInRange = false
      isUntouch = false
      rangeUntouch = false
      status = [isUntouch, isActive, isInRange, rangeUntouch]
      content = 0
      className = ''

      if (j > 0 && j % 7 === 0) {
        html += `</div><div class="${this.classes.ROW}">`
      }

      if (j < daysFromPrevMonth) {
        // prev month days
        className = `${this.classes.OTHERMONTH}`
        content = daysInPrevMonth - daysFromPrevMonth + j + 1
        dateArray[j] = new Date(year, month - 1, content, 0, 0, 0, 0)
      } else if (j > daysInMonth + daysFromPrevMonth - 1) {
        // next month days
        className = `${this.classes.OTHERMONTH}`
        content = day - daysInMonth
        dateArray[j] = new Date(year, month + 1, content, 0, 0, 0, 0)
      } else {
        // current month days
        dateArray[j] = new Date(year, month, day, 0, 0, 0, 0)
        content = day
        if (this.hasKeyboard) {
          if (this.mode === 'multiple') {
            if (
              Date.parse(dateArray[j]) ===
              Date.parse(this.privateDate.focusDate)
            ) {
              className += ` ${this.classes.FOCUS}`
            }
          } else if (
            Date.parse(dateArray[j]) ===
            Date.parse(this.privateDate.focusDate[index])
          ) {
            className += ` ${this.classes.FOCUS}`
          }
        }
      }

      status = this.judgeStatus(
        index,
        'days',
        this.mode,
        status,
        dateArray[j],
        this.privateDate.selectedDate
      )
      className += this.renderStatus(status, index)
      html += `<span class="${className}">${content}</span>`
    }
    html += '</div></div>'
    const $html = parseHTML(html)
    const $inRanges = $html.reduce(
      (r, el) => r.concat(queryAll(`.${this.classes.INRANGE}`, el)),
      []
    )
    const $inRangeFirst = $inRanges[0]
    const $inRangeLast = $inRanges[$inRanges.length - 1]
    if ($inRangeFirst && hasClass(`${this.classes.STARTDAY}`, $inRangeFirst)) {
      addClass(`${this.classes.LASTMONTH}`, $inRangeLast)
    }

    if ($inRangeLast && hasClass(`${this.classes.ENDDAY}`, $inRangeLast)) {
      addClass(`${this.classes.FIRSTMONTH}`, $inRangeFirst)
    }

    html = ''
    $html.forEach(el => {
      html += el.outerHTML
    })
    return html
  }

  generateMonths(index) {
    const year = this.privateDate.currentYear[index]
    let html = ''
    let className
    const content = this.translate('monthsShort')
    const dateArray = []
    const focus = this.privateDate.focusDate[index]
    let isActive
    let isInRange
    let isUntouch
    let rangeUntouch
    let status = []

    html += `<div class="${this.classes.ROW}">`
    for (let i = 0; i < 12; i++) {
      isActive = false
      isInRange = false
      isUntouch = false
      rangeUntouch = false
      status = [isUntouch, isActive, isInRange, rangeUntouch]
      className = ''

      if (i > 0 && i % 4 === 0) {
        html += `</div><div class="${this.classes.ROW}">`
      }
      dateArray[i] = new Date(year, i, 1, 0, 0, 0, 0)

      if (this.hasKeyboard) {
        if (
          Date.parse(dateArray[i]) ===
          Date.parse(
            new Date(focus.getFullYear(), focus.getMonth(), 1, 0, 0, 0, 0)
          )
        ) {
          className += ` ${this.classes.FOCUS}`
        }
      }

      status = this.judgeStatus(
        index,
        'months',
        this.mode,
        status,
        dateArray[i],
        this.privateDate.selectedMonthDate
      )
      className += this.renderStatus(status)

      html += `<span class="month-${i} ${className}">${content[i]}</span>`
    }
    html += '</div>'
    return html
  }

  generateYears(index) {
    const year = this.privateDate.currentYear[index] // 当前年份
    let html = ''
    let className
    let content = 0
    const dateArray = []
    const focus = this.privateDate.focusDate[index] // 当前日期
    let isActive
    let isInRange
    let isUntouch
    let rangeUntouch
    let status = []

    html += `<div class="${this.classes.ROW}">`
    for (let m = 0; m < 12; m++) {
      isActive = false
      isInRange = false
      isUntouch = false
      rangeUntouch = false
      status = [isUntouch, isActive, isInRange, rangeUntouch]
      className = ''

      content = year - 7 + m
      if (m > 0 && m % 4 === 0) {
        html += `</div><div class="${this.classes.ROW}">`
      } else if (m === 0 || m === 11) {
        className += `${this.classes.OTHERYEAR}`
      }
      dateArray[m] = new Date(content, 0, 1, 0, 0, 0, 0)
      if (this.hasKeyboard) {
        if (
          Date.parse(dateArray[m]) ===
          Date.parse(new Date(focus.getFullYear(), 0, 1, 0, 0, 0, 0))
        ) {
          className += ` ${this.classes.FOCUS}`
        }
      }

      status = this.judgeStatus(
        index,
        'years',
        this.mode,
        status,
        dateArray[m],
        this.privateDate.selectedYearDate
      )
      className += this.renderStatus(status)
      html += `<span class="${className}">${content}</span>`
    }
    html += '</div>'
    return html
  }

  judgeLock(index) {
    let prevLock = false
    let nextLock = false
    let current
    let selected
    switch (this.mode) {
      case 'range':
        if (index === 0) {
          switch (this.views[index]) {
            case 'days':
              current = Date.parse(this.privateDate.currentDate[index])
              selected = Date.parse(this.privateDate.selectedMonthDate[1])
              break
            case 'months':
              current = Date.parse(this.privateDate.currentYearDate[index])
              selected = Date.parse(this.privateDate.selectedYearDate[1])
              break
            case 'years':
              current = new Date(
                this.privateDate.currentYearDate[index]
              ).setFullYear(this.privateDate.currentYear[index] + 4)
              selected = Date.parse(this.privateDate.selectedYearDate[1])
              break
            default:
              break
          }
          nextLock = !this.setPoint('<', nextLock, current, selected)
        } else {
          switch (this.views[index]) {
            case 'days':
              current = Date.parse(this.privateDate.currentDate[index])
              selected = Date.parse(this.privateDate.selectedMonthDate[0])
              break
            case 'months':
              current = Date.parse(this.privateDate.currentYearDate[index])
              selected = Date.parse(this.privateDate.selectedYearDate[0])
              break
            case 'years':
              current = new Date(
                this.privateDate.currentYearDate[index]
              ).setFullYear(this.privateDate.currentYear[index] - 7)
              selected = Date.parse(this.privateDate.selectedYearDate[0])
              break
            default:
              break
          }
          prevLock = !this.setPoint('>', prevLock, current, selected)
        }
        break
      case 'multiple':
        if (this.calendarsNum > 1) {
          if (index === 0) {
            nextLock = true
          } else if (index === this.calendarsNum - 1) {
            prevLock = true
          } else {
            prevLock = true
            nextLock = true
          }
        }
        break
      default:
        break
    }
    if (prevLock === true) {
      addClass(this.classes.BLOCKED, this.$calendarPrevs[index])
    } else {
      removeClass(this.classes.BLOCKED, this.$calendarPrevs[index])
    }

    if (nextLock === true) {
      addClass(this.classes.BLOCKED, this.$calendarNexts[index])
    } else {
      removeClass(this.classes.BLOCKED, this.$calendarNexts[index])
    }
  }

  judgeSection(currentDate, startDate, endDate) {
    let status = true

    if (currentDate < startDate || currentDate > endDate) {
      status = false
    }
    return status
  }

  judgeSections(type, currentDate, dateArray, isDay) {
    let status = false
    switch (type) {
      case 'date':
        if (isDay) {
          currentDate = Date.parse(currentDate)
          dateArray.forEach(date => {
            if (!status) {
              switch (date.length) {
                case undefined: /* eslint-disable-line */
                  if (currentDate === Date.parse(date)) {
                    status = true
                  }
                  break
                case 2:
                  status = this.judgeSection(
                    currentDate,
                    Date.parse(date[0]),
                    Date.parse(date[1])
                  )
                  break
                default:
                  break
              }
            }
          })
        } else {
          const min = Date.parse(currentDate[0])
          const max = Date.parse(currentDate[1])
          dateArray.forEach(date => {
            if (!status) {
              switch (date.length) {
                case undefined:  /* eslint-disable-line */
                  if (Date.parse(date) >= min && Date.parse(date) <= max) {
                    status = true
                  }
                  break
                case 2:
                  status = true
                  if (max < Date.parse(date[0]) || min > Date.parse(date[1])) {
                    status = false
                  }
                  break
                default:
                  break
              }
            }
          })
        }
        break
      case 'block':
        dateArray.forEach(date => {
          if (!status) {
            switch (date.length) {
              case undefined:  /* eslint-disable-line */
                if (currentDate === date) {
                  status = true
                }
                break
              case 2:
                status = this.judgeSection(currentDate, date[0], date[1])
                break
              default:
                break
            }
          }
        })
        break
      case 'dayOfWeek': {
        const curr = currentDate.getDay()
        dateArray.forEach(date => {
          if (!status) {
            switch (date.length) {
              case undefined:   /* eslint-disable-line */
                if (curr === date) {
                  status = true
                }
                break
              case 2:
                status = this.judgeSection(curr, date[0], date[1])
                break
              default:
                break
            }
          }
        })
        break
      }
      default:
        break
    }
    return status
  }

  judgeStatus(index, view, mode, status, currentDate, selectedDate) {
    let untouch = status[0]
    let active = status[1]
    let inRange = status[2]
    untouch = !this.isSelectable(
      view,
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    )

    switch (mode) {
      case 'single':
        active = this.setPoint(
          '=',
          active,
          Date.parse(currentDate),
          Date.parse(selectedDate[index])
        )
        break
      case 'range':
        active = this.setPoint(
          '=',
          active,
          Date.parse(currentDate),
          Date.parse(selectedDate[index])
        )
        inRange = this.setSection(
          inRange,
          currentDate,
          selectedDate[0],
          selectedDate[1]
        )
        if (index === 0) {
          untouch = this.setPoint(
            '>',
            untouch,
            Date.parse(currentDate),
            Date.parse(selectedDate[1])
          )
        } else if (index === 1) {
          untouch = this.setPoint(
            '<',
            untouch,
            Date.parse(currentDate),
            Date.parse(selectedDate[0])
          )
        }
        break
      case 'multiple':
        for (let i = 0; i < this.privateDate.selectedDate.length; i++) {
          if (Date.parse(currentDate) === selectedDate[i]) {
            active = true
          }
        }
        break
      default:
        break
    }
    status = [untouch, active, inRange]
    return status
  }

  setPoint(type, status, currentDate, selectedDate) {
    let privateStatus = status

    switch (type) {
      case '=':
        if (currentDate === selectedDate) {
          privateStatus = true
        }
        break
      case '<':
        if (currentDate < selectedDate) {
          privateStatus = true
        }
        break
      case '>':
        if (currentDate > selectedDate) {
          privateStatus = true
        }
        break
      default:
        break
    }
    return privateStatus
  }

  setSection(status, currentDate, startDate, endDate) {
    let privateStatus = status
    const privateCurrent = Date.parse(currentDate)
    const privateStart = Date.parse(startDate)
    const privateEnd = Date.parse(endDate)
    if (privateCurrent >= privateStart && privateCurrent <= privateEnd) {
      privateStatus = true
    }
    return privateStatus
  }
  /* eslint-disable */
  isSelectable(view, y, m, d) {
    let isSelectable = true
    const min = this.parseDate(this.options.min, this.format)
    const max = this.parseDate(this.options.max, this.format)
    const selectableDate = this.parseDateArr(
      this.options.selectableDate,
      this.format
    )
    const selectableYear = this.parseDateSection(this.options.selectableYear)
    const selectableMonth = this.parseDateSection(this.options.selectableMonth)
    const selectableDay = this.parseDateSection(this.options.selectableDay)
    const selectableDayOfWeek = this.parseDateSection(
      this.options.selectableDayOfWeek
    )
    let privateMinDate
    let privateMaxDate
    let privateCurr
    let privateIsDay
    switch (view) {
      case 'years':
        privateMinDate = new Date(y, 0, 1) // the first day in year
        privateMaxDate = new Date(y + 1, 0, 0) // the last day in year
        privateCurr = [privateMinDate, privateMaxDate]
        privateIsDay = false
        break
      case 'months':
        privateMinDate = new Date(y, m, 1) // the first day in month
        privateMaxDate = new Date(y, m + 1, 0) // the last day in month
        privateCurr = [privateMinDate, privateMaxDate]
        privateIsDay = false
        break
      case 'days':
        privateMinDate = new Date(y, m, d)
        privateMaxDate = new Date(y, m, d)
        privateCurr = new Date(y, m, d)
        privateIsDay = true
        break
      default:
        break
    }

    if (min && min > privateMaxDate) {
      isSelectable = false
    }
    if (max && max < privateMinDate) {
      isSelectable = false
    }

    if (isSelectable && selectableDate.length > 0) {
      isSelectable = this.judgeSections(
        'date',
        privateCurr,
        selectableDate,
        privateIsDay
      )
    }

    if (isSelectable && selectableYear.length > 0) {
      isSelectable = this.judgeSections('block', y, selectableYear)
    }

    if (view === 'months' || view === 'days') {
      if (isSelectable && selectableMonth.length > 0) {
        isSelectable = this.judgeSections('block', m, selectableMonth)
      }
    }

    if (view === 'days') {
      if (isSelectable && selectableDay.length > 0) {
        isSelectable = this.judgeSections('block', d, selectableDay)
      }

      if (isSelectable && selectableDayOfWeek.length > 0) {
        isSelectable = this.judgeSections(
          'dayOfWeek',
          new Date(y, m, d),
          selectableDayOfWeek
        )
      }
    }

    return isSelectable
  }
  /* eslint-enable */
  renderStatus(status, ...args) {
    const untouch = status[0]
    const active = status[1]
    const inRange = status[2]
    const rangeUntouch = status[3]
    let className = ''
    if (rangeUntouch === true) {
      className = ` ${this.classes.UNTOUCHABLE}`
    } else {
      if (untouch === true) {
        className = ` ${this.classes.UNTOUCHABLE}`
      }
      if (inRange === true) {
        className += ` ${this.classes.INRANGE}`
      }
    }
    if (active === true) {
      className += ` ${this.classes.ACTIVE}`

      if (this.options.mode === 'range') {
        switch (args[0]) {
          case 0:
            className += ` ${this.classes.STARTDAY}`
            break
          case 1:
            className += ` ${this.classes.ENDDAY}`
            break
          default:
            break
        }
      }
    }
    return className
  }

  changeView(type, index) {
    switch (type) {
      case 'caption':
        if (this.options.mode !== 'multiple') {
          if (this.views[index] === 'days') {
            this.views[index] = 'months'
          } else if (this.views[index] === 'months') {
            this.views[index] = 'years'
          }
        }
        break
      case 'content':
        if (this.views[index] === 'years') {
          this.views[index] = 'months'
        } else if (this.views[index] === 'months') {
          this.views[index] = 'days'
        }
        break
      case 'higher':
        if (this.options.mode !== 'multiple') {
          if (this.views[index] === 'days') {
            this.views[index] = 'months'
          } else if (this.views[index] === 'months') {
            this.views[index] = 'years'
          }
        }
        break
      case 'lower':
        if (this.options.mode !== 'multiple') {
          if (this.views[index] === 'years') {
            this.views[index] = 'months'
          } else if (this.views[index] === 'months') {
            this.views[index] = 'days'
          }
        }
        break
      default:
        break
    }
  }

  setDate(obj, YTD, date) {
    if (is.object(YTD)) {
      for (const key in YTD) {
        if ({}.hasOwnProperty.call(YTD, key)) {
          switch (key) {
            case 'day':
              obj.setDate(YTD[key])
              break
            case 'month':
              obj.setMonth(YTD[key])
              break
            case 'year':
              obj.setYear(YTD[key])
              break
            default:
              break
          }
        }
      }
    } else {
      switch (YTD) {
        case 'day':
          obj.setDate(date)
          break
        case 'month':
          obj.setMonth(date)
          break
        case 'year':
          obj.setYear(date)
          break
        default:
          break
      }
    }
  }

  formatDate(date, format) {
    date = new Date(date)
    const val = {
      d: date.getDate(),
      m: date.getMonth() + 1,
      yy: date
        .getFullYear()
        .toString()
        .substring(2),
      yyyy: date.getFullYear()
    }
    val.dd = (val.d < 10 ? '0' : '') + val.d
    val.mm = (val.m < 10 ? '0' : '') + val.m
    date = []
    for (let i = 0, length = format.parts.length; i < length; i++) {
      date.push(val[format.parts[i]])
    }
    return date.join(format.separator)
  }

  stringSeparate(str, separator) {
    const re = new RegExp(`[.\\${separator}\\s].*?`)
    const privateSeparator = str.match(re)
    const parts = str.split(privateSeparator)
    return parts
  }

  parseHtmlString(option, value) {
    const array = []
    const options = DEFAULTS
    if (is.object(options[option])) {
      const parts = this.stringSeparate(value, ',')
      let subParts
      for (let i = 0; i < parts.length; i++) {
        subParts = this.stringSeparate(parts[i], '>')
        if (subParts.length > 1) {
          subParts = {
            from: subParts[0],
            to: subParts[1]
          }
        } else {
          subParts = subParts[0]
        }
        array.push(subParts)
      }
      return array
    }
    return value
  }

  parseFormat(format) {
    const separator = format.match(/[./\-\s].*?/)
    const parts = format.split(/\W+/) || parts
    if (!parts || parts.length === 0) {
      throw new Error('Invalid date format.')
    }
    return {
      separator,
      parts
    }
  }

  parseDate(data, format) {
    if (data !== null) {
      const date = new Date()
      const day = date.getDate()
      switch (typeof data) {
        case 'string':
          if (data.length < 5) {
            date.setHours(0, 0, 0, 0)
            date.setDate(day + Number(data))
          } else {
            const parts = data.split(format.separator) || parts
            let val
            date.setHours(0, 0, 0, 0)
            if (parts.length === format.parts.length) {
              for (let i = 0, length = format.parts.length; i < length; i++) {
                val = parseInt(parts[i], 10) || 1
                if (val === '1') {
                  return null
                }
                switch (format.parts[i]) {
                  case 'dd':
                  case 'd':
                    date.setDate(val)
                    break
                  case 'mm':
                  case 'm':
                    date.setMonth(val - 1, 1)
                    break
                  case 'yy':
                    date.setFullYear(2000 + val)
                    break
                  case 'yyyy':
                    date.setFullYear(val)
                    break
                  default:
                    break
                }
              }
            }
          }
          break
        case 'number':
          date.setHours(0, 0, 0, 0)
          date.setDate(day + data)
          break
        default:
          break
      }
      return date
    }
    return null
  }

  parseDateArr(arr, format) {
    const array = []
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      if (is.string(arr[i])) {
        array[count++] = this.parseDate(arr[i], format)
      } else if (is.object(arr[i])) {
        const obj = arr[i]
        let from
        let to
        for (const key in obj) {
          if ({}.hasOwnProperty.call(obj, key)) {
            switch (key) {
              case 'from':
                from = obj[key]
                break
              case 'to':
                to = obj[key]
                break
              default:
                break
            }
          }
        }
        array[count++] = [
          this.parseDate(from, format),
          this.parseDate(to, format)
        ]
      }
    }
    return array
  }

  parseDateSection(arr) {
    const array = []
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      if (is.number(arr[i])) {
        array[count++] = arr[i]
      } else if (is.string(arr[i])) {
        array[count++] = Number(arr[i])
      } else if (is.object(arr[i])) {
        const obj = arr[i]
        let from
        let to
        for (const key in obj) {
          if ({}.hasOwnProperty.call(obj, key)) {
            switch (key) {
              case 'from':
                from = Number(obj[key])
                break
              case 'to':
                to = Number(obj[key])
                break
              default:
                break
            }
          }
        }
        array[count++] = [from, to]
      }
    }
    return array
  }

  updateDate(i) {
    if (this.is('disabled')) {
      return null
    }

    this.privateDate.currentDate[i].setDate(1)
    this.privateDate.currentDate[i].setHours(0, 0, 0, 0)

    this.privateDate.currentDay[i] = this.privateDate.currentDate[i].getDate()
    this.privateDate.currentMonth[i] = this.privateDate.currentDate[
      i
    ].getMonth()
    this.privateDate.currentYear[i] = this.privateDate.currentDate[
      i
    ].getFullYear()

    this.privateDate.currentMonthDate[i] = new Date(
      this.privateDate.currentYear[i],
      this.privateDate.currentMonth[i],
      1,
      0,
      0,
      0,
      0
    )
    this.privateDate.currentYearDate[i] = new Date(
      this.privateDate.currentYear[i],
      0,
      1,
      0,
      0,
      0,
      0
    )

    if (this.mode !== 'multiple') {
      this.privateDate.selectedDay[i] = this.privateDate.selectedDate[
        i
      ].getDate()
      this.privateDate.selectedMonth[i] = this.privateDate.selectedDate[
        i
      ].getMonth()
      this.privateDate.selectedYear[i] = this.privateDate.selectedDate[
        i
      ].getFullYear()

      this.privateDate.selectedMonthDate[i] = new Date(
        this.privateDate.selectedYear[i],
        this.privateDate.selectedMonth[i],
        1,
        0,
        0,
        0,
        0
      )
      this.privateDate.selectedYearDate[i] = new Date(
        this.privateDate.selectedYear[i],
        0,
        1,
        0,
        0,
        0,
        0
      )
    }
    return null
  }

  setupPopper() {
    if (this.options.displayMode === 'inline') {
      return false
    }

    const config = {
      placement: this.options.position,
      modifiers: { preventOverflow: { boundariesElement: 'viewport' } }
    }

    if (
      !this.options.constrainToScrollParent &&
      this.options.constrainToWindow
    ) {
      config.modifiers.preventOverflow.boundariesElement = 'window'
    }

    if (
      this.options.constrainToScrollParent &&
      !this.options.constrainToWindow
    ) {
      config.modifiers.preventOverflow.boundariesElement = 'scrollParent'
    }

    this.POPPER = new Popper(this.$element, this.$pickerWrap, config)

    this.enter('popper')

    return null
  }

  mobilePosition() {
    const calendarHeight = outerHeight(this.$picker)
    const calendarWidth = outerWidth(this.$picker)
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight

    const left = (winWidth - calendarWidth) / 2
    const top = (winHeight - calendarHeight) / 2

    setStyle({ left, top }, this.$picker)
  }

  toggle() {
    if (this.is('showed')) {
      this.enter('pickerHide')
      this.blur()
    } else {
      this.focus()
    }
  }

  focus() {
    if (this.options.displayMode === 'dropdown' && !this.is('showed')) {
      this.show()
    }
    if (this.hasKeyboard) {
      this.KEYBOARD.bind()
    }
  }

  blur() {
    if (this.options.displayMode === 'dropdown') {
      if (this.is('pickerHide')) {
        this.hide()
        this.leave('pickerHide')
      }
    }
    if (this.hasKeyboard) {
      this.KEYBOARD.unbind()
    }
  }
  /* eslint-disable */
  click(e) {
    const $target = e.target
    if (
      !this.$inputIcon.contains($target) &&
      !this.$picker.contains($target) &&
      !this.$element.contains($target) &&
      this.options.alwaysShow === false
    ) {
      if (this.isMobile) {
        this.mobileCancel(0)
      } else {
        this.hide()
      }
    } else if (
      !this.$element.contains($target) &&
      this.$picker.contains($target)
    ) {
      const privateTarget = closest('div', $target)
      const privateTargetSpan = closest('span', $target)
      const queryParent = curry((selector, target) =>
        parentWith(el => el.matches(selector), target)
      )
      const queryContent = queryParent(`.${this.classes.CONTENT}`)
      const indexOfParentElement = targetParent =>
        children(parent(targetParent)).indexOf(targetParent)
      const queryContentAndIndexOfParentElement = compose(
        indexOfParentElement,
        queryContent
      )
      if (queryParent(`.${this.classes.HEADER}`, privateTarget)) {
        const i = queryContentAndIndexOfParentElement(privateTarget)
        switch (privateTarget.className) {
          case this.classes.CAPTION:
            this.changeView('caption', i)
            this.manageViews(i)
            break
          case `${this.classes.PREV} icon-chevron-left`:
            this.prev(i)
            break
          case `${this.classes.NEXT} icon-chevron-right`:
            this.next(i)
            break
          default:
            break
        }
      }
      if (privateTargetSpan) {
        const j = queryContentAndIndexOfParentElement(privateTargetSpan)

        if (
          !hasClass(this.classes.OTHERMONTH, privateTargetSpan) &&
          !hasClass(this.classes.UNTOUCHABLE, privateTargetSpan) &&
          !queryParent(`.${this.classes.HEAD}`, privateTargetSpan)
        ) {
          this.changeValue(privateTargetSpan, j)
          this.changeView('content', j)
          this.updateDate(j)

          switch (this.mode) {
            case 'single':
              if (this.views[j] === 'days') {
                this.enter('selected')
              }
              this.manageViews(j)
              break
            case 'range':
              this.manageViews(0)
              this.manageViews(1)
              break
            case 'multiple':
              this.manageViews(j - 1)
              this.manageViews(j)
              this.manageViews(j + 1)
              break
            default:
              break
          }
          if (!this.isMobile) {
            this.setValue()
          }
        }
      }
      if (queryParent(`.${this.classes.BUTTONS}`, privateTarget)) {
        const k = queryContentAndIndexOfParentElement(privateTarget)
        const flag = privateTarget.className === this.classes.BUTTONSAVES
        if (flag) {
          this.mobileEnter(k)
        } else {
          this.mobileCancel(k)
        }
      }
      if (!this.isMobile) {
        if (
          this.is('selected') &&
          this.options.alwaysShow === false &&
          this.options.onceClick === true
        ) {
          this.hide()
        } else if (this.options.displayMode === 'dropdown') {
          this.$element.focus()
        }
      }
    }
    e.preventDefault()
  }
  /* eslint-enable */
  changeValue(target, i) {
    let newVal = ''
    let newDate = ''
    switch (this.views[i]) {
      case 'years':
        newVal = parseInt(target.textContent, 10)
        this.privateDate.currentDate[i].setYear(newVal)
        break
      case 'months':
        newVal = Number(target.getAttribute('class').match(/month-([0-9]+)/)[1])
        this.privateDate.currentDate[i].setMonth(newVal)
        break
      case 'days':
        newVal = parseInt(target.textContent, 10)
        newDate = new Date(
          this.privateDate.currentYear[i],
          this.privateDate.currentMonth[i],
          newVal,
          0,
          0,
          0,
          0
        )
        switch (this.options.mode) {
          case 'single':
          case 'range':
            this.privateDate.selectedDate[i] = newDate
            break
          case 'multiple': {
            const date = Date.parse(newDate)
            if (this.privateDate.selectedDate.indexOf(date) > -1) {
              this.privateDate.selectedDate.forEach((data, nr) => {
                if (data === date) {
                  this.privateDate.selectedDate.splice(nr, 1)
                }
              })
            } else if (
              this.privateDate.selectedDate.length < this.options.multipleSize
            ) {
              this.privateDate.selectedDate.push(date)
            }
            break
          }
          default:
            break
        }
        break
      default:
        break
    }
  }

  setValue(trigger = true) {
    if (this.is('disabled')) {
      return null
    }
    switch (this.mode) {
      case 'single': {
        const formated = this.formatDate(
          this.privateDate.selectedDate[0],
          this.outputFormat
        )
        this.$element.value = formated
        if (this.isMobile) {
          this.$mobileTrigger.innerHTML = formated
        }
        break
      }
      case 'range': {
        const formatedStart = this.formatDate(
          this.privateDate.selectedDate[0],
          this.outputFormat
        )
        const formatedEnd = this.formatDate(
          this.privateDate.selectedDate[1],
          this.outputFormat
        )
        this.$element.value = `${formatedStart} ${
          this.options.rangeSeparator
        } ${formatedEnd}`

        if (this.isMobile) {
          this.$mobileTrigger.innerHTML = `${formatedStart} ${
            this.options.rangeSeparator
          } ${formatedEnd}`
        }
        break
      }
      case 'multiple': {
        let val = ''
        let privateFormated
        for (let j = 0; j < this.privateDate.selectedDate.length; j++) {
          privateFormated = this.formatDate(
            this.privateDate.selectedDate[j],
            this.outputFormat
          )
          if (val.length === 0) {
            val += privateFormated
          } else {
            val += this.options.multipleSeparator + privateFormated
          }
        }
        this.$element.value = val
        if (this.isMobile) {
          this.$mobileTrigger.innerHTML = val
        }
        break
      }
      default:
        break
    }

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.getDate('yyyy-mm-dd'))
    }

    this.oldValue = this.$element.value
    return null
  }

  prevent(e) {
    if (e.preventDefault) {
      e.preventDefault()
    } else {
      e.returnvalue = false
    }
  }

  unbind() {
    if (this.options.displayMode === 'inline') {
      removeEvent('click.picke', this.$picker)
    } else {
      removeEvent(this.eventNameWithId('click'), $doc)
    }

    removeEvent('focus', this.$element)
    removeEvent('blur', this.$element)
  }

  prev(i, isTurning) {
    this.touchflag = false
    const date = this.privateDate.currentDate[i]
    switch (this.views[i]) {
      case 'days': {
        let prevMonthDays
        if (this.mode === 'multiple') {
          if (isTurning) {
            if (this.focused === 0) {
              for (let j = 0; j < this.calendarsNum; j++) {
                this.privateDate.currentDate[j].setMonth(
                  this.privateDate.currentMonth[j] - 1
                )
                this.updateDate(j)
                this.manageViews(j)
              }
            } else {
              --this.focused
              this.manageViews(i)
              this.manageViews(i - 1)
            }
          } else {
            prevMonthDays = new Date(
              date.getFullYear(),
              date.getMonth(),
              0
            ).getDate()
            if (this.privateDate.focusDate.getDate() > prevMonthDays) {
              this.privateDate.focusDate.setDate(prevMonthDays)
            }
            this.privateDate.focusDate.setMonth(
              this.privateDate.focusDate.getMonth() - 1
            )
            for (let k = 0; k < this.calendarsNum; k++) {
              this.privateDate.currentDate[k].setMonth(
                this.privateDate.currentMonth[k] - 1
              )
              this.updateDate(k)
              this.manageViews(k)
            }
          }
        } else {
          date.setMonth(this.privateDate.currentMonth[i] - 1)
          if (this.hasKeyboard) {
            prevMonthDays = new Date(
              date.getFullYear(),
              date.getMonth(),
              0
            ).getDate()
            if (this.privateDate.focusDate[i].getDate() > prevMonthDays) {
              this.privateDate.focusDate[i].setDate(prevMonthDays)
            }
            this.privateDate.focusDate[i] = new Date(
              date.getFullYear(),
              date.getMonth(),
              this.privateDate.focusDate[i].getDate(),
              0,
              0,
              0,
              0
            )
          }
        }
        break
      }
      case 'months':
        date.setYear(this.privateDate.currentYear[i] - 1)
        if (this.hasKeyboard) {
          this.privateDate.focusDate[i] = new Date(
            date.getFullYear(),
            this.privateDate.focusDate[i].getMonth(),
            this.privateDate.focusDate[i].getDate(),
            0,
            0,
            0,
            0
          )
        }
        break
      case 'years':
        date.setYear(this.privateDate.currentYear[i] - 10)
        if (this.hasKeyboard && isTurning) {
          this.privateDate.focusDate[i] = new Date(
            this.privateDate.focusDate[i].getFullYear() - 10,
            this.privateDate.focusDate[i].getMonth(),
            this.privateDate.focusDate[i].getDate(),
            0,
            0,
            0,
            0
          )
        }
        break
      default:
        break
    }
    this.updateDate(i)
    this.manageViews(i)
  }

  next(i, isTurning) {
    this.touchflag = false
    const date = this.privateDate.currentDate[i]
    switch (this.views[i]) {
      case 'days': {
        let nextMonthDays
        if (this.mode === 'multiple') {
          if (isTurning) {
            if (this.focused === this.calendarsNum - 1) {
              for (let j = 0; j < this.calendarsNum; j++) {
                this.privateDate.currentDate[j].setMonth(
                  this.privateDate.currentMonth[j] + 1
                )
                this.updateDate(j)
                this.manageViews(j)
              }
            } else {
              ++this.focused
              this.manageViews(i)
              this.manageViews(i + 1)
            }
          } else {
            nextMonthDays = new Date(
              date.getFullYear(),
              date.getMonth() + 2,
              0
            ).getDate()
            if (this.privateDate.focusDate.getDate() > nextMonthDays) {
              this.privateDate.focusDate.setDate(nextMonthDays)
            }
            this.privateDate.focusDate.setMonth(
              this.privateDate.focusDate.getMonth() + 1
            )
            for (let k = 0; k < this.calendarsNum; k++) {
              this.privateDate.currentDate[k].setMonth(
                this.privateDate.currentMonth[k] + 1
              )
              this.updateDate(k)
              this.manageViews(k)
            }
          }
        } else {
          date.setMonth(this.privateDate.currentMonth[i] + 1)

          if (this.hasKeyboard) {
            nextMonthDays = new Date(
              date.getFullYear(),
              date.getMonth() + 1,
              0
            ).getDate()
            if (this.privateDate.focusDate[i].getDate() > nextMonthDays) {
              this.privateDate.focusDate[i].setDate(nextMonthDays)
            }
            this.privateDate.focusDate[i] = new Date(
              date.getFullYear(),
              date.getMonth(),
              this.privateDate.focusDate[i].getDate(),
              0,
              0,
              0,
              0
            )
          }
        }
        break
      }
      case 'months':
        date.setYear(this.privateDate.currentYear[i] + 1)
        if (this.hasKeyboard) {
          this.privateDate.focusDate[i] = new Date(
            date.getFullYear(),
            this.privateDate.focusDate[i].getMonth(),
            this.privateDate.focusDate[i].getDate(),
            0,
            0,
            0,
            0
          )
        }
        break
      case 'years':
        date.setYear(this.privateDate.currentYear[i] + 10)
        if (this.hasKeyboard && isTurning) {
          this.privateDate.focusDate[i] = new Date(
            this.privateDate.focusDate[i].getFullYear() + 10,
            this.privateDate.focusDate[i].getMonth(),
            this.privateDate.focusDate[i].getDate(),
            0,
            0,
            0,
            0
          )
        }
        break
      default:
        break
    }
    this.updateDate(i)
    this.manageViews(i)
  }

  mobilePrev(index) {
    removeClass(this.classes.SHOW, this.$calendars[index])
    addClass(this.classes.SHOW, this.$calendars[index - 1])
  }

  mobileNext(index) {
    removeClass(this.classes.SHOW, this.$calendars[index])
    addClass(this.classes.SHOW, this.$calendars[index + 1])
  }

  mobileInteDate(index) {
    if (this.mode === 'multiple') {
      if (this.privateDate.selectedDate.length > 0) {
        this.privateDate.currentDate[0] = new Date(
          this.privateDate.selectedDate[0]
        )
      }
    } else {
      this.privateDate.currentDate[index] = new Date(
        this.privateDate.selectedDate[index]
      )
    }

    this.views[index] = 'days'
    this.updateDate(index)
  }

  mobileEnter(index) {
    if (this.mode === 'range' && index === 0) {
      this.mobileNext(index)
      this.views[index] = 'days'
    } else {
      this.mobileInteDate(index)
      this.setValue()
      this.hide()
    }
    this.manageViews(index)
  }

  mobileCancel(index) {
    if (index === 1) {
      this.mobilePrev(index)
      this.views[index] = 'days'
    } else {
      this.dateTransform(this.privateDate.cache, this.privateDate)
      this.mobileInteDate(index)
      this.hide()
    }
    this.manageViews(index)
  }

  dateTransform(fromDate, toDate) {
    toDate.currentDate = []
    toDate.selectedDate = []
    fromDate.currentDate.forEach((v, n) => {
      toDate.currentDate[n] = new Date(v)
    })

    fromDate.selectedDate.forEach((v, n) => {
      const date = new Date(v)
      toDate.selectedDate[n] =
        this.mode === 'multiple' ? Date.parse(date) : date
    })
  }

  show() {
    if (this.is('disabled')) {
      return null
    }

    if (this.isMobile) {
      this.dateTransform(this.privateDate, this.privateDate.cache)
    }
    if (this.options.displayMode === 'inline') {
      this.trigger(EVENTS.BEFORESHOW)
      compose(
        bindEvent({
          type: this.eventNameWithId('mouseDown'),
          handler: e => {
            this.prevent(e)
          }
        }),
        bindEvent({
          type: this.eventNameWithId('click'),
          handler: e => {
            this.click(e)
          }
        })
      )(this.$picker)
    } else if (!this.is('showed')) {
      this.trigger(EVENTS.BEFORESHOW)
      addClass(this.classes.ACTIVE, this.$inputWrap)
      // removeClass(this.namespace + '_hide', this.$picker);
      addClass(this.classes.SHOW, this.$pickerWrap)

      if (this.isMobile) {
        addClass(this.classes.SHOW, this.$calendars[0])
        if (this.mode === 'range') {
          removeClass(this.classes.SHOW, this.$calendars[1])
        }

        setStyle({ overflow: 'hidden' }, append(this.$cover, query('body')))
        // Prevent horizontal scroll for ios
        // $doc.on(this.eventNameWithId('scrollstart'), (e) => {
        //   e.preventDefault()
        // })

        this.picker.on('tap', e => {
          this.click(e)
        })
        // $doc.on(this.eventNameWithId('touchend'), (e) => {
        //   this.click(e)
        //   // e.stopPropagation()
        // })
        const handle = e => {
          const startX = e.swipestart.coords[0]
          const stopX = e.swipestop.coords[0]

          if (stopX > startX) {
            this.prev(0)
          } else if (stopX < startX) {
            this.next(0)
          }

          // this.picker.one('swipe', handle)
        }

        this.picker.on('swipe', handle)
      } else {
        bindEvent(
          {
            type: this.eventNameWithId('click'),
            handler: e => {
              this.click(e)
            }
          },
          $doc
        )
      }

      if (this.is('popper')) {
        this.POPPER.enableEventListeners()
        this.POPPER.scheduleUpdate()
      } else {
        this.mobilePosition()
      }

      // this.position();
      this.enter('showed')
      bindEvent(
        {
          type: this.eventNameWithId('resize'),
          handler: () => {
            // self.position();
            if (this.is('popper')) {
              this.POPPER.enableEventListeners()
            } else {
              this.mobilePosition()
            }
          }
        },
        window
      )
      // this.$element.focus();
      bindEvent(
        {
          type: this.eventNameWithId('mousedown'),
          handler: e => {
            this.prevent(e)
          }
        },
        this.$picker
      )
    }
    this.trigger(EVENTS.SHOW)
    return this
  }

  hide() {
    if (this.is('disabled')) {
      return null
    }
    if (this.is('showed')) {
      this.trigger(EVENTS.BEFOREHIDE)
      this.leave('selected')
      removeClass(this.classes.ACTIVE, this.$inputWrap)
      removeClass(this.classes.SHOW, this.$pickerWrap)
      this.leave('showed')
      removeEvent(this.eventNameWithId('mousedown'), this.$picker)
      removeEvent(this.eventNameWithId('click'), $doc)
      removeEvent(this.eventNameWithId('resize'), window)
      if (this.isMobile) {
        setStyle({ overflow: 'auto' }, query('body'))
        this.$cover.remove()
        this.picker.off('tap')
        removeEvent(this.eventNameWithId('click scrollstart swipe'), $doc)
      }

      this.$element.blur()
      this.trigger(EVENTS.HIDE)
      if (this.is('popper')) {
        this.POPPER.disableEventListeners()
      }
    }
    return this
  }

  getWrap() {
    if (this.is('disabled')) {
      return null
    }
    return this.$picker
  }

  getInput() {
    if (this.is('disabled')) {
      return undefined  /* eslint-disable-line */
    }
    return this.$element
  }

  getDate(format) {
    if (this.is('disabled')) {
      return null
    }
    if (typeof format === 'undefined') {
      return this.privateDate.selectedDate
    }
    const privateFormat = this.parseFormat(format)
    const formated = []
    for (let i = 0; i < this.privateDate.selectedDate.length; i++) {
      formated[i] = this.formatDate(
        this.privateDate.selectedDate[i],
        privateFormat
      )
    }
    return formated
  }

  multipleClear() {
    if (this.is('disabled')) {
      return null
    }
    this.privateDate.selectedDate = []
    for (let i = 0; i < this.calendarsNum; i++) {
      this.manageViews(i)
    }
    this.setValue()
    return undefined    /* eslint-disable-line */
  }

  enable() {
    if (this.is('disabled')) {
      this.$element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.$element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$element)
      }
      unwrap(this.$element)
      this.$picker.remove()
      this.$pickerWrap.remove()
      this.$inputIcon.remove()

      this.POPPER.destroy()
      this.$element.className = this.firstClassName
      this.$element.value = ''
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  update(_options) {
    if (this.is('disabled')) {
      return null
    }
    if (!is.undefined(_options)) {
      for (const m in _options) {
        if ({}.hasOwnProperty.call(_options, m)) {
          this.options[m] = _options[m]
        }
      }
    }
    this.unbind()
    this.$picker.remove()
    this.initStates()
    this.initialize()
    return undefined    /* eslint-disable-line */
  }

  reset(_options) {
    if (this.is('disabled')) {
      return null
    }
    for (const m in this.defaultOptions) {
      if ({}.hasOwnProperty.call(this.defaultOptions, m)) {
        this.options[m] = this.defaultOptions[m]
      }
    }
    if (!is.undefined(_options)) {
      for (const n in _options) {
        if ({}.hasOwnProperty.call(_options, n)) {
          this.options[n] = _options[n]
        }
      }
    }
    this.unbind()
    this.$picker.remove()
    this.initStates()
    this.initialize()
    return undefined  /* eslint-disable-line */
  }

  set(value) {
    if (is.undefined(value)) {
      return
    }

    const selectedDate = this.parseDate(value, this.format)

    this.privateDate.focusDate = [new Date(selectedDate)]
    this.privateDate.currentDate = [new Date(selectedDate)]
    this.privateDate.selectedDate = [new Date(selectedDate)]

    this.updateDate(0)
    this.setValue()

    for (let i = 0; i < this.views.length; i++) {
      this.views[i] = 'days'
      this.generateDaypicker(i)
    }
  }

  get() {
    return this.privateDate.selectedDate
  }

  val(value) {
    if (is.undefined(value)) {
      return this.get()
    }

    return this.set(value)
  }
}

export default DatePicker
