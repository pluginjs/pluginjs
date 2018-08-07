import { isNull } from '@pluginjs/is'
import {
  query,
  queryAll,
  children,
  parent,
  prepend,
  insertAfter,
  getData,
  setData
} from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { deepMerge } from '@pluginjs/utils'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/decorator'
import Toggle from '@pluginjs/toggle'
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
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class ToggleList extends List {
  constructor(element, options = {}) {
    const defaultOptions = deepMerge(DEFAULTS, options)
    super(element, defaultOptions)
    this.$wrapper = parent(this.element)
    addClass(this.classes.NAMESPACE, this.$wrapper)
  }

  initialize() {
    this.plugin = NAMESPACE
    this.classes = Object.assign(this.classes, CLASSES)
    this.initClasses(this.classes)
    this.data = [].concat(this.options.data)

    super.initialize()
  }

  initToggle($item) {
    this.sortable.options.draggable = `.${this.classes.ITEM}.${
      this.classes.CHECKED
    }`
    const $toggle = new Toggle(query(`.${this.classes.SWITCH}`, $item), {
      theme: this.options.theme,
      size: 'small',
      onChange: checked => {
        this.toggle($item, checked)
      }
    })

    setData('toggle', $toggle, $item)
  }

  initStatus() {
    const data = [].concat(this.data)

    this.getItems().forEach((item, index) => {
      if (!data[index].checked) {
        getData('toggle', item).uncheck(false)
        this.toggle(item, false, false)
      }
    })
  }

  bind() {
    super.bind()

    // this.$wrapper.on(
    //   this.eventName('click'),
    //   `.${this.classes.ITEM}`,
    //   function () {
    //     if ($(this).data('disabled')) {
    //       return false;
    //     }
    //     return undefined;
    //   }
    // );
    bindEvent(
      {
        type: this.eventName('click'),
        identity: `${this.classes.ACTIONS}`,
        handler: e => e.stopPropagation()
      },
      this.$wrapper
    )
  }

  unbind() {
    // super.unbind()
    removeEvent(this.eventName(), this.$wrapper)
  }

  toggle($item, check, trigger = true) {
    const index = children(parent($item)).indexOf($item)
    let endIndex = 0
    const $checkeds = this.getCheckeds()
    const checkedsLength = $checkeds.length

    if (check) {
      addClass(this.classes.CHECKED, $item)
    } else {
      removeClass(this.classes.CHECKED, $item)
    }

    if (checkedsLength === 0) {
      prepend($item, this.$list)
      endIndex = 0
    } else {
      insertAfter($item, $checkeds[checkedsLength - 1])
      endIndex = check ? checkedsLength : checkedsLength - 1
    }

    this.updateData(index, 'checked', check)
    this.sort(index, endIndex)

    if (trigger) {
      this.trigger(check ? EVENTS.CHECK : EVENTS.UNCHECK, index)
    }
  }

  getCheckeds() {
    return queryAll(`.${this.classes.CHECKED}`, this.$wrapper)
  }

  updateData(index, label, value) {
    this.data[index][label] = value
  }

  set(data) {
    data.forEach(item => {
      if (isNull(item.checked) || typeof item.checked === 'undefined') {
        item.checked = true
      }
    })

    super.set(data)

    const that = this

    queryAll(`.${this.classes.ITEM}`, this.$wrapper).forEach(el => {
      addClass(that.classes.CHECKED, el)
      that.initToggle(el)
    })

    this.initStatus()
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
