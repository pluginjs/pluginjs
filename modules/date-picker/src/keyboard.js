import keyboard from '@pluginjs/keyboard'
import { hasClass } from '@pluginjs/classes'
import { query } from '@pluginjs/dom'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.KEYBOARD = keyboard()
    this.KEYBOARD.filter = function() {
      return true
    }
  }

  bind() {
    this.KEYBOARD.down('enter', () => {
      this.enter()
      return false
    })

    this.KEYBOARD.down('esc', () => {
      this.esc()
      return false
    })

    this.KEYBOARD.down('up', () => {
      this.upLine()
      return false
    })

    this.KEYBOARD.down('down', () => {
      this.downLine()
      return false
    })

    this.KEYBOARD.down('left', () => {
      this.prevDate()
      return false
    })

    this.KEYBOARD.down('right', () => {
      this.nextDate()
      return false
    })
    this.KEYBOARD.down('ctrl+up', () => {
      this.higherView()
      return false
    })
    this.KEYBOARD.down('ctrl+left', () => {
      this.prevPage()

      return false
    })
    this.KEYBOARD.down('ctrl+right', () => {
      this.nextPage()
      return false
    })
    this.KEYBOARD.down('alt+left', () => {
      this.prevCalendar()
      return false
    })
    this.KEYBOARD.down('alt+right', () => {
      this.nextCalendar()
      return false
    })
  }

  prevDate() {
    const i = this.instance.focused
    const date =
      this.instance.mode === 'multiple'
        ? this.instance.privateDate.focusDate
        : this.instance.privateDate.focusDate[i]
    const hasLocked =
      this.instance.mode === 'multiple'
        ? false
        : hasClass(
            this.instance.classes.BLOCKED,
            this.instance.$calendarPrevs[this.instance.focused]
          )

    switch (this.instance.views[i]) {
      case 'days':
        if (
          Date.parse(date) ===
          Date.parse(this.instance.privateDate.currentDate[i])
        ) {
          if (!hasLocked) {
            date.setDate(date.getDate() - 1)
            this.instance.prev(i, true)
          }
        } else {
          date.setDate(date.getDate() - 1)
          this.instance.manageViews(i)
        }
        break
      case 'months':
        if (date.getMonth() === 0) {
          if (!hasLocked) {
            date.setMonth(date.getMonth() - 1)
            this.instance.prev(i)
          }
        } else {
          date.setMonth(date.getMonth() - 1)
          this.instance.manageViews(i)
        }
        break
      case 'years':
        if (
          date.getFullYear() ===
          this.instance.privateDate.currentYear[i] - 7
        ) {
          if (!hasLocked) {
            date.setFullYear(date.getFullYear() - 1)
            this.instance.prev(i)
          }
        } else {
          date.setFullYear(date.getFullYear() - 1)
          this.instance.manageViews(i)
        }
        break
      default:
        break
    }
  }

  nextDate() {
    const i = this.instance.focused
    const date =
      this.instance.mode === 'multiple'
        ? this.instance.privateDate.focusDate
        : this.instance.privateDate.focusDate[i]
    const hasLocked =
      this.instance.mode === 'multiple'
        ? false
        : hasClass(
            this.instance.classes.BLOCKED,
            this.instance.$calendarNexts[this.instance.focused]
          )
    switch (this.instance.views[i]) {
      case 'days':
        if (
          Date.parse(date) ===
          Date.parse(
            new Date(
              this.instance.privateDate.currentYear[i],
              this.instance.privateDate.currentMonth[i] + 1,
              0
            )
          )
        ) {
          if (!hasLocked) {
            date.setDate(date.getDate() + 1)
            this.instance.next(i, true)
          }
        } else {
          date.setDate(date.getDate() + 1)
          this.instance.manageViews(i)
        }
        break
      case 'months':
        if (date.getMonth() === 11) {
          if (!hasLocked) {
            date.setMonth(date.getMonth() + 1)
            this.instance.next(i)
          }
        } else {
          date.setMonth(date.getMonth() + 1)
          this.instance.manageViews(i)
        }
        break
      case 'years':
        if (
          date.getFullYear() ===
          this.instance.privateDate.currentYear[i] + 4
        ) {
          if (!hasLocked) {
            date.setFullYear(date.getFullYear() + 1)
            this.instance.next(i)
          }
        } else {
          date.setFullYear(date.getFullYear() + 1)
          this.instance.manageViews(i)
        }
        break
      default:
        break
    }
  }

  upLine() {
    const i = this.instance.focused
    const date =
      this.instance.mode === 'multiple'
        ? this.instance.privateDate.focusDate
        : this.instance.privateDate.focusDate[i]
    const hasLocked =
      this.instance.mode === 'multiple'
        ? false
        : hasClass(
            this.instance.classes.BLOCKED,
            this.instance.$calendarPrevs[this.instance.focused]
          )
    switch (this.instance.views[i]) {
      case 'days':
        if (
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - 7
          ).setDate(1) ===
          new Date(this.instance.privateDate.currentDate[i]).setMonth(
            this.instance.privateDate.currentMonth[i] - 1
          )
        ) {
          if (!hasLocked) {
            date.setDate(date.getDate() - 7)
            this.instance.prev(i, true)
          }
        } else {
          date.setDate(date.getDate() - 7)
          this.instance.manageViews(i)
        }
        break
      case 'months':
        if (
          date.getMonth() === 0 ||
          date.getMonth() === 1 ||
          date.getMonth() === 2
        ) {
          if (!hasLocked) {
            date.setMonth(date.getMonth() - 3)
            this.instance.prev(i)
          }
        } else {
          date.setMonth(date.getMonth() - 3)
          this.instance.manageViews(i)
        }
        break
      case 'years':
        if (date.getFullYear() < this.instance.privateDate.currentYear[i] - 4) {
          if (!hasLocked) {
            date.setFullYear(date.getFullYear() - 3)
            this.instance.prev(i)
          }
        } else {
          date.setFullYear(date.getFullYear() - 3)
          this.instance.manageViews(i)
        }
        break
      default:
        break
    }
  }

  downLine() {
    const i = this.instance.focused
    const date =
      this.instance.mode === 'multiple'
        ? this.instance.privateDate.focusDate
        : this.instance.privateDate.focusDate[i]
    const hasLocked =
      this.instance.mode === 'multiple'
        ? false
        : hasClass(
            this.instance.classes.BLOCKED,
            this.instance.$calendarNexts[this.instance.focused]
          )
    switch (this.instance.views[i]) {
      case 'days':
        if (
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 7
          ).setDate(1) ===
          new Date(this.instance.privateDate.currentDate[i]).setMonth(
            this.instance.privateDate.currentMonth[i] + 1
          )
        ) {
          if (!hasLocked) {
            date.setDate(date.getDate() + 7)
            this.instance.next(i, true)
          }
        } else {
          date.setDate(date.getDate() + 7)
          this.instance.manageViews(i)
        }
        break
      case 'months':
        if (
          date.getMonth() === 9 ||
          date.getMonth() === 10 ||
          date.getMonth() === 11
        ) {
          if (!hasLocked) {
            date.setMonth(date.getMonth() + 3)
            this.instance.next(i)
          }
        } else {
          date.setMonth(date.getMonth() + 3)
          this.instance.manageViews(i)
        }
        break
      case 'years':
        if (date.getFullYear() > this.instance.privateDate.currentYear[i] + 1) {
          if (!hasLocked) {
            date.setFullYear(date.getFullYear() + 3)
            this.instance.next(i)
          }
        } else {
          date.setFullYear(date.getFullYear() + 3)
          this.instance.manageViews(i)
        }
        break
      default:
        break
    }
  }
  prevPage() {
    if (this.instance.mode === 'multiple') {
      this.instance.prev(this.instance.focused)
    } else if (
      !this.instance.$calendarPrevs[this.instance.focused].hasClass(
        this.instance.classes.BLOCKED
      )
    ) {
      this.instance.prev(this.instance.focused, true)
    }
  }
  nextPage() {
    if (this.instance.mode === 'multiple') {
      this.instance.next(this.instance.focused)
    } else if (
      !hasClass(
        this.instance.classes.BLOCKED,
        this.instance.calendarNexts[this.instance.focused]
      )
    ) {
      this.instance.next(this.instance.focused, true)
    }
  }
  higherView() {
    if (this.instance.mode !== 'multiple') {
      const i = this.instance.focused
      this.instance.changeView('higher', i)
      this.instance.manageViews(i)
    }
  }
  prevCalendar() {
    if (this.instance.mode !== 'multiple') {
      const len = this.instance.$calendars.length
      if (--this.instance.focused < 0) {
        this.instance.focused = len
      }
    }
  }
  nextCalendar() {
    if (this.instance.mode !== 'multiple') {
      const len = this.instance.$calendars.length
      if (++this.instance.focused >= len) {
        this.instance.focused = 0
      }
    }
  }
  updateValue(instance) {
    const i = instance.focused
    const date =
      instance.mode === 'multiple'
        ? instance.privateDate.focusDate
        : instance.privateDate.focusDate[i]
    if (
      !hasClass(
        instance.classes.UNTOUCHABLE,
        query(`.${instance.classes.FOCUS}`, instance.$calendars[i])
      )
    ) {
      switch (instance.views[i]) {
        case 'days':
          switch (instance.options.mode) {
            case 'single':
            case 'range':
              instance.privateDate.selectedDate[i] = new Date(date)
              break
            case 'multiple': {
              const privateDate = Date.parse(new Date(date))
              if (
                $.inArray(privateDate, instance.privateDate.selectedDate) > -1 /* eslint-disable-line */
              ) {
                $.each(instance.privateDate.selectedDate, (nr, data) => { /* eslint-disable-line */
                  if (data === privateDate) {
                    instance.privateDate.selectedDate.splice(nr, 1)
                    return false
                  }
                  return undefined
                })
              } else {
                instance.privateDate.selectedDate.push(privateDate)
              }
              break
            }
            default:
              break
          }
          break
        case 'months':
          instance.privateDate.currentDate[i].setMonth(date.getMonth())
          instance.views[i] = 'days'
          break
        case 'years':
          instance.privateDate.currentDate[i].setFullYear(date.getFullYear())
          instance.views[i] = 'months'
          break
        default:
          break
      }
      instance.updateDate(i)
      if (instance.mode === 'range') {
        instance.manageViews(0)
        instance.manageViews(1)
      } else if (instance.mode === 'multiple') {
        instance.manageViews(i - 1)
        instance.manageViews(i)
        instance.manageViews(i + 1)
      } else {
        instance.manageViews(i)
      }
      instance.setValue()
    }
  }
  enter() {
    const inputValue = this.instance.element.value
    let judge
    if (
      inputValue === this.instance.oldValue ||
      this.instance.oldValue === ''
    ) {
      this.updateValue(this.instance)
    } else {
      let parts
      switch (this.instance.mode) {
        case 'single': {
          const privateDate = Date.parse(inputValue)
          if (privateDate) {
            this.instance.privateDate.selectedDate[0] = new Date(privateDate)
            this.instance.privateDate.currentDate[0] = new Date(
              this.instance.privateDate.selectedDate[0]
            )
            this.instance.updateDate(0)
            this.instance.manageViews(0)
          }
          break
        }
        case 'range': {
          parts = this.instance.stringSeparate(
            inputValue,
            this.options.rangeSeparator
          )
          const from = Date.parse(parts[0])
          const to = Date.parse(parts[1])
          if (parts.length === 2) {
            judge = true
            if (from && to) {
              if (from > to) {
                judge = false
              }
            } else {
              judge = false
            }
          } else {
            judge = false
          }

          if (judge === true) {
            this.instance.privateDate.selectedDate[0] = new Date(from)
            this.instance.privateDate.selectedDate[1] = new Date(to)
            for (let i = 0; i < 2; i++) {
              this.instance.privateDate.currentDate[i] = new Date(
                this.instance.privateDate.selectedDate[i]
              )
              this.instance.updateDate(i)
              this.instance.manageViews(i)
            }
          } else {
            this.updateValue(this)
          }
          break
        }
        case 'multiple': {
          parts = this.instance.stringSeparate(
            inputValue,
            this.options.multipleSeparator
          )
          const privateParts = []
          judge = true
          for (let j = 0; j < parts.length; j++) {
            privateParts.push(Date.parse(parts[j]))
            if (!Date.parse(parts[j])) {
              judge = false
            }
          }
          if (judge === true) {
            this.instance.privateDate.selectedDate = []
            for (let k = 0; k < privateParts.length; k++) {
              if (
                this.instance.privateDate.selectedDate.indexOf(
                  privateParts[k]
                ) > -1
              ) {
                this.instance.privateDate.selectedDate.forEach((data, nr) => {
                  if (data === privateParts[k]) {
                    this.instance.privateDate.selectedDate.splice(nr, 1)
                  }
                })
              } else {
                this.instance.privateDate.selectedDate.push(privateParts[k])
              }
            }
            for (let m = 0; m < this.calendarsNum; m++) {
              this.instance.updateDate(m)
              this.instance.manageViews(m)
            }
          } else {
            this.updateValue(this)
          }
          break
        }
        default:
          break
      }
    }
    this.instance.setValue()
  }
  esc() {
    this.instance.element.blur()
    this.instance.hide()
  }

  unbind() {
    this.KEYBOARD.down('up')
    this.KEYBOARD.down('down')
    this.KEYBOARD.down('left')
    this.KEYBOARD.down('right')
    this.KEYBOARD.down('ctrl+up')
    this.KEYBOARD.down('ctrl+left')
    this.KEYBOARD.down('ctrl+right')
    this.KEYBOARD.down('alt+left')
    this.KEYBOARD.down('alt+right')
    this.KEYBOARD.down('enter')
    this.KEYBOARD.down('esc')
  }
}
export default Keyboard
