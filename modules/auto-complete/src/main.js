import Component from '@pluginjs/component'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { debounce, deepMerge, compose } from '@pluginjs/utils'
import {
  query,
  queryAll,
  unwrap,
  wrap,
  parseHTML,
  parent,
  children,
  getObjData,
  setObjData,
  parentWith
} from '@pluginjs/dom'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { getStyle, setStyle, showElement, hideElement } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import Popper from 'popper.js'
import Pj, {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/pluginjs'
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
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class AutoComplete extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.$element = this.element
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)

    wrap(
      parseHTML(`<div class="${this.classes.NAMESPACE}"></div>`),
      this.$element
    )

    this.$wrapper = parent(this.$element)

    this.data = this.options.data
    this.$panel = null
    this.$selected = null

    this.initStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrapper)
    }

    this.create()
    this.setupPopper()

    this.initData()
    this.bind()

    if (this.$element.disabled || this.options.disabled) {
      this.disable()
    }

    this.triggerCloseButten()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  create() {
    this.firstClassName = this.$element.className
    addClass(this.classes.INPUT.split(' '), this.$element)
    this.$element.setAttribute('placeholder', this.options.placeholder)
    this.$panel = parseHTML(
      template.compile(this.options.templates.panel())({
        classes: this.classes
      })
    )

    // close button
    this.$close = parseHTML(
      template.compile(this.options.templates.icon())({
        classes: this.classes,
        icon: 'icon-char icon-close-mini'
      })
    )

    this.$wrapper.append(this.$panel, this.$close)
    const panelWidth = this.options.panelWidth
      ? this.options.panelWidth
      : getStyle('width', this.$element)
    setStyle({ width: panelWidth }, this.$panel)

    if (this.options.keyboard) {
      this.$element.setAttribute('tabindex', 1)
    }
    if (!this.options.ajax) {
      this.handleEl(this.data)
    }
  }

  setupPopper() {
    this.POPPER = new Popper(this.$element, this.$panel, {
      placement: 'bottom',
      modifiers: { preventOverflow: { boundariesElement: 'window' } },
      onUpdate: data => {
        const placement = data.placement

        if (placement.indexOf('top') >= 0) {
          addClass(this.classes.PANELONTOP, this.$wrapper)
        }

        if (placement.indexOf('bottom') >= 0) {
          removeClass(this.classes.PANELONTOP, this.$wrapper)
        }
      }
    })
  }

  initData() {
    const val = this.$element.value
    if (val) {
      this.set(val)
    }
  }

  build(data, wrap) {
    data.forEach(v => {
      let label = v
      let value = v

      if (is.object(v)) {
        label = v.label
        value = v.value
      }

      if (is.array(v)) {
        label = v[0]
        value = v[1]
      }
      const $item = parseHTML(
        template.compile(this.options.templates.item())({
          classes: this.classes,
          contents: label
        })
      )

      const data = { label, value }

      setObjData('data', data, $item)
      wrap.append($item)
    })
  }

  buildGroup(data, wrap) {
    data.forEach(v => {
      const title = v.id
      const $group = parseHTML(
        template.compile(this.options.templates.group())({
          classes: this.classes,
          group: title,
          title: title.toUpperCase()
        })
      )

      const $contents = query(`.${this.classes.GROUPCONTENTS}`, $group)

      wrap.append($group)
      this.build(v.list, $contents)
    })
  }

  handleEl(data) {
    if (this.options.group) {
      this.buildGroup(data, this.$panel)
    } else {
      this.build(data, this.$panel)
    }

    this.$items = this.getItems()
  }

  triggerCloseButten() {
    if (this.is('disabled')) {
      hideElement(this.$close)
      return
    }
    showElement(this.$close)

    if (this.is('hover') || this.is('focus')) {
      this.isShowButton()
    } else {
      hideElement(this.$close)
    }
  }

  bind() {
    // input event
    bindEvent(
      {
        type: this.eventName('input'),
        handler: ({ target }) => {
          const val = target.value
          if (val.length <= 0 || val.length < this.options.minChars) {
            if (this.is('open')) {
              this.close()
            }
            return
          }
          if (this.options.ajax) {
            children(this.$panel).map(el => el.remove())

            debounce(this.options.source.call(this, val), 200)
          }

          debounce(this.search(val), 200)
        }
      },
      this.$element
    )

    compose(
      bindEvent({
        type: this.eventName('click'),
        identity: `.${this.classes.CLOSE}`,
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.$element.value = ''
          hideElement(this.$close)
        }
      }),
      bindEvent({
        type: this.eventName('mouseleave'),
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.leave('hover')
          hideElement(this.$close)
        }
      }),
      bindEvent({
        type: this.eventName('mouseenter'),
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.enter('hover')
          this.isShowButton()
        }
      })
    )(this.$wrapper)

    compose(
      bindEvent({
        type: this.eventName('mouseover'),
        identity: `.${this.classes.ITEM}`,
        handler: ({ target }) => {
          const hasItemClass = hasClass(this.classes.ITEM)
          const $item = hasItemClass(target)
            ? target
            : parentWith(hasItemClass, target)
          this.$selected = $item
          removeClass(
            this.classes.ACTIVE,
            queryAll(`.${this.classes.ITEM}`, this.$panel)
          )
          addClass(this.classes.ACTIVE, $item)
        }
      }),
      bindEvent({
        type: this.eventName('click'),
        identity: `.${this.classes.ITEM}`,
        handler: ({ target }) => {
          const hasItemClass = hasClass(this.classes.ITEM)
          const $item = hasItemClass(target)
            ? target
            : parentWith(hasItemClass, target)
          this.$selected = $item
          this.close()
          // console.log(getObjData('data', $item))
          this.trigger(EVENTS.CHANGE, getObjData('data', $item))
        }
      })
    )(this.$panel)

    if (this.options.keyboard) {
      compose(
        bindEvent({
          type: this.eventName('blur'),
          handler: () => {
            this.leave('focus')
            removeEvent('keydown', this.$element)
          }
        }),
        bindEvent({
          type: this.eventName('focus'),
          handler: () => {
            this.enter('focus')
            bindEvent(
              {
                type: this.eventName('keydown'),
                handler: e => {
                  this.triggerCloseButten()
                  if (e.keyCode === 40 && e.which === 40) {
                    // down
                    this.next()
                    e.preventDefault()
                  }
                  if (e.keyCode === 38 && e.which === 38) {
                    // up
                    this.prev()
                    e.preventDefault()
                  }
                  if (e.keyCode === 13 && e.which === 13) {
                    // update
                    this.close()
                    this.trigger(
                      EVENTS.CHANGE,
                      getObjData('data', this.$selected),
                      this
                    )
                    e.preventDefault()
                  }
                }
              },
              this.$element
            )
          }
        })
      )(this.$element)
    }

    bindEvent(
      {
        type: this.eventName('click'),
        handler: e => {
          if (this.is('open')) {
            if (!this.$panel.contains(e.target)) {
              this.close()
              return false
            }
          }

          return null
        }
      },
      Pj.doc
    )
  }

  isShowButton() {
    if (this.$element.value) {
      showElement(this.$close)
    } else {
      hideElement(this.$close)
    }
  }

  unbind() {
    // this.$wrapper.off(this.eventName());
    removeEvent(this.eventName(), this.$element)
    removeEvent(this.eventName(), this.$wrapper)
    removeEvent(this.eventName(), document)
  }

  search(key) {
    const that = this

    let count = 0

    if (this.options.group) {
      removeClass(
        this.classes.GROUPSHOW,
        find(`.${this.classes.GROUP}`, this.$panel)
      )
    }

    this.$items.forEach($item => {
      removeClass(that.classes.SHOW, $item)
      const val = getObjData('data', $item).label

      if (that.compare(key, val)) {
        if (count >= that.options.maxItems) {
          return
        }
        that.render(key, val, $item)
        count++
      }
    })

    if (count === 0) {
      this.clear()

      return false
    }

    return true
  }

  render(key, value, $item) {
    const data = {
      label: getObjData('data', $item).label,
      value: getObjData('data', $item).value
    }

    let content = this.options.render(data, $item)
      ? this.options.render(data, $item)
      : value

    // if (this.options.highlight) {
    let REG
    if (this.options.sensitivity) {
      REG = new RegExp(key, 'g')
    } else {
      REG = new RegExp(key, 'gi')
    }

    const val = value.replace(REG, match =>
      template.compile(this.options.templates.mark())({
        classes: this.classes,
        contents: match
      })
    )

    data.label = val
    content = this.options.render(data, $item)
      ? this.options.render(data, $item)
      : val
    // }

    // this.color(key, content)
    $item.innerHTML = content
    addClass(this.classes.SHOW, $item)
    if (this.options.group) {
      addClass(
        this.classes.GROUPSHOW,
        parentWith(el => el.matches(`.${this.classes.GROUP}`), $item)
      )
    }

    this.$selected = queryAll(`.${this.classes.SHOW}`, this.$panel)[0]
    this.$shows = queryAll(`.${this.classes.SHOW}`, this.$panel)

    this.$shows.map(removeClass(this.classes.ACTIVE))
    addClass(this.classes.ACTIVE, this.$selected)

    this.open()
  }

  compare(key, val) {
    const keySize = key.length
    const valSize = val.length

    if (keySize > valSize) {
      return false
    }

    if (!this.options.sensitivity) {
      key = key.toLowerCase()
      val = val.toLowerCase()
    }

    if (keySize === valSize) {
      return key === val
    }

    if (val.indexOf(key) < 0) {
      return false
    }

    return true
  }

  next() {
    this.$shows.forEach((val, index) => {
      let $next

      if (this.$selected === val && this.$shows[index + 1]) {
        $next = this.$shows[index + 1]

        queryAll(`.${this.classes.ITEM}`, this.$panel).map(
          removeClass(this.classes.ACTIVE)
        )
        this.$selected = addClass(this.classes.ACTIVE, $next)
        return false
      }

      return null
    })
  }

  prev() {
    this.$shows.forEach((val, index) => {
      let $prev

      if (this.$selected === val && this.$shows[index - 1]) {
        $prev = this.$shows[index - 1]

        queryAll(`.${this.classes.ITEM}`, this.$panel).map(
          removeClass(this.classes.ACTIVE)
        )
        this.$selected = addClass(this.classes.ACTIVE, $prev)
        return false
      }

      return null
    })
  }

  open() {
    if (!hasClass(this.classes.OPEN, this.$panel)) {
      addClass(this.classes.OPEN, this.$element)
      addClass(this.classes.OPEN, this.$panel)
      // console.log(this.$panel)
      this.enter('open')

      this.POPPER.scheduleUpdate()
    }
  }

  close() {
    removeClass(this.classes.OPEN, this.$element)
    removeClass(this.classes.OPEN, this.$panel)
    if (this.$items) {
      removeClass(this.classes.SHOW, this.$items)
    }
    if (this.$selected) {
      removeClass(this.classes.ACTIVE, this.$selected)
    }
    if (this.options.group) {
      queryAll(`.${this.classes.GROUP}`, this.$panel).map(
        removeClass(this.classes.SHOW)
      )
    }

    this.leave('open')
  }

  getItems() {
    return queryAll(`.${this.classes.ITEM}`, this.$panel)
  }
  clear() {
    this.$items.map(removeClass(this.classes.SHOW))
  }

  set(value) {
    this.$element.value = value
    // console.log(value)
  }

  get() {
    return this.$element.value
  }

  val(value) {
    if (is.undefined(value)) {
      return this.get()
    }

    this.set(value)

    return null
  }

  enable() {
    if (this.is('disabled')) {
      if (hasClass(this.classes.DISABLED, this.$element)) {
        removeClass(this.classes.DISABLED, this.$element)
      }
      this.leave('disabled')
      this.triggerCloseButten()
      this.$element.disabled = false
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      if (!hasClass(this.classes.DISABLED, this.$element)) {
        addClass(this.classes.DISABLED, this.$element)
      }
      this.triggerCloseButten()
      this.enter('disabled')
      this.$element.disabled = true
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrapper)
      }
      this.POPPER.destroy()
      unwrap(this.$element)
      this.$element.className = this.firstClassName
      this.$element.setAttribute('placeholder', null)
      this.leave('initialized')
    }
    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default AutoComplete
