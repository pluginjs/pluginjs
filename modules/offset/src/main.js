import Component from '@pluginjs/component'
import UNITS from '@pluginjs/units'
import TOOLTIP from '@pluginjs/tooltip'
import { isObject, isNumber } from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle, offset as getOffset } from '@pluginjs/styled' // getStyle
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  parentWith,
  children,
  parseHTML,
  queryAll,
  query,
  setData,
  getData,
  insertAfter,
  closest
} from '@pluginjs/dom'
import { each } from '@pluginjs/utils'
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

const KEYS = {
  'margin-top': '',
  'margin-right': '',
  'margin-bottom': '',
  'margin-left': '',
  'padding-top': '',
  'padding-right': '',
  'padding-bottom': '',
  'padding-left': ''
}

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
class Offset extends Component {
  constructor(element, options = {}) {
    super(element)

    this.$doc = document.body

    this.setupOptions(options)
    this.setupClasses()
    this.setupI18n()

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.create()

    addClass(this.classes.NAMESPACE, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }
    this.value = Object.assign({}, KEYS, this.options.data)
    const attrData = this.options.parse(this.element.value)
    if (attrData) {
      this.value = Object.assign({}, KEYS, attrData)
    }

    this.data = {}
    this.set(this.value, false, true)

    setStyle('display', 'none', this.element)

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
      this.eventName('units:changeInput'),
      (e, api, val) => {
        if (that.is('disabled')) {
          return
        }
        const info = getData(
          'info',
          parentWith(hasClass(this.classes.ITEM), e.target)
        )
        const key = e.target.getAttribute('name')
        const newData = {}

        info.value = val ? val : ''

        newData[key] = info
        this.set(newData, true)
        children(this.$inner)
          .filter(el => el.matches('div'))
          .map(removeClass(this.classes.UNITSHOW))
      },
      this.$wrap
    )

    bindEvent(
      this.eventName('mousedown'),
      'label',
      e => {
        if (that.is('disabled')) {
          return
        }
        const target = closest('label', e.target)
        const id = target.getAttribute('for')
        let direction
        if (
          id === 'marginLeft' ||
          id === 'marginRight' ||
          id === 'paddingLeft' ||
          id === 'paddingRight'
        ) {
          direction = 'horizontal'
        } else if (
          id === 'marginTop' ||
          id === 'marginBottom' ||
          id === 'paddingTop' ||
          id === 'paddingBottom'
        ) {
          direction = 'vertical'
        }
        const rightclick = e.which ? e.which === 3 : e.button === 2
        if (rightclick) {
          return
        }
        that.mousedown(target, direction, e)
        return
      },
      this.$wrap
    )

    bindEvent(
      this.eventName('click'),
      `.${this.classes.VIEW}`,
      e => {
        if (that.is('disabled')) {
          return
        }
        const $this = closest(`.${this.classes.VIEW}`, e.target)
        const $el = query(
          `.${that.classes.NAMESPACE}-${$this.dataset.value}`,
          this.$wrap
        )
        const $unit = queryAll('input', $el)[1]
        const unit = that.data[$unit.getAttribute('name')].unit

        const api = getData('units', $unit)
        api.setUnit(unit)
        // api.setWidth(getStyle('width', $unit))
        Array.from(this.$inner.children).map(c =>
          removeClass(that.classes.UNITSHOW, c)
        )
        addClass(that.classes.UNITSHOW, $el)
        queryAll('input', $el)[0].focus()
      },
      this.$wrap
    )

    bindEvent(
      this.eventNameWithId('click'),
      e => {
        const target = e.target
        if (
          hasClass(this.classes.VIEW, target) ||
          closest('.pj-units', target)
        ) {
          return
        }
        Array.from(this.$inner.children).map(c =>
          removeClass(that.classes.UNITSHOW, c)
        )
      },
      this.$doc
    )

    bindEvent(
      this.eventName('click'),
      `.${this.classes.CONNECT}`,
      e => {
        if (that.is('disabled')) {
          return
        }
        const $this = closest(`.${this.classes.CONNECT}`, e.target)

        if (that.is('connect')) {
          removeClass(that.classes.CONNECTACTIVE, $this)
          that.leave('connect')
          return
        }

        addClass(that.classes.CONNECTACTIVE, $this)
        that.enter('connect')
      },
      this.$wrap
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    removeEvent(this.eventNameWithId(), this.$doc)
  }

