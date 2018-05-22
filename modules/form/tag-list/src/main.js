import templateEngine from '@pluginjs/template'
import is from '@pluginjs/is'
import { deepMerge } from '@pluginjs/utils'
import { query, parseHTML, setObjData, parent } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import Pj, {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import List from '@pluginjs/list'

// const List = Pj.get('list')
const optionsExtendList = deepMerge(List.defaults, DEFAULTS)

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: optionsExtendList,
    methods: METHODS,
    dependencies: DEPENDENCIES
  },
  INFO
)
class TagList extends List {
  constructor(element, options = {}) {
    super(element, options)

    this.options = deepMerge(optionsExtendList, options, this.getDataOptions())
    this.classes = { ...this.classes, ...CLASSES }
    this.initClasses(this.classes)
    this.setupI18n()

    this.$wrapper = parent(this.element)

    this.init()
  }

  init() {
    this.plugin = NAMESPACE
    this.initAddBtn()
    this.$addBtn = query(`.${this.classes.ADDBTN}`, this.$add)
    this.$addInput = query(`.${this.classes.ADDINPUT}`, this.$add)

    this.listener()
  }

  initAddBtn() {
    this.$add = parseHTML(
      templateEngine.compile(this.options.templates.add())({
        className: this.classes.ADD,
        input: this.classes.ADDINPUT,
        button: this.classes.ADDBTN,
        placeholder: this.translate('addPlaceholder'),
        BtnText: this.translate('add')
      })
    )

    this.$wrapper.append(this.$add)
  }

  listener() {
    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          const val = this.$addInput.value
          this.addItem(val)
        }
      },
      this.$addBtn
    )
  }

  unbind() {
    this.$addBtn.unbind()
  }

  addItem(val) {
    if (!val || is.undefined(val)) {
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
    this.$add.remove()
    this.unbind()
    setObjData('tagList', null, this.element)
    super.destroy()
  }

  enable() {
    super.enable()
    if (!this.element.disabled) {
      this.$addBtn.disabled = false
      this.$addInput.disabled = false
    }
  }

  disable() {
    super.disable()
    if (this.element.disabled) {
      this.$addBtn.disabled = true
      this.$addInput.disabled = true
    }
  }
}

export default TagList
