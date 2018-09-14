import Component from '@pluginjs/component'
import { deepMerge, compose, curry } from '@pluginjs/utils'
import { isString, isArray } from '@pluginjs/is'
import Dropdown from '@pluginjs/dropdown'
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import {
  fadeIn,
  fadeOut,
  query,
  queryAll,
  find,
  parent,
  parseHTML,
  children,
  parentWith,
  insertAfter,
  insertBefore
} from '@pluginjs/dom'
import { setStyle, css, showElement, hideElement } from '@pluginjs/styled'
import PopDialog from '@pluginjs/pop-dialog'
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

    setStyle('height', this.options.viewportSize, this.$expandPanel)

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
    this.initDropdown()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }
  // initDropdown
  initDropdown() {
    const dropdownConf = {
      reference: this.$fill,
      target: this.$expandPanel,
      placement: 'bottom-left',
      hideOutClick: false,
      constraintToScrollParent: false,
      templates: this.options.templates
    }
    Dropdown.of(this.$fillExpand, dropdownConf)
  }

  bind() {
    const that = this
    bindEvent(
      this.eventName('click'),
      () => {
        if (that.is('disabled')) {
          return false
        }

        const val = this.options.add.call(this)
        this.set(val)
        return null
      },
      this.$empty
    )
    // add
    if (this.$fillAdd) {
      bindEvent(
        this.eventName('click'),
        () => {
          if (that.is('disabled')) {
            return false
          }

          const val = this.options.add.call(this)
          this.add(val)
          return null
        },
        this.$fillAdd
      )
    }

    // fill expand
    bindEvent(
      this.eventName('click'),
      () => {
        if (this.is('disabled')) {
          return false
        }
        this.open()
        return null
      },
      this.$fillEdit
    )

    // fill
    compose(
      bindEvent(this.eventName('mouseenter'), () => {
        if (this.is('disabled')) {
          return
        }
        addClass(this.classes.HOVER, this.$fill)
      }),
      bindEvent(this.eventName('mouseleave'), () => {
        if (this.is('disabled')) {
          return false
        }
        if (this.is('holdHover')) {
          return false
        }

        removeClass(this.classes.HOVER, this.$fill)
        this.leave('holdHover')
        return null
      })
    )(this.$fill)

    compose(
      // change
      bindEvent(this.eventName('click'), `.${this.classes.ITEMRESELECT}`, e => {
        if (this.is('disabled')) {
          return false
        }

        const url = this.options.change()
        const getElementIndex = el => {
          const parentElement = parent(el)
          return children(parentElement).indexOf(el)
        }
        const index = getElementIndex(
          parentWith(hasClass(this.classes.ITEM), e.target)
        )
        this.change(index, url)
        return null
      }),
      // save
      bindEvent(
        this.eventName('click'),
        `.${this.classes.EXPANDSAVEBTN}`,
        () => {
          if (this.is('disbaled')) {
            return false
          }
          this.update()
          this.close()
          return null
        }
      ),
      // item overlay
      bindEvent(this.eventName('mouseover'), `.${this.classes.ITEM}`, e => {
        if (this.is('disabled')) {
          return false
        }
        const target = parentWith(hasClass(this.classes.ITEM), e.target)
        addClass(this.classes.HOVER, target)
        return null
      }),
      bindEvent(this.eventName('mouseout'), `.${this.classes.ITEM}`, e => {
        if (this.is('disabled')) {
          return false
        }

        if (this.is('holdHover')) {
          return false
        }
        const target = parentWith(hasClass(this.classes.ITEM), e.target)
        removeClass(this.classes.HOVER, target)
        this.leave('holdHover')
        return null
      }),
      // expand add
      bindEvent(
        this.eventName('click'),
        `.${this.classes.EXPANDADD}, .${this.classes.EXPANDADDBTN}`,
        () => {
          if (this.is('disabled')) {
            return false
          }
          const val = this.options.add.call(this)
          this.add(val)
          return null
        }
      ),
      // expand close
      bindEvent(
        this.eventName('click'),
        `.${this.classes.EXPANDCANCELBTN}`,
        () => {
          if (this.is('disabled')) {
            return false
          }
          const val = this.element.value
          this.set(this.options.parse(val))
          this.close()
          return null
        }
      )
    )(this.$expandPanel)
  }

  unbind() {
    removeEvent(this.eventName())
  }

  createHtml() {
    const that = this
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

    this.$empty = query(`.${this.classes.EMPTY}`, this.$wrap)

    this.$fill = query(`.${this.classes.FILL}`, this.$wrap)
    // this.$dropdown = query(`.${this.classes.DROPDOWN}`, this.$wrap)
    this.$fillCount = query(`.${this.classes.FILLCOUNT}`, this.$wrap)
    this.$fillExpand = query(`.${this.classes.FILLEXPAND}`, this.$wrap)
    this.$fillEdit = query(`.${this.classes.FILLEDIT}`, this.$fillExpand)
    this.$fillRemove = query(`.${this.classes.FILLREMOVE}`, this.$fillExpand)
    this.$fillAdd = query(`.${this.classes.FILLADD}`, this.$wrap)
    this.$fillImage = query(`.${this.classes.FILLIMAGE}`, this.$wrap)
    this.$expandPanel = query(`.${this.classes.EXPANDPANEL}`, this.$wrap)
    this.$expandAdd = query(`.${this.classes.EXPANDADD}`, this.$expandPanel)
    this.$expandItems = query(`.${this.classes.EXPANDITEM}`, this.$expandPanel)
    // init pop
    this.pop = PopDialog.of(this.$fillRemove, {
      placement: 'bottom',
      content: this.translate('deleteTitle'),
      buttons: {
        cancel: { label: this.translate('cancel') },
        delete: {
          label: this.translate('delete'),
          color: 'danger',
          fn(resolve) {
            fadeOut(
              {
                duration: 100,
                callback: () => {
                  that.clear()
                  fadeIn({ duration: 100 }, that.$fill)
                }
              },
              that.$fill
            )

            resolve()
          }
        }
      },
      onShow: () => {
        this.enter('holdHover')
      },
      onHide: () => {
        removeClass(this.classes.HOVER, this.$fill)
        this.leave('holdHover')
      }
    })
    hideElement(this.element)
  }

  update(trigger = true) {
    this.element.value = this.val()

    if (trigger) {
      this.trigger(EVENTS.CHANGE, [this.value])
    }
  }

  setState() {
    // const that = this;
    this.$fillCount.textContent = this.count
    if (this.count > 0) {
      // const $removeBtn = this.$fillExpand.find(`.${this.classes.FILLREMOVE}`);
      setStyle(
        'background-image',
        `url(${this.getImageByIndex(this.count - 1)})`,
        this.$fillImage
      )
      removeClass(this.classes.WRITE, this.$wrap)
    } else {
      setStyle('background-image', 'none', this.$fillImage)
      addClass(this.classes.WRITE, this.$wrap)
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
    const length = children(
      query(`.${this.classes.NAMESPACE}-expand-items`, this.$expandPanel)
    ).length

    if (this.count >= length) {
      const indexOfParent = el => children(parent(el)).indexOf(el)
      for (let i = length; i <= this.count; i++) {
        const $item = this.addImage(this.value[i - 1])
        insertBefore($item, this.$expandAdd)
        PopDialog.of(
          query(
            `.${this.classes.ITEM}-change .${this.classes.ITEMREMOVE}`,
            $item
          ),
          {
            placement: 'bottom',
            content: this.translate('deleteTitle'),
            buttons: {
              cancel: { label: this.translate('cancel') },
              delete: {
                label: this.translate('delete'),
                color: 'danger',
                fn(resolve) {
                  that.remove(indexOfParent($item))
                  that.updateScrollbar()

                  resolve()
                }
              }
            },
            onShow: () => {
              this.enter('holdHover')
            },
            onHide: () => {
              removeClass(this.classes.HOVER, $item)
              this.leave('holdHover')
            }
          }
        )
      }
    } else {
      this.delImage()
    }
    this.updateScrollbar()
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
    const target = children(
      query(`.${this.classes.NAMESPACE}-expand-items`, this.$expandPanel)
    )[this.indexed]

    if (target) {
      target.remove()
    }
  }

  updateScrollbar() {
    const scrollableApi = Scrollable.of(this.$expandItems)
    scrollableApi.update()
  }

  clearImages() {
    const images = queryAll(`.${this.classes.ITEM}`, this.$expandPanel)
    if (images.length) {
      images.map(el => el.remove())
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
      this.value = [value]
    } else {
      this.value = []
    }

    this.clearImages()
    this.count = this.value.length
    this.setState()
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
    this.setState()
    this.updateList()
  }

  change(index, value) {
    this.value[index] = value
    const eq = curry((index, arr) => arr[index])
    compose(
      css({
        backgroundImage: `url(${this.options.getImage(value)})`
      }),
      find(`.${this.classes.ITEMIMAGE}`),
      eq(index),
      children,
      find(`.${this.classes.NAMESPACE}-expand-items`)
    )(this.$expandPanel)
    this.setState()
  }

  remove(index) {
    this.value.splice(index, 1)
    this.count -= 1
    const eq = curry((index, arr) => arr[index])
    compose(
      eq(index),
      children,
      find(`.${this.classes.NAMESPACE}-expand-items`)
    )(this.$expandPanel).remove()
    this.setState()
  }

  clear() {
    this.clearImages()

    this.count = 0
    this.value = []
    this.setState()
    this.element.value = ''
  }

  get() {
    return this.value
  }

  open() {
    addClass(this.classes.OPENDISABLE, this.$fill)
    addClass(this.classes.EXPAND, removeClass(this.classes.EXIST, this.$wrap))
    this.updateScrollbar()
  }

  close() {
    removeClass(this.classes.OPENDISABLE, this.$fill)
    addClass(this.classes.EXIST, removeClass(this.classes.EXPAND, this.$wrap))
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.pop.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.pop.disable()
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.$wrap.remove()
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