  create() {
    this.$wrap = parseHTML(
      template.compile(this.options.template())({
        classes: this.classes
      })
    )

    insertAfter(this.$wrap, this.element)

    this.$items = queryAll(`.${this.classes.ITEM}`, this.$wrap)

    this.$inner = query(`.${this.classes.INNER}`, this.$wrap)
    this.$view = query(`.${this.classes.VIEW}`, this.$wrap)
    this.$marginTop = query(`.${this.classes.MARGINTOP}`, this.$wrap)
    this.$marginRight = query(`.${this.classes.MARGINRIGHT}`, this.$wrap)
    this.$marginBottom = query(`.${this.classes.MARGINBOTTOM}`, this.$wrap)
    this.$marginLeft = query(`.${this.classes.MARGINLEFT}`, this.$wrap)
    this.$paddingTop = query(`.${this.classes.PADDINGTOP}`, this.$wrap)
    this.$paddingRight = query(`.${this.classes.PADDINGRIGHT}`, this.$wrap)
    this.$paddingBottom = query(`.${this.classes.PADDINGBOTTOM}`, this.$wrap)
    this.$paddingLeft = query(`.${this.classes.PADDINGLEFT}`, this.$wrap)
    this.$link = query(`.${this.classes.CONNECTLINK}`, this.$wrap)
    this.$unlink = query(`.${this.classes.CONNECTUNLINK}`, this.$wrap)

    this.setUnits(this.$marginTop, 'margin-top')
    this.setUnits(this.$marginRight, 'margin-right')
    this.setUnits(this.$marginBottom, 'margin-bottom')
    this.setUnits(this.$marginLeft, 'margin-left')
    this.setUnits(this.$paddingTop, 'padding-top')
    this.setUnits(this.$paddingRight, 'padding-right')
    this.setUnits(this.$paddingBottom, 'padding-bottom')
    this.setUnits(this.$paddingLeft, 'padding-left')

    this.initTooltip()
  }

  setUnits($el, name) {
    let units = { px: true, em: true, rem: true, '%': true }
    if (name.split('-')[0] === 'padding') {
      units = { px: true, em: true, rem: true, '%': true }
    }

    const that = this

    const $input = query('input', $el)

    $input.setAttribute('name', name)
    const apiDate = new UNITS($input, {
      theme: 'default',
      units,
      defaultUnit: this.options.defaultUnit,
      onChangeUnit(unit) {
        if (that.is('disabled')) {
          return
        }

        const newData = {}
        let val = this.get(unit).input
        if (val === null) {
          val = ''
        }
        newData[$input.getAttribute('name')] = val + this.get(unit).unit
        that.set(newData, true)
      },
      onChangeInput(value) {
        if (that.is('disabled')) {
          return
        }
        const $item = parentWith(hasClass(that.classes.ITEM), $input)
        const info = getData('info', $item)
        const key = $input.getAttribute('name')
        const newData = {}

        info.input = value ? value : ''

        newData[key] = info
        that.set(newData, true)
        Array.from(that.$inner.children).map(c =>
          removeClass(that.classes.UNITSHOW, c)
        )
      }
    })
    setData('units', apiDate, $input)
  }

  initTooltip() {
    this.link = new TOOLTIP(this.$link, {
      theme: 'light',
      title: this.translate('brokenLink'),
      placement: 'bottom'
    })

    this.unlink = new TOOLTIP(this.$unlink, {
      theme: 'light',
      title: this.translate('keepLink'),
      placement: 'bottom'
    })
  }

  mousedown(label, direction, e) {
    this.disableTooltip()
    //
    const that = this
    const id = label.getAttribute('for')
    const first =
      direction === 'horizontal'
        ? getOffset(query(`#${id}`, this.$wrap)).left
        : getOffset(query(`#${id}`, this.$wrap)).top
    const start = direction === 'horizontal' ? e.pageX : e.pageY
    let end

    this.mousemove = e => {
      e.preventDefault()
      end = (direction === 'horizontal' ? e.pageX : e.pageY) || start
      const position = Math.ceil((first + end - start) / 3)
      that.move(id, position)
      return false
    }

    this.mouseup = function() {
      this.enableTooltip()
      //
      removeEvent(this.eventNameWithId('mousemove'), this.$doc)
      removeEvent(this.eventNameWithId('mouseup'), this.$doc)
      const $this = query(`#${id}`, this.$wrap)
      let value = $this.value
      const key = $this.getAttribute('name')
      // const unit = $this.asUnits('getUnit')
      const unit = getData('units', $this).getUnit()
      const val = {}
      if (isNumber(value)) {
        value = 0
      }

      val[key] = {
        input: value,
        unit
      }
      that.set(val, true)
      return false
    }

    bindEvent(
      this.eventNameWithId('mousemove'),
      this.mousemove.bind(this),
      this.$doc
    )
    bindEvent(
      this.eventNameWithId('mouseup'),
      this.mouseup.bind(this),
      this.$doc
    )
    return false
  }

