import Component from '@pluginjs/component'
import { deepMerge, compose, curry, triggerNative } from '@pluginjs/utils'
import { isString, isArray, isIE, isIE11 } from '@pluginjs/is'
import Dropdown from '@pluginjs/dropdown'
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import {
  query,
  queryAll,
  find,
  parent,
  parseHTML,
  children,
  parentWith,
  insertAfter
} from '@pluginjs/dom'
import { css, showElement, hideElement } from '@pluginjs/styled'
import PopDialog from '@pluginjs/pop-dialog'
import Trigger from './trigger'
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
class GalleryPicker extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    this.components = deepMerge({}, this.components)
    addClass(`${this.classes.NAMESPACE}-input`, this.element)

    this.setupI18n()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.createHtml()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    const value = this.options.parse(this.element.value)

    this.set(value, false)

    addClass(this.classes.EXIST, this.$wrap)
    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }
    this.initDropdown(this.options.dropdown)
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initDropdown(options) {
    this.$galleryDropdown = Dropdown.of(this.TRIGGER.$edit, {
      ...options,
      reference: this.TRIGGER.$fill,
      responsiveFull: this.options.responsiveDropdownFull,
      target: this.$panel,
      hideOutClick: true,
      hideOnSelect: false,
      templates: this.options.templates,
      onHided: () => {
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$empty)
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$fill)
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$triggerAction)
        addClass(this.classes.EXIST, removeClass(this.classes.SHOW, this.$wrap))
      }
    })
  }

  bind() {
    compose(
      // change
      bindEvent(this.eventName('click'), `.${this.classes.ITEMRESELECT}`, e => {
        e.stopPropagation()
        if (this.is('disabled')) {
          return false
        }
        this.options.change.call(this, this.changeImage.bind(this))
        const getElementIndex = el => {
          const parentElement = parent(el)
          return children(parentElement).indexOf(el)
        }
        const index = getElementIndex(
          parentWith(hasClass(this.classes.ITEM), e.target)
        )
        this.change(index, this.url)
        return null
      }),
      // save
      bindEvent(this.eventName('click'), `.${this.classes.SAVE}`, e => {
        e.stopPropagation()
        if (this.is('disbaled')) {
          return false
        }
        this.update()
        this.close()
        return false
      }),
      // expand add
      bindEvent(
        this.eventName('click'),
        `.${this.classes.ADD}, .${this.classes.ADDBTN}`,
        e => {
          e.stopPropagation()
          if (this.is('disabled')) {
            return false
          }

          this.options.add.call(this, this.add.bind(this))
          return null
        }
      ),
      // expand close
      bindEvent(this.eventName('click'), `.${this.classes.CANCEL}`, e => {
        e.stopPropagation()
        if (this.is('disabled')) {
          return false
        }

        const val = this.element.value
        this.set(this.options.parse(val))
        this.close()
        return false
      })
    )(this.$panel)
  }

  unbind() {
    removeEvent(this.eventName())
  }

  createHtml() {
    // const that = this
    this.$wrap = parseHTML(
      template.compile(this.options.templates.main())({
        classes: this.classes,
        placeholder: this.translate('placeholder'),
        add: this.translate('add'),
        count: this.translate('count'),
        expand: this.translate('expand'),
        footerCancel: this.translate('cancel'),
        footerAdd: this.translate('add'),
        footerSave: this.translate('save')
      })
    )

    insertAfter(this.$wrap, this.element)

    this.$panel = query(`.${this.classes.DROPDOWN}`, this.$wrap)
    this.$Add = query(`.${this.classes.ADD}`, this.$panel)
    this.$items = query(`.${this.classes.ITEMS}`, this.$panel)

    hideElement(this.element)

    this.TRIGGER = new Trigger(this)
  }

  update(trigger = true) {
    this.element.value = this.val()

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.value)
      triggerNative(this.element, 'change')
    }
  }

  getImageByIndex(index) {
    if (index < this.value.length) {
      const item = this.value[index]
      return this.options.getImage(item)
    }
    return null
  }

  updateList() {
    const that = this
    const length = children(this.$items).length

    if (this.count >= length) {
      for (let i = length; i <= this.count; i++) {
        const $item = this.addImage(this.value[i - 1].image)
        insertAfter($item, this.$items.children[i - 1])
        $item.dataset.index = i
        PopDialog.of(
          query(
            `.${this.classes.ITEM}-change .${this.classes.ITEMREMOVE}`,
            $item
          ),
          {
            placement: 'bottom',
            content: this.translate('deleteTitle'),
            buttons: [
              {
                action: 'cancel',
                label: this.translate('cancel')
              },
              {
                action: 'delete',
                label: this.translate('delete'),
                color: 'danger',
                fn(resolve) {
                  that.remove($item.dataset.index)
                  resolve()
                }
              }
            ],
            onShown: () => {
              this.enter('holdHover')
            },
            onHidden: () => {
              removeClass(this.classes.HOVER, $item)
              this.leave('holdHover')
            }
          }
        )
      }
    } else {
      this.delImage()
    }

    queryAll(`.${this.classes.ITEM}`, this.$panel).map($el => { /* eslint-disable-line */
      // item overlay
      bindEvent(
        this.eventName('mouseenter'),
        e => {
          if (this.is('disabled')) {
            return false
          }
          addClass(this.classes.ITEMHOVER, e.target)
          return null
        },
        $el
      )
      bindEvent(
        this.eventName('mouseleave'),
        e => {
          if (this.is('disabled')) {
            return false
          }

          if (this.is('holdHover')) {
            return false
          }
          removeClass(this.classes.ITEMHOVER, e.target)
          this.leave('holdHover')
          return null
        },
        $el
      )
    })
  }

  addImage(url) {
    return parseHTML(
      template.compile(this.options.templates.image())({
        classes: this.classes,
        imgSrc: url,
        changeClass: `${this.classes.ITEM}-change`,
        reselectClass: this.classes.ITEMRESELECT,
        removeClass: this.classes.ITEMREMOVE
      })
    )
  }

  delImage() {
    const target = children(this.$items)[this.indexed]

    if (target) {
      if(isIE() || isIE11()) {
        target.removeNode(true);
      } else {
        target.remove()
      }
    }
  }

  changeImage(url) {
    this.url = url
  }

  clearImages() {
    const images = queryAll(`.${this.classes.ITEM}`, this.$panel)
    if (images.length) {
      images.map(el => {
        if(isIE() || isIE11()) {
          el.removeNode(true);
        } else {
          el.remove()
        }
      })
    }
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process(this.value)
    }

    const valueObj = this.options.parse(value)

    if (valueObj) {
      this.set(valueObj)
    } else {
      this.clear()
    }

    return null
  }

  set(value, trigger = true) {
    if (isArray(value)) {
      this.value = value
    } else if (isString(value)) {
      this.value = this.options.parse(value)
    } else {
      this.value = []
    }
    this.clearImages()
    this.count = this.value.length
    this.TRIGGER.setState()
    this.updateList()
    this.update(trigger)
  }

  add(item) {
    for (const key in item) {
      if ({}.hasOwnProperty.call(item, key)) {
        this.value.push(item[key])
      }
    }

    this.count = this.value.length
    this.TRIGGER.setState()
    this.updateList()
  }

  change(index, value) {
    this.value[index - 1] = value
    const eq = curry((index, arr) => arr[index])
 
    compose(
      css({
        backgroundImage: `url(${this.options.getImage(value)})`
      }),
      find(`.${this.classes.ITEMIMAGE}`),
      eq(index),
      children,
      find(`.${this.classes.ITEMS}`)
    )(this.$panel)
    this.TRIGGER.setState()
  }

  remove(index) {
    this.value.splice(index - 1, 1)
    this.count -= 1
    const eq = curry((index, arr) => arr[index])

    if(isIE() || isIE11()) {
      compose(
        eq(index),
        children,
        find(`.${this.classes.ITEMS}`)
      )(this.$panel).removeNode(true);
    } else {
      compose(
        eq(index),
        children,
        find(`.${this.classes.ITEMS}`)
      )(this.$panel).remove()
    }

    if (this.$items.children.length > 1) {
      for (let i = 1; i <= this.value.length; i++) {
        this.$items.children[i].dataset.index = i
      }
    }
    this.TRIGGER.setState()
  }

  clear() {
    this.clearImages()
    this.count = 0
    this.value = []
    this.TRIGGER.setState()
    this.element.value = ''
    triggerNative(this.element, 'change')
  }

  get() {
    return this.value
  }

  open() {
    addClass(this.classes.OPENDISABLE, this.TRIGGER.$empty)
    addClass(this.classes.OPENDISABLE, this.TRIGGER.$fill)
    addClass(this.classes.OPENDISABLE, this.TRIGGER.$triggerAction)
    addClass(this.classes.SHOW, removeClass(this.classes.EXIST, this.$wrap))
  }

  close() {
    this.$galleryDropdown.hide()
    this.leave('status')
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.TRIGGER.DELETEPOP.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.TRIGGER.DELETEPOP.disable()
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      
      if(isIE() || isIE11()) {
        this.$wrap.removeNode(true);
      } else {
        this.$wrap.remove()
      }

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrap)
      }

      showElement(this.element)
      removeClass(`${this.classes.NAMESPACE}-input`, this.element)
      this.element.value = ''
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default GalleryPicker
