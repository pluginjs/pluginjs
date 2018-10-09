import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import {
  wrap,
  unwrap,
  query,
  parent,
  parseHTML,
  insertAfter
} from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import PopDialog from '@pluginjs/pop-dialog'
import Dropdown from '@pluginjs/dropdown'
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

import Type from './type'
import LinkTitle from './linkTitle'
import Internal from './internal'
import Target from './target'
import External from './external'

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
class LinkPicker extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupStates()

    this.setupClasses()
    this.setupI18n()

    this.initialize()
  }

  initialize() {
    wrap(
      `<div class='${this.classes.NAMESPACE}'></div>`,
      addClass(this.classes.INPUT, this.element)
    )

    this.defaultVal = this.initVal()
    this.value = deepMerge(
      {},
      this.defaultVal,
      this.options.parse(this.element.value.replace(/'/g, '"'))
    )
    // init
    this.linkTitle = new LinkTitle(this)
    this.internal = new Internal(this)
    this.target = new Target(this)
    this.external = new External(this)
    this.type = new Type(this)
    this.input = {}

    this.build()
    this.bind()

    const val = this.element.value
    if (val) {
      this.val(val)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')

    this.set(this.value, true)
    this.trigger(EVENTS.READY)
  }

  build() {
    const that = this
    this.$wrap = parent(this.element)

    this.$trigger = parseHTML(
      this.parseTemp('trigger', {
        classes: this.classes
      })
    )
    this.$empty = parseHTML(
      this.parseTemp('empty', {
        classes: this.classes,
        title: this.options.title
      })
    )
    this.$fill = parseHTML(
      this.parseTemp('fill', {
        classes: this.classes
      })
    )
    this.$action = parseHTML(
      this.parseTemp('action', {
        classes: this.classes
      })
    )
    this.$dropdown = parseHTML(
      this.parseTemp('dropdown', { classes: this.classes })
    )
    this.$dropdownAction = parseHTML(
      this.parseTemp('dropdownAction', {
        classes: this.classes,
        cancelTitle: this.translate('cancel'),
        saveTitle: this.translate('save')
      })
    )
    ;[this.$empty, this.$fill, this.$dropdown].map(el =>
      insertAfter(el, this.element)
    )

    this.$fill.append(this.$action)
    this.$dropdown.append(this.$dropdownAction)
    this.$dropdown.prepend(this.type.$wrap)
    insertAfter(this.internal.$wrap, this.type.$wrap)
    insertAfter(this.target.$wrap, this.internal.$wrap)
    insertAfter(this.external.$wrap, this.internal.$wrap)
    insertAfter(this.linkTitle.$wrap, this.target.$wrap)
    this.$trigger.append(this.$empty, this.$fill)
    this.$wrap.append(this.$trigger, this.$dropdown)
    if (this.value.type === 'internal') {
      addClass(
        `${this.classes.TYPESHOW}`,
        query('.pj-linkPicker-internal', this.$dropdown)
      )
      removeClass(
        `${this.classes.TYPESHOW}`,
        query('.pj-linkPicker-external', this.$dropdown)
      )
    }
    if (this.value.type === 'external') {
      addClass(
        `${this.classes.TYPESHOW}`,
        query('.pj-linkPicker-external', this.$dropdown)
      )
      removeClass(
        `${this.classes.TYPESHOW}`,
        query('.pj-linkPicker-internal', this.$dropdown)
      )
    }
    // this.buildTypes()
    // create pop
    this.pop = PopDialog.of(
      query(`.${this.classes.ACTIONREMOVE}`, this.$action),
      {
        content: 'Are you sure you want to delete?',
        placement: 'bottom',
        buttons: {
          cancel: { label: 'Cancel' },
          delete: {
            label: 'Delete',
            color: 'danger',
            fn(resolve) {
              that.clear(true)
              resolve()
            }
          }
        },
        onShow: () => this.enter('holdHover'),
        onHide: () => {
          removeClass(this.classes.HOVER, this.$action)
          this.leave('holdHover')
        }
      }
    )
    this.initDropdown()
  }

  initDropdown() {
    this.DROPDOWN = Dropdown.of(this.$empty, {
      reference: this.$trigger,
      target: this.$dropdown,
      placement: 'bottom-left',
      hideOutClick: false,
      hideOnSelect: false,
      templates: this.options.templates
    })
  }

  bind() {
    // open dropdown
    bindEvent(
      this.eventName('click'),
      `.${this.classes.EMPTY}`,
      () => {
        if (this.is('disabled')) {
          return
        }
        this.show()
      },
      this.$wrap
    )

    // hold hover
    compose(
      bindEvent('mouseover', `.${this.classes.FILL}`, () => {
        if (this.is('disabled')) {
          return
        }
        addClass(this.classes.HOVER, this.$action)
      }),
      bindEvent('mouseout', `.${this.classes.FILL}`, () => {
        if (this.is('disabled')) {
          return false
        }
        if (this.is('holdHover')) {
          return false
        }

        removeClass(this.classes.HOVER, this.$action)
        return null
      }),

      // editor link
      bindEvent(this.eventName('click'), `.${this.classes.ACTIONEDIT}`, () => {
        // this.update()
        this.show()
      }),

      // cancel
      bindEvent(
        this.eventName('click'),
        `.${this.classes.DROPDOWNCANCEL}`,
        () => this.hide()
      ),

      // save
      bindEvent(
        this.eventName('click'),
        `.${this.classes.DROPDOWNSAVE}`,
        () => {
          this.update()
          this.hide()
        }
      )
    )(this.$wrap)
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    removeEvent(this.eventName(), this.element)
  }

  formatKey(val) {
    return val.replace(/\s/g, '-').toLocaleLowerCase()
  }
  parseTemp(tempName, options) {
    return template.compile(this.options.templates[tempName]())(options)
  }

  show() {
    this.DROPDOWN.show()
    addClass(this.classes.SHOW, this.$wrap)
    if (this.value.internal.length === 0) {
      query('.pj-cascader-label', this.$wrap).textContent = 'Please select'
    }
  }

  hide() {
    this.DROPDOWN.hide()
    removeClass(this.classes.SHOW, this.$wrap)
  }

  clear(update = true) {
    this.value = {}

    if (update !== false) {
      this.type.clear()
      this.internal.clear()
      this.external.clear()
      this.target.clear()
      this.linkTitle.clear()
      this.update()
      this.element.value = ''
    }
    removeClass(this.classes.HOVER, this.$action)
    removeClass(this.classes.WRITE, this.$wrap)
  }

  set(value, update = true) {
    if (update !== false) {
      if (typeof value.type !== 'undefined') {
        this.type.set(value.type)
      } else {
        this.type.clear()
      }

      if (typeof value.internal !== 'undefined') {
        this.internal.set(value.internal)
      }
      if (typeof value.external !== 'undefined') {
        this.external.set(value.external)
      }

      if (typeof value.target !== 'undefined') {
        this.target.set(value.target)
      }

      if (typeof value.title !== 'undefined') {
        this.linkTitle.set(value.title)
      }
      this.update()
    }
  }

  initVal() {
    return {
      type: this.options.type.value,
      internal: this.options.internal.value,
      target: this.options.target.value,
      title: this.options.linkTitle.value
    }
  }

  update() {
    const value = this.val()
    this.element.value = value
    this.updatePreview()
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    const valueObj = this.options.parse.call(this, value)
    if (valueObj) {
      this.set(valueObj)
    } else {
      this.clear()
    }

    return null
  }

  updatePreview() {
    const data = this.get()
    const content = query('.pj-cascader-label', this.$wrap).innerHTML
    if (data.type === 'internal') {
      addClass(this.classes.WRITE, this.$wrap)
      query(`.${this.classes.LINKTYPE}`, this.$fill).textContent = data.type
      query(`.${this.classes.LINKCONTENT}`, this.$fill).textContent = content
    } else {
      addClass(this.classes.WRITE, this.$wrap)
      query(`.${this.classes.LINKTYPE}`, this.$fill).textContent = data.type
      query(`.${this.classes.LINKCONTENT}`, this.$fill).textContent =
        data.external
    }
  }

  get() {
    if (this.value.type === 'external') {
      return {
        type: this.value.type,
        external: this.value.external,
        target: this.value.target,
        title: this.value.title
      }
    }
    return {
      type: this.value.type,
      internal: this.value.internal,
      target: this.value.target,
      title: this.value.title
    }

    // return this.value
  }
  getClassName(namespace, field) {
    return template.compile(this.classes.FIELD)({ namespace, field })
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false
      this.pop.enable()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = true
      this.pop.disable()
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrap)
      }

      this.TYPESELECT.destroy()
      unwrap(this.element)
      removeClass(this.classes.INPUT, this.element)
      this.$trigger.remove()
      this.$dropdown.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default LinkPicker
