import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import Dropdown from '@pluginjs/dropdown'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import {
  query,
  queryAll,
  parseHTML,
  wrap,
  parentWith,
  append,
  children,
  getData
} from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import Scrollable from '@pluginjs/scrollable'
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
class ImageSelector extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupI18n()

    this.$wrapper = wrap(
      `<div class="${this.classes.WRAPPER}"></div>`,
      addClass(this.classes.DATA, this.element)
    )

    this.data = {
      items: [],
      selected: ''
    }

    this.parseHtml()

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.$init = parseHTML(
      `<div class="${this.classes.NAMESPACE} ${
        this.classes.INIT
      } pj-icon pj-icon-triangle-left-mini-solid"></div>`
    )
    this.$change = parseHTML(
      `<div class="${this.classes.CHANGE}">${this.translate('change')}</div>`
    )

    append(append(this.$change, this.$init), this.$wrapper)

    this.element.value = this.data.selected

    this.initPanel()
    this.setImg()

    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    // if(this.options.select) {
    //   this.set(this.options.select);
    // }
    this.initDropdown()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }
  initDropdown() {
    const dropdownConf = {
      // data: this.getTimeList().map(value => ({ label: value })),
      // placeholder: this.options.placeholder,
      placement: 'bottom-left',
      // imitateSelect: true,
      // inputLabel: true,
      target: this.$panel,
      reference: this.$init,
      hideOutClick: false,
      constraintToScrollParent: false,
      templates: this.options.templates
    }
    this.mapDropdown = Dropdown.of(this.$change, dropdownConf)
  }
  bind() {
    // $init
    compose(
      //   bindEvent(
      //     this.eventName('click'),
      //     `.${this.classes.INIT}`,
      //     () => {
      //       if (this.is('disabled')) {
      //         return
      //       }
      //       this.open()
      //     },
      //     this.$change
      //   ),
      bindEvent(
        this.eventName('click'),
        `.${this.classes.ITEM}`,
        el => {
          const $item = el.target
          removeClass(
            this.classes.ACTIVE,
            queryAll(`.${this.classes.ITEM}`, this.$wrapper).find(el =>
              el.matches(`.${this.classes.ACTIVE}`)
            )
          )
          addClass(this.classes.ACTIVE, $item)
          this.data.selected = getData('label', $item)
          this.setImg()
          this.close()
          this.mapDropdown.hide()
        },
        this.$wrapper
      )
    )

    if (this.options.hideOutClick) {
      bindEvent(
        this.eventNameWithId('click'),
        e => {
          const $this = e.target

          if (
            parentWith(hasClass(this.classes.WRAPPER), $this).length < 1 &&
            this.is('open')
          ) {
            this.close()
          }
        },
        window.document
      )
    }

    //
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrapper)
    removeEvent(this.eventName(), this.$panel)
    removeEvent(this.eventName(), this.$init)
    removeEvent(this.eventName(), window.document)
  }

  parseHtml() {
    this.type = this.element.tagName.toLowerCase()

    if (this.type === 'select') {
      // get value
      children(this.element).forEach(el => {
        const $this = el
        const value = el.value
        const label = el.label
        const img = getData('img', $this)
        const selected = Boolean(el.selected)

        this.data.items.push({
          value,
          label,
          img
        })

        if (selected) {
          this.data.selected = value
        }
      })
    } else if (this.type === 'input') {
      this.data.items = this.options.data
      this.data.selected = this.options.selected
    } else {
      return false
    }

    if (this.data.selected === '' || !this.data.selected) {
      this.data.selected = this.data.items[0].value
    }
    return null
  }

  getUrl(value) {
    let url = ''
    this.data.items.forEach(v => {
      if (v.value === value) {
        url = v.img
      }
    })

    return url
  }

  initPanel() {
    this.$panel = parseHTML(`<div class="${this.classes.PANEL}"></div>`)
    append(this.$panel, this.$wrapper)
    append(parseHTML('<div><ul></ul></div>'), this.$panel)

    this.setItems()
  }

  initScrollable() {
    Scrollable.of(this.$panel, {
      contentSelector: '>',
      containerSelector: '>'
    })
  }

  setItems() {
    this.data.items.forEach(v => {
      const $item = this.createItem(v)

      append($item, query('ul', this.$panel))
    })
  }

  createItem(data) {
    return setStyle(
      'background-image',
      `url("${data.img}")`,
      parseHTML(`<li class="${
        this.classes.ITEM
      } pj-icon pj-icon-done-small" data-label="${data.value}">
      <span class="${this.classes.ITEMLABEL}">${data.label}</span></li>`)
    )
  }

  setImg() {
    const url = this.getUrl(this.data.selected)

    setStyle('background-image', `url("${url}")`, this.$init)

    this.element.value = this.data.selected
  }

  open() {
    addClass(this.classes.HIDE, this.$init)
    addClass(this.classes.SHOW, this.$panel)
    this.enter('open')

    // if (this.options.hideOutClick) {
    // window.document.on(this.eventName('click'), e => {
    //   if (!this.is('open')) {
    //     return false
    //   }

    //   const $target = $(e.target)
    //   if (
    //     $target.closest(this.$change).length === 0 &&
    //     $target.closest(this.$panel).length === 0
    //   ) {
    //     this.close()
    //     return false
    //   }

    //   return undefined
    // })
    // }
  }

  close() {
    removeClass(this.classes.SHOW, this.$panel)
    removeClass(this.classes.HIDE, this.$init)
    this.leave('open')

    // if (this.options.hideOutClick) {
    //   window.document.off(this.eventName('click'))
    // }
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.get()
    }

    this.set(value)
    return null
  }

  set(value) {
    this.data.selected = value

    this.setImg()
  }

  get() {
    return this.data.selected
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrapper)
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrapper)
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrapper)
      }

      // this.element.unwrap()
      removeClass(this.classes.DATA, this.element)
      this.element.value = ''
      this.$panel.remove()
      this.$init.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default ImageSelector
