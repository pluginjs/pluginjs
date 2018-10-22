import { replace, parseHTML, append, detach, children } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'
import { isNull } from '@pluginjs/is'
import { events as EVENTS } from './constant'
import { setStyle } from '@pluginjs/styled'

export default class Filterable {
  constructor(instance) {
    this.instance = instance
    instance.$label = replace(
      `<input type="text" autocomplete="off" spellcheck="false" placeholder="${
        instance.placeholder
      }" class="${instance.classes.FILTER} ${instance.classes.LABEL}">`,
      instance.$label
    )
    addClass(instance.classes.FILTERABLE, instance.$wrap)
    bindEvent(
      instance.eventName('input'),
      () => {
        const value = instance.$label.value
        const DROPDOWN = instance.DROPDOWN
        setStyle('display', 'none', DROPDOWN.$dropdown.firstChild)

        if (!value) {
          this.refreshDefault()
        } else {
          this.filter(instance.$label.value)
        }

        if (isNull(DROPDOWN.getHighlightedItem())) {
          DROPDOWN.highlightItem(DROPDOWN.getHighlightableItem())
        }
        if (!DROPDOWN.is('shown')) {
          DROPDOWN.show()
        } else {
          DROPDOWN.update()
        }
        this.instance.filter = true
        instance.trigger(EVENTS.FILTER, value)
      },
      instance.$label
    )

    bindEvent(
      instance.selfEventName(EVENTS.HIDE),
      () => {
        this.refreshDefault()
        this.hideNotFound()
        this.instance.filter = false
      },
      instance.element
    )

    bindEvent(
      instance.selfEventName(EVENTS.SHOW),
      () => {
        if (instance.$label.value) {
          // if (isArray(this.instance.value)) {
          //   this.instance.set(this.instance.value)
          // } else {
          this.instance.set(this.instance.value[0].split(','))
          // }
        }
      },
      instance.element
    )

    bindEvent(
      instance.selfEventName(EVENTS.HIDED),
      () => {
        if (!this.$selected) {
          return
        }
        const option = instance.getOptionByValue(instance.value)

        if (option) {
          const label = instance.getOptionLabel(option)
          if (instance.$label.value !== label) {
            instance.$label.value = label
          }
        } else {
          instance.$label.value = ''
        }
      },
      instance.element
    )
  }

  showNotFound() {
    if (this.notfound) {
      return
    }

    if (!this.$notFound) {
      this.$notFound = parseHTML(
        `<div class="${
          this.instance.classes.NOTFOUND
        }">${this.instance.translate('notFoundText')}</div>`
      )
    }
    append(this.$notFound, this.instance.$dropdown)

    this.notfound = true
  }

  hideNotFound() {
    if (!this.notfound) {
      return
    }

    if (this.$notFound) {
      detach(this.$notFound)
    }

    this.notfound = false
  }

  hasChild(option, label) {
    if (option.children) {
      option.children.forEach(item => {
        this.filterData.label = `${label} / ${item.label}`
        this.filterData.value = `${option.value},${item.value}`
        this.hasChild(item, this.filterData.label)
      })
    } else {
      this.filterArr.push(this.filterData)
      this.filterData = {}
      return
    }
  }

  filter(search) {
    const { filter } = this.instance.options
    let found = 0
    this.filterArr = []
    this.instance.data.forEach(option => {
      this.filterData = {}
      this.filterData.value = option.value
      this.filterData.label = option.label
      if (filter(option, search)) {
        this.hasChild(option, this.filterData.label)
        found++
      } else if (option.children) {
        option.children.forEach(item => {
          this.filterData.label = `${option.label} / ${item.label}`
          this.filterData.value = `${option.value},${item.value}`
          if (filter(item, search)) {
            this.hasChild(item, this.filterData.label)
            found++
          } else {
            this.showNotFound()
          }
        })
      } else {
        this.showNotFound()
      }
    })

    if (found) {
      this.hideNotFound()
      const menu = this.instance.buildMenu(this.filterArr, 0)
      this.instance.$dropdown.appendChild(menu)
    } else {
      setStyle('display', 'none', this.instance.DROPDOWN.$dropdown.firstChild)
      this.showNotFound()
    }
  }

  refreshDefault() {
    this.hideNotFound()

    children(this.instance.DROPDOWN.$dropdown).map(item => item.remove())
    const menu = this.instance.buildMenu(this.instance.data, 0)
    this.instance.$dropdown.appendChild(menu)
  }
}
