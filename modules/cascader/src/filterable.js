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
          this.filter(instance.$label.value)
          if (!this.$result) {
            this.$result = parseHTML(
              instance.menuTemplate({
                classes: this.instance.classes,
                level: 0
              })
            )

            DROPDOWN.$dropdown.appendChild(this.$result)
          }
          children(this.$result).map(item => item.remove())
          this.filterArr.forEach(option => {
            this.$resultOption = parseHTML(
              instance.optionTemplate({
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
        console.log(dataLabel)
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
        this.childArr = [].concat(this.filterValue)
        this.filterItem.label = `${label} / ${item.label}`
        this.filterValue.push(item.value)
        this.childArr.push(item.value)
        this.hasChild(item, this.filterValue)
      })
    } else {
      console.log(this.childArr)
      this.filterItem.value = [].concat(this.childArr)
      this.filterArr.push(this.filterItem)
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
      this.filterValue = []
      if (filter(option, search)) {
        this.filterValue.push(option.value)
        this.filterItem.label = option.label
        this.hasChild(option, this.filterItem.label)
        found++
      } else if (option.children) {
        option.children.forEach(item => {
          this.filterItem.label = `${option.label} / ${item.label}`
          if (filter(item, search)) {
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
      console.log(this.filterArr)
      this.hideNotFound()
    } else {
      this.showNotFound()
    }
  }
}
