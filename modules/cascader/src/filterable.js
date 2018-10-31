import { replace, parseHTML, append, detach, children } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { isNull, isArray } from '@pluginjs/is'
import { events as EVENTS } from './constant'

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
        addClass('pj-cascader-input', instance.$wrap)
        if (!value) {
          this.showNotFound()
        } else {
          this.buildRsult()
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
      instance.selfEventName(EVENTS.SHOW),
      () => {
        const dataLabel = this.instance.value[0]
        if (isArray(dataLabel)) {
          this.instance.set(this.instance.value[0])
        } else {
          this.instance.set(this.instance.value)
        }
      },
      instance.element
    )

    bindEvent(
      instance.selfEventName(EVENTS.HIDE),
      () => {
        this.hideNotFound()
        removeClass('pj-cascader-input', instance.$wrap)
        this.instance.filter = false
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
    addClass('pj-cascader-notfound', this.instance.$dropdown)
    this.notfound = true
  }

  hideNotFound() {
    if (!this.notfound) {
      return
    }

    if (this.$notFound) {
      detach(this.$notFound)
    }
    removeClass('pj-cascader-notfound', this.instance.$dropdown)
    this.notfound = false
  }

  buildRsult() {
    this.filter(this.instance.$label.value)
    if (!this.$result) {
      this.$result = parseHTML(
        this.instance.menuTemplate({
          classes: this.instance.classes,
          level: 0
        })
      )

      this.instance.DROPDOWN.$dropdown.appendChild(this.$result)
    }
    children(this.$result).map(item => item.remove())
    this.filterArr.forEach(option => {
      this.$resultOption = parseHTML(
        this.instance.optionTemplate({
          classes: this.instance.classes,
          option
        })
      )
      this.$resultOption.__option = option

      option.__dom = this.$resultOption
      this.$result.appendChild(this.$resultOption)
      addClass('pj-cascader-result', this.$result)
    })
  }

  hasChild(option, label) {
    if (option.children) {
      option.children.forEach(item => {
        this.childArr = [].concat(this.filterValue)
        this.filterItem.label = `${label} / ${item.label}`
        this.childArr.push(item.value)
        this.hasChild(item, this.filterValue)
      })
    } else {
      this.filterItem.value = this.childArr
      this.filterArr.push(this.filterItem)
      this.childArr = []
      this.filterItem = {}
      return
    }
  }

  filter(search) {
    const { filter } = this.instance.options
    let found = 0
    this.filterArr = []
    this.instance.data.forEach(option => {
      this.filterItem = {}
      this.filterValue = [option.value]
      if (filter(option, search)) {
        this.filterItem.label = option.label
        this.hasChild(option, this.filterItem.label)
        found++
      } else if (option.children) {
        option.children.forEach(item => {
          this.filterItem.label = `${option.label} / ${item.label}`
          this.childArr = [].concat(this.filterValue)
          if (filter(item, search)) {
            this.childArr.push(item.value)
            this.hasChild(item, this.filterItem.label)
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
      console.log(this.filterItem)
      this.hideNotFound()
    } else {
      this.showNotFound()
    }
  }
}
