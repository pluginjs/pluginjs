import Component from '@pluginjs/component'
import { isArray, isFunction } from '@pluginjs/is'
import Dropdown from '@pluginjs/dropdown'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { deepMerge } from '@pluginjs/utils'
import {
  append,
  parseHTML,
  queryAll,
  unwrap,
  wrap,
  children,
  insertBefore,
  getData
} from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import Keyboard from './keyboard'
import Search from './search'
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
class Select extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }
  get selectOptions() {
    return Array.from(this.element.options)
  }
  initialize() {
    if (this.options.multiple && !this.element.getAttribute('multiple')) {
      this.element.multiple = true
      const hasSelectedAttribute = el => el.hasAttribute('selected')
      if (!this.selectOptions.find(hasSelectedAttribute)) {
        this.element.selectedIndex = -1
      }
    }
    this.source = this.options.source
      ? this.parseJson(this.options.source)
      : this.parseHtml(children(this.element))
    this.selected = Array.from(this.element.selectedOptions).map(el => el.value)

    this.markIndex = 0
    this.build()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.bind()

    if (this.options.multiple) {
      addClass(this.classes.MULTIPLE, this.$wrap)
      this.initialTag()
    }

    addClass(this.classes.LABEL, this.label)

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    if (this.options.filterable) {
      addClass(this.classes.FILTERABLE, this.$wrap)
      this.SEARCH = new Search(this)
    }

    if (this.selected.length > 0) {
      this.set(this.selected, true, true)
    } else {
      this.resetList(this.source)
    }

    if (this.options.keyboard) {
      this.KEYBOARD = new Keyboard(this)
    }
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  parseSelected(data) {
    let arr = []

    switch (typeof data) {
      case 'string':
        arr.push(data)
        break
      case 'object':
        if (data === null) {
          arr = []
        } else if (Array.isArray(data)) {
          arr = data
        }
        break
      case 'undefined':
        arr = []
        break
      default:
        break
    }

    if (!this.options.multiple && arr.length > 0) {
      arr = [arr[0]]
    }

    return arr
  }

  parseHtml(items) {
    const data = []

    const optionData = option =>
      deepMerge(option.dataset, {
        value: option.value,
        label: option.text,
        slug: this.replaceDiacritics(option.text),
        disabled: option.disabled
      })
    items.forEach(item => {
      if (item.tagName.toLowerCase() === 'optgroup') {
        const group = deepMerge(item.dataset, {
          group: true,
          label: item.label.toUpperCase(),
          options: []
        })

        children(item).forEach(c => {
          group.options.push(optionData(c))
        })
        data.push(group)
      } else {
        data.push(optionData(item))
      }
    })

    return data
  }

  parseJson(json) {
    let data = null
    if (typeof json === 'object') {
      data = json
    } else if (typeof json === 'string') {
      data = JSON.parse(json)
    } else {
      data = json
    }

    return data
  }

  build() {
    this.$wrap = wrap(this.buildFromTemplate('wrap'), this.element)
    this.element.style.display = 'none'

    this.$trigger = this.buildFromTemplate('trigger', {
      placeholder: this.options.placeholder
    })
    this.$dropdown = this.buildFromTemplate('dropdown')
    this.$list = isFunction(this.source)
      ? this.source.call(this, this.buildList.bind(this))  /* eslint-disable-line */
      : this.buildList(this.source)
    append(this.$list, this.$dropdown)
    append(this.$trigger, this.$wrap)
    append(this.$dropdown, this.$wrap)
    this.$items = queryAll(`.${this.classes.ITEM}`, this.$dropdown)
  }

  buildFromTemplate(name, args = {}) {
    args.classes = this.classes
    return parseHTML(
      template.render(this.options.templates[name].call(this), args)
    )
  }

  buildList(data) {
    if (isFunction(this.source)) {
      this.source = data
    }
    if (data.length === 0) {
      const $content = this.buildFromTemplate('notFound')
      append($content, this.$dropdown)
    } else {
      data.forEach(item => {
        if (item.group) {
          item.label = item.label.toUpperCase()

          const $group = this.buildFromTemplate('group', {
            group: item
          })
          const $list = this.buildFromTemplate('list')

          item.options.forEach(m => {
            const $subItem = this.buildFromTemplate('item', {
              item: m
            })

            if (m.disabled === 'disabled' || m.disabled === true) {
              addClass(this.classes.DISABLED, $subItem)
            }

            for (const i in this.selected) {
              if (m.value === this.selected[i]) {
                addClass(this.classes.SELECTED, $subItem)
              }
            }
            append($subItem, $list)
          })

          append($list, $group)
          append($group, this.$dropdown)
        } else {
          const $item = this.buildFromTemplate('item', {
            item
          })

          if (item.disabled === 'disabled' || item.disabled === true) {
            addClass(this.classes.DISABLED, $item)
          }

          for (const i in this.selected) {
            if (item.value === this.selected[i]) {
              addClass(this.classes.SELECTED, $item)
            }
          }

          append($item, this.$dropdown)
        }
      })
    }
  }

  resetList(data) {
    this.$dropdown.innerHTML = ''
    this.buildList(data)
    this.$items = queryAll(`.${this.classes.ITEM}`, this.$dropdown)
  }

  bind() {
    this.DROPDOWN = Dropdown.of(this.$trigger, {
      reference: this.$trigger,
      target: this.$dropdown,
      trigger: this.options.trigger,
      hideOnSelect: !this.options.multiple,
      itemValueAttr: 'value',
      imitateSelect: true,
      // inputLabel: this.options.filterable,
      placeholder: this.options.placeholder,
      templates: {
        inputLabel: () => this.options.templates.filterLabel()
      },
      onShown: () => {
        addClass(this.classes.BORDER, this.$trigger)
        this.trigger(EVENTS.OPEN)
        if (this.options.filterable) {
          this.label.select()
        }

        if (this.options.keyboard) {
          if (!this.options.multiple && this.selected.length > 0) {
            this.set(this.selected[0], true, true, 'mark')
          }
          this.markItem(null, true)
        }
      },
      onHided: () => {
        removeClass(this.classes.BORDER, this.$trigger)
        this.trigger(EVENTS.HIDE)
        if (this.options.filterable) {
          if (this.options.multiple) {
            this.label.value = ''
          } else if (this.selected.length === 0) {
            this.label.value = ''
            this.SEARCH.value = ''
          } else {
            const label = this.query(
              this.source,
              this.selected[0],
              'value',
              false
            )[0].label
            if (this.label.value !== label) {
              this.label.value = label
              this.SEARCH.value = label
            }
          }

          this.resetList(this.source)
          this.resetLabelWidth()
        }
      }
    })
    this.label = this.DROPDOWN.element
    if (!this.options.filterable && this.options.multiple) {
      this.label.style.display = 'none'
    }

    bindEvent(
      this.eventName('click'),
      `.${this.classes.BADGEDELETE}`,
      e => {
        const target = e.target
        if (!target.closest(`.${this.classes.BADGEDELETE}`)) {
          return
        }
        const badge = target.closest(`.${this.classes.BADGE}`)
        this.set(getData('flag', badge), false)
        return false  /* eslint-disable-line */
      },
      this.$trigger
    )

    bindEvent(
      this.eventName('click'),
      `.${this.classes.BADGE}`,
      e => {
        if (e.target.tagName === 'I') {
          return
        }
        this.DROPDOWN.toggle()
        return false  /* eslint-disable-line */
      },
      this.$trigger
    )

    bindEvent(
      this.eventName('click'),
      `.${this.classes.ITEM}`,
      e => {
        this.click(e.target)
      },
      this.$dropdown
    )
  }

  unbind() {
    this.DROPDOWN.destroy()
  }

  click(item) {
    if (hasClass(this.classes.DISABLED, item)) {
      return
    }
    if (!hasClass(this.classes.GROUPLABEL, item)) {
      this.trigger(EVENTS.CLICK)
      if (hasClass(this.classes.SELECTED, item)) {
        if (this.options.multiple) {
          this.unselectItem(item)
        }
        //   this.selectItem(item)
        // }
      } else {
        this.selectItem(item)
      }

      if (!this.options.multiple) {
        this.DROPDOWN.hide()
      }
    }
  }

  initialTag() {
    this.$items
      .filter(hasClass(this.classes.SELECTED))
      .forEach(this.addTag.bind(this))
  }

  addTag(item) {
    let $badge = null
    const data = this.getItemData(item)
    const label = data.label
    const value = data.value

    $badge = this.buildFromTemplate('badge', {
      that: this,
      flag: value,
      label
    })

    insertBefore($badge, this.label)
    this.badges = queryAll(`.${this.classes.BADGE}`, this.$trigger)

    if (hasClass(this.classes.HASBADGE, this.$wrap)) {
      this.DROPDOWN.POPPER.scheduleUpdate()
    } else {
      addClass(this.classes.HASBADGE, this.$wrap)
    }
  }

  deleteTag(item) {
    const value = getData('value', item)
    const pos = this.selected.indexOf(value)
    this.badges[pos].remove()
    this.selectedProcess(value, false)

    this.badges = queryAll(`.${this.classes.BADGE}`, this.$trigger)
    this.DROPDOWN.POPPER.scheduleUpdate()
    if (this.selected.length === 0) {
      removeClass(this.classes.HASBADGE, this.$wrap)
    }
  }

  get isMultiple() {
    return Boolean(this.options && this.options.multiple)
  }

  selectItem(item, trigger = true) {
    const isSelected = hasClass(this.classes.SELECTED, item)
    const isDisabled = hasClass(this.classes.DISABLED, item)
    if (isSelected || isDisabled) {
      return false
    }

    if (hasClass(this.classes.MARK, item)) {
      removeClass(this.classes.MARK, item)
    }

    const value = getData('value', item)
    if (!this.isMultiple && this.selected.length) {
      this.set(this.selected[0], false, false)
    }

    addClass(this.classes.SELECTED, item)
    this.selectedProcess(value)
    this.changeLabel(item)

    if (this.selected.length) {
      const staySelectedElement = el => this.selected.includes(el.value)
      const checked = el => {
        el.selected = true
      }
      this.selectOptions.filter(staySelectedElement).forEach(checked)
    } else {
      const cancelSelect = el => {
        el.selected = false
      }
      this.selectOptions.forEach(cancelSelect)
    }
    if (trigger) {
      this.trigger(EVENTS.SELECTED)
    }

    return true
  }

  unselectItem(item, trigger = true) {
    if (hasClass(this.classes.DISABLED, item)) {
      return
    }
    removeClass(this.classes.SELECTED, item)
    this.changeLabel(item, false)
    if (!this.options.multiple) {
      this.selected = []
    }
    const unselectedElement = el => el.value === getData('value', item)
    const unchecked = el => {
      el.selected = false
    }
    this.selectOptions.filter(unselectedElement).forEach(unchecked)
    if (trigger) {
      this.trigger(EVENTS.UNSELECTED)
    }
  }

  markItem(action, trigger = false) {
    switch (action) {
      case 'up':
        if (this.markIndex > 0) {
          this.markIndex--
          trigger = true
        }
        break
      case 'down':
        if (this.markIndex < this.$items.length - 1) {
          this.markIndex++
          trigger = true
        }
        break
      case 'first':
        this.markIndex = 0
        trigger = true
        break
      default:
        break
    }
    if (trigger) {
      const className = this.options.multiple
        ? this.classes.MARK
        : this.classes.SELECTED

      this.$items.map(item => removeClass(className, item))
      addClass(className, this.$items[this.markIndex])
    }
  }

  selectedProcess(value, isAdd = true) {
    const pos = this.selected.indexOf(value)
    if (isAdd) {
      if (pos === -1) {
        if (this.options.multiple) {
          this.selected.push(value)
        } else {
          this.selected = [value]
        }
      }
    } else if (pos !== -1) {
      this.selected.splice(pos, 1)
    }
    this.trigger(EVENTS.CHANGE, this.selected)
  }

  changeLabel(item, isAdd = true) {
    if (this.options.multiple) {
      if (isAdd) {
        this.addTag(item)
      } else {
        this.deleteTag(item)
      }
      if (this.options.filterable) {
        if (this.DROPDOWN.is('show')) {
          this.label.value = ''
          this.label.focus()
        }

        if (this.selected === null || this.selected.length === 0) {
          this.label.setAttribute('placeholder', this.options.placeholder)
        } else {
          this.label.setAttribute('placeholder', '')
        }
        this.resetList(this.source)
        this.resetLabelWidth()
      } else if (this.selected === null || this.selected.length === 0) {
        this.label.innerHTML = this.options.placeholder
      } else {
        this.label.innerHTML = ''
      }
    } else {
      const data = this.getItemData(item)
      const label = data.label

      if (this.options.filterable) {
        if (isAdd) {
          this.label.value = label
          this.SEARCH.value = label
        } else {
          this.label.value = ''
          this.SEARCH.value = ''
        }
        this.label.blur()
      } else if (isAdd) {
        this.label.innerHTML = label
      } else {
        this.label.innerHTML = this.options.placeholder
      }
    }
  }

  resetLabelWidth() {
    if (!this.options.multiple) {
      return
    }

    if (this.selected.length === 0 || this.selected === null) {
      setStyle('width', '100%', this.label)
    } else {
      const temporary = parseHTML(`<pre>${this.label.value}</pre>`)
      setStyle('display', 'none', temporary)
      append(temporary, document.body)
      const width = temporary.clientWidth + 20
      temporary.remove()
      setStyle('width', `${width}px`, this.label)
    }
  }

  query(data, value, name = 'label', nest = true) {
    if (value.length === 0 || value === null || typeof value === 'undefined') {
      return data
    }
    const newData = []
    const search = new RegExp(value)
    console.log(data)
    data.forEach(n => {
      if (n.group) {
        let addGroup = false
        const group = deepMerge({}, n)
        const items = []

        n.options.forEach(m => {
          if (search.test(m[name])) {
            if (nest) {
              addGroup = true
              items.push(m)
            } else {
              newData.push(m)
            }
          }
        })

        if (addGroup) {
          group.options = items
          newData.push(group)
        }
      } else if (search.test(n[name])) {
        newData.push(n)
      }
    })

    return newData
  }

  getItemData(item) {
    const value = getData('value', item)
    const data = this.query(this.source, value, 'value', false)[0]

    return data
  }

  set(value, isAdd = true, trigger = true, type = 'selected') {
    const handle = (item, value, isAdd, trigger, type, index) => {
      if (getData('value', item) === value) {
        if (type === 'selected') {
          if (isAdd) {
            this.selectItem(item, trigger)
          } else {
            this.unselectItem(item, trigger)
          }
        } else if (type === 'mark') {
          this.markIndex = index
          this.markItem(null, trigger)
        }
      }
    }

    this.$items.forEach((n, i) => {
      if (isArray(value)) {
        value.forEach(val => {
          handle(n, val, isAdd, trigger, type, i)
        })
      } else {
        handle(n, value, isAdd, trigger, type, i)
      }
    })
  }

  get() {
    return this.selected
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    this.set(this.options.parse.call(this, value))
    return null
  }

  open() {
    this.DROPDOWN.show()
  }

  close() {
    this.DROPDOWN.hide()
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false
      this.DROPDOWN.enable()
      removeClass(this.classes.DISABLED, this.$wrap)
      this.leave('disabled')
    }

    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.element.disabled = true
      this.DROPDOWN.disable()
      addClass(this.classes.DISABLED, this.$wrap)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLED)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      if (this.options.keyboard) {
        this.KEYBOARD.destroy()
      }
      this.element.display = ''
      unwrap(this.element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  replaceDiacritics(s) {
    const d = '40-46 50-53 54-57 62-70 71-74 61 47 77'
      .replace(/\d+/g, '\\3$&')
      .split(' ')

    for (const k of d) {
      if (Object.hasOwnProperty.call(d, k)) {
        s = s
          .toLowerCase()
          .replace(new RegExp(`[${d[k]}]`, 'g'), 'aeiouncy'.charAt(k))
      }
    }
    return s
  }
}

export default Select
