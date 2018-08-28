import templateEngine from '@pluginjs/template'
import Sortable from 'sortablejs'
import { query, parseHTML, setData } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
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
import List from '@pluginjs/list'
// import { addClass } from '@pluginjs/classes'

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
class TagList extends List {
  constructor(element, options = {}) {
    super(element, options)

    this.initOptions(DEFAULTS, options)
    this.initClasses()
    this.setupI18n()
    this.data = []
    this.sortable = null
    this.initList()
    this.init()
  }
  initList() {
    this.data.forEach(item => {
      const $item = this.buildItem(item)

      $item.append(this.buildActions())
      this.$list.append($item)
    })
    this.sortable = Sortable.create(this.$list, {
      animation: 150,
      handle: `.${this.classes.HANDLE}`,
      onUpdate: evt => {
        this.sort(evt.oldIndex, evt.newIndex)
      }
    })
  }
  init() {
    this.initAddBtn()
    this.$addBtn = query('.pj-tagList-btn', this.$add)
    this.$addInput = query('.pj-tagList-input', this.$add)

    this.listener()
  }

  initAddBtn() {
    this.$add = parseHTML(
      templateEngine.compile(this.options.templates.add())({
        // classes: this.classes,
        placeholder: this.translate('addPlaceholder'),
        BtnText: this.translate('add')
      })
    )

    this.$wrapper.append(this.$add)
  }

  listener() {
    bindEvent(
      this.eventName('click'),
      () => {
        if (this.is('disabled')) {
          return
        }
        const val = this.$addInput.value
        this.addItem(val)
      },
      this.$addBtn
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.$addBtn)
  }

  addItem(val) {
    if (!val || typeof val === 'undefined') {
      return
    }

    const data = { title: val }

    this.insert(data)
    this.$addInput.value = ''
  }

  removeListener() {
    removeEvent(this.eventName())
  }

  destroy() {
    super.destroy()
    this.$add.remove()
    this.unbind()
    setData('tagList', null, this.element)
  }

  enable() {
    super.enable()
    if (this.is('disabled')) {
      this.$addBtn.disabled = false
      this.$addInput.disabled = false
    }
  }

  disable() {
    super.disable()
    if (!this.is('disabled')) {
      this.$addBtn.disabled = true
      this.$addInput.disabled = true
    }
  }
}

export default TagList
