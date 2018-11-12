import { queryAll, getData } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable,
  themeable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import List from '@pluginjs/list'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class ToggleList extends List {
  constructor(element, options = {}) {
    super(element, options)
  }

  processData(data) {
    return data.sort((a, b) => {
      if (a.checked === b.checked) {
        return 0
      } else if (a.checked && !b.checked) {
        return -1
      }
      return 1
    })
  }

  setupSortable() {
    super.setupSortable()

    this.sortable.options.draggable = `.${this.classes.ITEM}.${
      this.classes.CHECKED
    }`
  }

  toggle(index, checked) {
    if (typeof checked === 'undefined') {
      checked = !this.data[index].checked
    }

    if (checked) {
      this.check(index)
    } else {
      this.uncheck(index)
    }
  }

  check(index) {
    if (this.data[index].checked !== true) {
      const $checkeds = this.getCheckeds()

      const $item = this.getItem(index)
      removeClass(this.classes.UNCHECKED, $item)
      addClass(this.classes.CHECKED, $item)

      this.data[index].checked = true
      this.trigger(EVENTS.CHECK, index, this.data[index])
      this.sort(index, $checkeds.length, true)
    }
  }

  uncheck(index) {
    if (this.data[index].checked === true) {
      const $checkeds = this.getCheckeds()

      const $item = this.getItem(index)

      removeClass(this.classes.CHECKED, $item)
      addClass(this.classes.UNCHECKED, $item)

      this.data[index].checked = false
      this.trigger(EVENTS.UNCHECK, index, this.data[index])
      this.sort(index, $checkeds.length - 1, true)
    }
  }

  getCheckeds() {
    return queryAll(`.${this.classes.CHECKED}`, this.$list)
  }

  buildItem(item) {
    const $item = super.buildItem(item)
    if (item.checked) {
      addClass(this.classes.CHECKED, $item)
    } else {
      addClass(this.classes.UNCHECKED, $item)
    }
    return $item
  }

  enable() {
    super.enable()
    this.getItems().forEach(item => {
      getData('toggle', item).enable()
    })
  }

  disable() {
    super.disable()
    this.getItems().forEach(item => {
      getData('toggle', item).disable()
    })
  }
}

export default ToggleList
