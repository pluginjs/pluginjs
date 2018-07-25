import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import is from '@pluginjs/is'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  append,
  parseHTML,
  query,
  queryAll,
  unwrap,
  wrap,
  // wrapInner,
  children,
  parent,
  closest
} from '@pluginjs/dom'
import Pj from '@pluginjs/pluginjs'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import Keyboard from './keyboard'
import Popper from 'popper.js'
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
@optionable(true)
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Dropdown extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.parent = this.element.parentNode.parentNode
    this.$triggerBox = this.element.parentNode
    // options
    this.initOptions(DEFAULTS, options)
    this.firstClassName = this.$triggerBox.className

    // this.constraints = []
    // if (this.options.constraintToScrollParent) {
    //   this.constraints.push({
    //     to: 'scrollParent',
    //     attachment: 'together none'
    //   })
    // }

    // if (this.options.constraintToWindow) {
    //   this.constraints.push({
    //     to: 'window',
    //     attachment: 'together none'
    //   })
    // }

    this.initClasses(CLASSES)

    // theme
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$triggerBox)
    }

    // content
    if (this.options.data) {
      let items = ''

      const $panel = parseHTML(this.options.templates.panel())
      this.options.data.forEach(v => {
        const tag = v[this.options.itemValueAttr] || v.label
        items += templateEngine.render(this.options.templates.item(), {
          classes: this.classes,
          itemValueAttr: this.options.itemValueAttr,
          item: v,
          tag
        })
      })

      const $itemsEl = parseHTML(items)
      if (!$itemsEl.length) {
        append($itemsEl, $panel)
      } else {
        $itemsEl.map($item => append($item, $panel))
      }
      append($panel, this.parent)
      // this.parent.append($panel.append($items))
    }
    this.$panel = this.getPanel()
    wrap(`<div class='${this.classes.PANELWRAP}'></div>`, this.$panel)
    this.$panelWrap = this.$panel.parentNode

    this.$items = queryAll('li', this.$panel)
    this.$items.map(i => addClass(this.classes.ITEM, i))
    // init
    this.initStates()
    this.initialize()
  }

  initialize() {
    let parentClass = this.classes.WRAP

    this.active = null
    this.$markIndex = 0

    if (this.options.imitateSelect) {
      parentClass += ` ${this.classes.SELECTMODE}`
    }
    if (this.options.imitateSelect && this.options.inputLabel) {
      parentClass += ` ${this.classes.INPUTMODE}`
    }

    if (this.options.inputSelect || this.options.imitateSelect) {
      if (this.options.icon) {
        this.$icon = parseHTML(
          templateEngine.render(this.options.templates.icon(), {
            classes: this.classes,
            icon: this.options.icon ? this.options.icon : ''
          })
        )
        append(this.$icon, this.$triggerBox)
      }
    }
    parentClass.split(' ').map(c => addClass(c, this.parent))
    // addClass(parentClass, this.parent)
    addClass(this.classes.ELEMENT, this.$triggerBox)
    this.classes.PANEL.split(' ').map(className =>
      addClass(className, this.$panel)
    )
    this.bind()

    if (this.options.select !== null) {
      this.set(this.options.select)
    }

    this.setupPopper()

    this.handlePanelWidth()

    if (this.options.keyboard) {
      this.KEYBOARD = new Keyboard(this)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const that = this

    if (this.options.trigger === 'hover') {
      bindEvent(
        {
          type: 'mouseenter',
          handler: () => {
            if (this.is('disabled')) {
              return
            }
            this.show()
            return
          }
        },
        this.parent
      )

      bindEvent(
        {
          type: 'mouseleave',
          handler: () => {
            if (this.is('disabled')) {
              return
            }
            this.hide()
            return
          }
        },
        this.parent
      )
    } else {
      bindEvent(
        {
          type: this.options.trigger,
          handler: e => {
            if (this.is('disabled')) {
              return
            }

            this.triggerUsable = true
            this.trigger(EVENTS.TRIGGER, this, e)
            if (!this.triggerUsable) {
              return
            }

            if (this.options.inputLabel) {
              this.element.focus()
            }
            if (this.is('focus')) {
              return
            }

            this.toggle()
            return
          }
        },
        this.$triggerBox
      )

      if (this.element.className === 'input') {
        bindEvent(
          {
            type: 'focus.input',
            handler: () => {
              if (this.is('disabled')) {
                return
              }

              this.enter('focus')
              this.show()

              bindEvent(
                {
                  type: 'keydown.tab',
                  handler: e => {
                    if (e.keyCode === 9) {
                      this.hide()
                      removeClass(this.classes.FOCUS, this.parent)
                    }
                  }
                },
                this.element
              )
              return
            }
          },
          this.element
        )
        bindEvent(
          {
            type: 'blur.input',
            handler: () => {
              removeEvent('keydown.tab', this.element)
              this.leave('focus')
            }
          },
          this.element
        )
      }
    }
    bindEvent(
      {
        type: 'click',
        identity: {
          type: 'func',
          value: el => {
            if (!el.matches('li')) {
              return false
            }
            if (el.querySelectorAll('li').length) {
              return false
            }
            return el
          }
        },
        handler: e => {
          if (that.is('disabled')) {
            return
          }
          const $item = e.target
          that.itemUsable = true
          that.trigger(EVENTS.CLICK, this, $item)
          if (hasClass(that.classes.SELECTMODE, that.parent)) {
            addClass(that.classes.TRIGGERACTIVE, that.element)
          }

          if (!that.itemUsable) {
            return
          }

          that.set($item.dataset[that.options.itemValueAttr])
          if (that.options.hideOnSelect) {
            that.hide()
          }
          return
          // return false
        }
      },
      this.$panel
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.$triggerBox)
    removeEvent(this.eventName(), this.$panel)
    removeEvent(this.eventName(), this.parent)
  }

  handlePanelWidth() {
    if (this.options.width) {
      const width = this.options.width
      if (typeof width === 'string' || typeof width === 'number') {
        setStyle(
          {
            width,
            minWidth: 'inherit'
          },
          this.$panel
        )
      }

      if (typeof width === 'object') {
        const elementWidth = getStyle('width', width)
        setStyle(
          {
            width: elementWidth,
            minWidth: 'inherit'
          },
          this.$panel
        )
      }
    }
  }

  setWidth(width) {
    this.options.width = width
    this.handlePanelWidth()
  }

  replaceByData(data) {
    this.$items.map(i => i.remove())
    this.appendByData(data)
  }

  appendByData(data) {
    if (data) {
      // this.$panel.innerHTML = ''
      let items = ''

      data.forEach(v => {
        const tag = v[this.options.itemValueAttr] || v.label
        items += templateEngine.render(this.options.templates.item(), {
          classes: this.classes,
          itemValueAttr: this.options.itemValueAttr,
          item: v,
          tag
        })
      })

      const itemsEl = parseHTML(items)
      itemsEl.map($item => append($item, this.$panel))
    }
    this.$items = queryAll('li', this.$panel)
    this.$items.map(i => addClass(this.classes.ITEM, i))
  }

  setupPopper() {
    const config = {
      placement: this.options.placement,
      modifiers: { preventOverflow: { boundariesElement: 'viewport' } },
      onUpdate: data => {
        const placement = data.placement
        if (placement.indexOf('top') >= 0) {
          addClass(this.classes.PANELONTOP, this.parent)
        }

        if (placement.indexOf('bottom') >= 0) {
          removeClass(this.classes.PANELONTOP, this.parent)
        }
      }
    }

    if (
      !this.options.constraintToScrollParent &&
      this.options.constraintToWindow
    ) {
      config.modifiers.preventOverflow.boundariesElement = 'window'
    }

    if (
      this.options.constraintToScrollParent &&
      !this.options.constraintToWindow
    ) {
      config.modifiers.preventOverflow.boundariesElement = 'scrollParent'
    }

    this.POPPER = new Popper(this.$triggerBox, this.$panelWrap, config)

    this.enter('popper')
  }

  toggle() {
    if (this.is('show')) {
      this.hide()
    } else {
      this.show()
    }
  }

  show() {
    if (this.is('show')) {
      return false
    }

    if (this.options.hideOutClick) {
      bindEvent(
        {
          type: 'click',
          handler: e => {
            if (!this.is('show')) {
              return
            }

            const target = e.target
            if (
              !closest(`.${this.classes.NAMESPACE}`, target) &&
              !closest(`.${this.classes.PANEL}`, target)
            ) {
              this.hide()
              return
            }
            // this.hide()
            return
          }
        },
        Pj.doc
      )
    }
    /*eslint-disable*/
    if (this.options.exclusive) {
      Pj.instances[this.plugin].map(dropdown => {
        if (dropdown.is('show')) {
          dropdown.hide()
        }
      })
    }

    if (this.options.keyboard) {
      if (this.active !== null) {
        this.$markIndex = children(parent(this.active)).indexOf(this.active)
      }
      this.markItem(null, true)
    }

    this.enter('show')
    addClass(this.classes.SHOW, this.$triggerBox) //--------------------this.$element
    addClass(this.classes.SHOW, this.$panelWrap)

    if (this.is('popper')) {
      this.POPPER.enableEventListeners()
      this.POPPER.scheduleUpdate()
    }
    this.trigger(EVENTS.SHOW)
    return undefined
  }

  hide() {
    if (!this.is('show')) {
      return false
    }

    this.leave('show')

    if (this.options.hideOutClick) {
      removeEvent('click', Pj.doc)
    }

    if (this.is('popper')) {
      this.POPPER.disableEventListeners()
    }
    removeClass(this.classes.SHOW, this.$triggerBox) //----------------------------this.element
    removeClass(this.classes.SHOW, this.$panelWrap)

    this.trigger(EVENTS.HIDE)

    return undefined
  }

  set(value) {
    if (typeof value === "undefined") {
      return
    }

    if (this.options.imitateSelect) {
      this.text = null

      this.$items.map(($item, index) => {
        if ($item.dataset[this.options.itemValueAttr] === value) {
          this.selectItem($item)
          this.value = value
          if (!is.undefined($item.textContent)) {
            this.text = $item.textContent
          }
        }
      })

      if (is.null(this.active)) {
        return
      }

      if (this.element.tagName === 'INPUT') {//---------------------this.$label
        this.element.value = this.text//---------------------
      } else {
        this.element.innerHTML = this.text//---------------------
      }

      if (this.is('initialized')) {
        this.trigger(EVENTS.CHANGE, this.active)
      }
    }
  }

  generateMask() {
    this.$mask = document.createElement('div')
    addClass(this.classes.MASK, this.$mark)
    // .show()
    append(this.$mark, document.body)
    bindEvent(
      {
        type: 'click',
        handler: () => {
          this.hide()
          return
        }
      },
      this.$mark
    )
  }

  clearMask() {
    if (this.$mark) {
      removeEvent('click', this.$mark)
      this.$mark.remove()
      this.$mark = null
    }
  }

  getPanel() {
    if (this.options.panel === '+') {
      return this.$triggerBox.nextElementSibling   //------------------------this.$element
    }
    if (is.domNode(this.options.panel)) {
      return this.options.panel
    } else if (is.string(this.options.panel)) {
      return query(this.options.panel)
    }
      }

  get() {
    return this.value
  }

  getActiveItem() {
    return query(`.${this.classes.ACITVE}`, this.$panel)
  }

  update(html) {
    this.$panel.innerHTML = html
  }

  selectItem(item) {
    if (!is.null(this.active)) {
      removeClass(this.classes.ACITVE, this.active)
    }

    this.active = item
    addClass(this.classes.ACITVE, this.active)
  }

  markItem(action, trigger = false) {
    switch (action) {
      case 'up':
        if (this.$markIndex > 0) {
          this.$markIndex--
          trigger = true
        }
        break
      case 'down':
        if (this.$markIndex < this.$items.length - 1) {
          this.$markIndex++
          trigger = true
        }
        break
      default:
        break
    }

    if (trigger) {
      this.$items.map($item => removeClass(this.classes.HOVER, $item))
      addClass(this.classes.HOVER, this.$items[this.$markIndex])
    }
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false//---------------------this.$label
      this.leave('disabled')
    }
    removeClass(this.classes.DISABLED, this.parent)
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.element.disabled = true//---------------------this.$label
      this.enter('disabled')
    }
    addClass(this.classes.DISABLED, this.parent)
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.hide()
      this.unbind()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$triggerBox)  //--------------------this.element
      }

      this.POPPER.destroy()
      this.$triggerBox.innerHTML = ''    //--------------------this.$element
      this.$triggerBox.className = this.firstClassName   //--------------------this.$element

      if (this.options.data) {
        unwrap(this.$panel)
        this.$panel.remove()
        this.$items.map($item => $item.remove())
        removeClass(this.classes.WRAP, this.parent)
      } else if (this.options.panel === '+') {
        unwrap(this.$panel)
        removeClass(this.classes.PANEL, this.$panel)
        this.$items.map($item => removeClass(this.classes.ITEM, $item))
        removeClass(this.classes.WRAP, this.parent)
      } else {
        this.$panelWrap.remove()
        removeClass(this.classes.WRAP, this.parent)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  resize() {
    if (!this.is('disabled')) {
      this.handlePanelWidth()
    }
  }
}

export default Dropdown