  move(id, position) {
    const $this = query(`#${id}`, this.$wrap)

    const key = $this.getAttribute('name')
    const inputValue = this.data[key].input
    let value

    if (
      id === 'marginRight' ||
      id === 'marginBottom' ||
      id === 'paddingRight' ||
      id === 'paddingBottom'
    ) {
      value = inputValue + position
    } else {
      value = inputValue - position
    }
    $this.value = value

    query(`[data-value="${id}"]`, this.$wrap).innerHTML = `${value}${getData(
      'units',
      $this
    ).getUnit()}`
  }

  setView() {
    this.$items.map((item, i) => { /* eslint-disable-line */
      const $input = queryAll('input', item)[1]
      const key = $input.getAttribute('name')
      const $view = query(`.${this.classes.VIEW}`, item)
      const info = getData('info', item)
      if (info && info.input === '') {
        $view.innerHTML = '-'
        return /* eslint-disable-line */
      }
      if (info && info.input === 0) {
        $view.innerHTML = 0
        return /* eslint-disable-line */
      }
      $view.innerHTML = `${this.data[key].input}${this.data[key].unit}`
    })
  }

  update(trigger = true) {
    if (this.value === null) {
      this.value = {}
    }

    const data = {}

    each(this.value, (i, v) => {
      if (v !== '') {
        data[i] = v
      }
    })
    this.element.value = this.options.process.call(this, data)
    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.value)
    }
  }

  clear(update = true) {
    this.value = KEYS
    if (update !== false) {
      this.set(this.value)
    }
  }

  set(value, only, trigger = true) {
    if (!value || typeof value === 'undefined') {
      return
    }

    each(value, (i, v) => {
      if (isObject(v)) {
        value[i] = `${v.input}${v.unit}`
      }
    })

    if (only) {
      each(value, (i, v) => {
        this.value[i] = v
      })

      if (this.is('connect')) {
        let key
        let name
        let val /* eslint-disable-line */

        each(value, (i, v) => { /* eslint-disable-line */
          name = i
          key = i.split('-')[0]
          val = value[i]
        })

        each(this.value, (i, v) => { /* eslint-disable-line */
          if (i.indexOf(key) > -1) {
            this.value[i] = value[name]
          }
        })
      }
    } else {
      each(value, (i, v) => { /* eslint-disable-line */
        if (value[i]) {
          this.value[i] = value[i]
        } else {
          this.value[i] = ''
        }
      })
    }

    each(this.value, (i, v) => {
      const input = query(`[name="${i}"]`, this.$wrap)

      const $item = parentWith(hasClass(this.classes.ITEM), input)
      const api = getData('units', input)

      const info = this.parse(v)
      this.data[i] = info
      setData('info', info, $item)

      api.set(info)
    })

    this.setView()

    this.update(trigger)
  }

  parse(value) {
    if (isObject(value)) {
      return value
    }
    const units = ['px', 'em', 'rem', '%']

    if (value === '') {
      return {
        input: '',
        unit: 'px'
      }
    }

    if (units.indexOf(value) > -1) {
      return {
        input: '',
        unit: value
      }
    }

    const val = parseFloat(value, 10)
    const unit = value.split(val)[1]
    return {
      input: val,
      unit
    }
  }

  get() {
    return this.value
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    return this.set(this.options.parse.call(this, value))
  }

  disableTooltip() {
    this.link.disable()
    this.unlink.disable()
  }

  enableTooltip() {
    this.link.enable()
    this.unlink.enable()
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false
      this.enableTooltip()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = true
      this.disableTooltip()
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      this.element.display = ''
      this.$wrap.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Offset
