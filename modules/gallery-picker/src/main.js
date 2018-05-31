import Component from '@pluginjs/component'
import { deepMerge, compose, curry } from '@pluginjs/utils'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  query,
  queryAll,
  find,
  parent,
  parseHTML,
  getObjData,
  children,
  parentWith,
  insertAfter,
  insertBefore
} from '@pluginjs/dom'
import { fadeIn, fadeOut } from '@pluginjs/dom'
import { setStyle, showElement, hideElement } from '@pluginjs/styled'
import PopDialog from '@pluginjs/pop-dialog'
import Scrollable from '@pluginjs/scrollable'
import {
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

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  },
  INFO
)
class GalleryPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    this.components = deepMerge({}, this.components)
    addClass(`${this.classes.NAMESPACE}-input`, this.element)

    this.setupI18n()
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.createHtml()

    setStyle({ height: this.options.viewportSize }, this.$expandPanel)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    const value = this.options.parse(this.element.value)
    this.set(value)

    addClass(this.classes.EXIST, this.$wrap)
    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const that = this
    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (that.is('disabled')) {
            return false
          }

          const val = this.options.add.call(this)
          this.set(val)
          return null
        }
      },
      this.$initial
    )

    // add
    if (this.$infoAdd) {
      bindEvent(
        {
          type: this.eventName('click'),
          handler: () => {
            if (that.is('disabled')) {
              return false
            }

            const val = this.options.add.call(this)
            this.add(val)
            return null
          }
        },
        this.$infoAdd
      )
    }

    // info expand
    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disabled')) {
            return false
          }
          this.open()
          return null
        }
      },
      this.$infoEdit
    )

    // info
    compose(
      bindEvent({
        type: this.eventName('mouseenter'),
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          addClass(this.classes.HOVER, this.$info)
        }
      }),
      bindEvent({
        type: this.eventName('mouseleave'),
        handler: () => {
          if (this.is('disabled')) {
            return false
          }
          if (this.is('holdHover')) {
            return false
          }

          removeClass(this.classes.HOVER, this.$info)
          this.leave('holdHover')
          return null
        }
      })
    )(this.$info)

    compose(
      // change
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.ITEMRESELECT}`
        },
        handler: e => {
          if (this.is('disabled')) {
            return false
          }

          const url = this.options.change()
          const getElementIndex = el => {
            const parentElement = parent(el)
            return children(parentElement).indexOf(el)
          }
          const index = getElementIndex(
            parentWith(el => el.matches(`.${this.classes.ITEM}`), e.target)
          )
          this.change(index, url)
          return null
        }
      }),
      // save
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.EXPANDSAVEBTN}`
        },
        handler: () => {
          if (this.is('disbaled')) {
            return false
          }
          this.update()
          this.close()
          return null
        }
      }),
      // item overlay
      bindEvent({
        type: this.eventName('mouseover'),
        identity: {
          type: 'selector',
          value: `.${this.classes.ITEM}`
        },
        handler: e => {
          if (this.is('disabled')) {
            return false
          }
          const target = parentWith(
            el => el.matches(`.${this.classes.ITEM}`),
            e.target
          )
          addClass(this.classes.HOVER, target)
          return null
        }
      }),
      bindEvent({
        type: this.eventName('mouseout'),
        identity: {
          type: 'selector',
          value: `.${this.classes.ITEM}`
        },
        handler: e => {
          if (this.is('disabled')) {
            return false
          }

          if (this.is('holdHover')) {
            return false
          }
          const target = parentWith(
            el => el.matches(`.${this.classes.ITEM}`),
            e.target
          )
          removeClass(this.classes.HOVER, target)
          this.leave('holdHover')
          return null
        }
      }),
      // expand add
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.EXPANDADD}, .${this.classes.EXPANDADDBTN}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return false
          }
          const val = this.options.add.call(this)
          this.add(val)
          return null
        }
      }),
      // expand close
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.EXPANDCANCELBTN}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return false
          }
          const val = this.element.value
          this.set(this.options.parse(val))
          this.close()
          return null
        }
      })
    )(this.$expandPanel)

    // pop event
    this.pop.options.onShow = () => {
      this.enter('holdHover')
    }
    this.pop.options.onHide = () => {
      removeClass(this.classes.HOVER, this.$info)
      this.leave('holdHover')
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$expandPanel)
    removeEvent(this.eventName(), this.$info)
    removeEvent(this.eventName(), this.$infoExpand)
    removeEvent(this.eventName(), this.$initial)
    removeEvent(this.eventName(), this.$infoAdd)
  }

  createHtml() {
    const that = this
    this.$wrap = parseHTML(
      template.compile(this.options.templates.main())({
        namespace: this.classes.NAMESPACE,
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

    this.$initial = query(`.${this.classes.NAMESPACE}-initial`, this.$wrap)

    this.$info = query(`.${this.classes.NAMESPACE}-info`, this.$wrap)
    this.$infoCount = query(`.${this.classes.NAMESPACE}-info-count`, this.$wrap)
    this.$infoExpand = query(
      `.${this.classes.NAMESPACE}-info-expand`,
      this.$wrap
    )
    this.$infoEdit = query(`.${this.classes.INFOEDIT}`, this.$infoExpand)
    this.$infoRemove = query(`.${this.classes.INFOREMOVE}`, this.$infoExpand)
    this.$infoAdd = query(`.${this.classes.NAMESPACE}-info-add`, this.$wrap)
    this.$infoImage = query(`.${this.classes.NAMESPACE}-info-image`, this.$wrap)
    this.$expandPanel = query(
      `.${this.classes.NAMESPACE}-expand-panel`,
      this.$wrap
    )
    this.$expandAdd = query(`.${this.classes.EXPANDADD}`, this.$expandPanel)
    this.$expandItems = query(
      `.${this.classes.NAMESPACE}-expand-items`,
      this.$expandPanel
    )

    // init pop
    this.pop = PopDialog.of(this.$infoRemove, {
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
                  fadeIn({ duration: 100 }, that.$info)
                }
              },
              that.$info
            )

            resolve()
          }
        }
      }
    })
    hideElement(this.element)
  }

  update() {
    this.element.value = this.val()
    this.trigger(EVENTS.CHANGE, [this.value])
  }

  setState() {
    // const that = this;
    this.$infoCount.textContent = this.count
    if (this.count > 0) {
      // const $removeBtn = this.$infoExpand.find(`.${this.classes.INFOREMOVE}`);
      setStyle(
        { backgroundImage: `url(${this.getImageByIndex(this.count - 1)})` },
        this.$infoImage
      )
      removeClass(this.classes.EMPTY, this.$wrap)
    } else {
      setStyle({ backgroundImage: 'none' }, this.$infoImage)
      addClass(this.classes.EMPTY, this.$wrap)
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
        const popApi = PopDialog.of(
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
            }
          }
        )

        popApi.options.onShow = () => {
          this.enter('holdHover')
        }

        popApi.options.onHide = () => {
          removeClass(this.classes.HOVER, $item)
          this.leave('holdHover')
        }
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
    const oldScrollable = window.Pj.instances.scrollable.find(
      plugin => plugin.element === this.$expandItems
    )
    if (oldScrollable) {
      oldScrollable.destroy()
    }
    const scrollableApi = Scrollable.of(this.$expandItems)
    scrollableApi.scrollTo('vertical', '100%')
    scrollableApi.enable()
    scrollableApi.update()
  }

  clearImages() {
    const images = queryAll(`.${this.classes.ITEM}`, this.$expandPanel)
    if (images.length) {
      images.map(el => el.remove())
    }
  }

  val(value) {
    if (is.undefined(value)) {
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

  set(value) {
    if (is.array(value)) {
      this.value = value
    } else if (is.string(value)) {
      this.value = [value]
    } else {
      this.value = []
    }

    this.clearImages()
    this.count = this.value.length
    this.setState()
    this.updateList()
    this.update()
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
      setStyle({
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
    addClass(this.classes.EXPAND, removeClass(this.classes.EXIST, this.$wrap))
    this.updateScrollbar()
  }

  close() {
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
