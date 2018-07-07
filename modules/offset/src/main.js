import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import UNITS from '@pluginjs/units'
import TOOLTIP from '@pluginjs/tooltip'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle, getStyle, getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  closest,
  children,
  parseHTML,
  queryAll,
  query,
  setObjData,
  getObjData,
  insertAfter,
  childQuery,
  Each
} from '@pluginjs/dom'
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
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Offset extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.doc = document.body

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)
    this.setupI18n()

    this.initStates()
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

    // $.each(this.value, (i, v) => {
    //   this.value[i] = this.parse(v);
    // });

    this.data = {}

    this.set(this.value)

    setStyle({ display: 'none' }, this.element)

    this.bind()
    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const that = this
    // bindEvent({
    //   type: 'units:change',
    //   handler: (e, instance, unit) => {
    //     if (that.is('disabled')) {
    //       return
    //     }
    //     const $this = $(e.target)
    //     const $trigger = $this.next()
    //     const newData = {}
    //
    //     newData[$this.attr('name')] = instance.get(unit)
    //
    //     if (unit === 'auto') {
    //       $trigger.addClass(`${this.classes.NAMESPACE}-unit-auto`)
    //     } else {
    //       $trigger.removeClass(`${this.classes.NAMESPACE}-unit-auto`)
    //     }
    //
    //     // newData = Object.assign({}, this.data, newData);
    //
    //     this.set(newData, true)
    //   }
    // }, this.$wrap)

    bindEvent(
      {
        type: 'units:changeVal',
        handler: ({
          target,
          detail: {
            data: [val]
          }
        }) => {
          if (that.is('disabled')) {
            return
          }
          const info = getObjData(
            'info',
            closest(`.${this.classes.ITEM}`, target)
          )
          const key = target.getAttribute('name')
          const newData = {}

          info.value = val ? val : ''

          newData[key] = info

          this.set(newData, true)
          children(this.$inner)
            .filter(el => el.matches('div'))
            .map(removeClass(this.classes.UNITSHOW))
        }
      },
      this.$wrap
    )

    bindEvent(
      {
        type: this.eventName('mousedown'),
        identity: {
          type: 'tagName',
          value: 'label'
        },
        handler: e => {
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
        }
      },
      this.$wrap
    )

    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.VIEW}`,
        handler: e => {
          if (that.is('disabled')) {
            return
          }
          const $this = closest(`.${this.classes.VIEW}`, e.target)
          const $el = query(
            `.${that.classes.NAMESPACE}-${$this.dataset.value}`,
            this.$wrap
          )
          const $unit = query('input', $el)
          const unit = that.data[$unit.getAttribute('name')].unit

          const api = getObjData('units', $unit)
          api.toggleUnit(unit)
          api.setWidth(getStyle('width', $unit))
          Array.from(this.$inner.children).map(c =>
            removeClass(that.classes.UNITSHOW, c)
          )
          addClass(that.classes.UNITSHOW, $el)
          query('input', $el).focus()
        }
      },
      this.$wrap
    )

    bindEvent(
      {
        type: this.eventName('click'),
        handler: e => {
          const target = e.target
          if (
            hasClass(this.classes.VIEW, target) ||
            closest('.pj-units-wrap', target)
          ) {
            return
          }
          Array.from(this.$inner.children).map(c =>
            removeClass(that.classes.UNITSHOW, c)
          )
        }
      },
      document.body
    )

    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.CONNECT}`,
        handler: e => {
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
        }
      },
      this.$wrap
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    removeEvent(this.eventName(), document.body)
  }

  create() {
    this.$wrap = parseHTML(
      template.compile(this.options.template())({
        namespace: this.classes.NAMESPACE,
        view: this.classes.VIEW
      })
    )

    insertAfter(this.$wrap, this.element)

    this.items = queryAll(`.${this.classes.ITEM}`, this.$wrap)

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
    let units = ['px', 'em', 'rem', '%', 'auto']
    if (name.split('-')[0] === 'padding') {
      units = ['px', 'em', 'rem', '%']
    }

    const that = this

    const input = query('input', $el)
    input.setAttribute('name', name)
    const apiDate = new UNITS(input, {
      theme: 'default',
      data: units,
      defaultUnit: this.options.defaultUnit,
      onChange(unit) {
        if (that.is('disabled')) {
          return
        }

        const trigger = input.nextElementSibling
        const newData = {}

        newData[input.getAttribute('name')] = this.get(unit)

        if (unit === 'auto') {
          addClass(`${this.classes.NAMESPACE}-unit-auto`, trigger)
        } else {
          removeClass(`${this.classes.NAMESPACE}-unit-auto`, trigger)
        }

        that.set(newData, true)
      },
      onChangeVal(value) {
        if (that.is('disabled')) {
          return
        }
        const item = closest(`.${that.classes.ITEM}`, input)
        const info = getObjData('info', item)
        const key = input.getAttribute('name')
        const newData = {}

        info.value = value ? value : ''

        newData[key] = info

        that.set(newData, true)
        Array.from(that.$inner.children).map(c =>
          removeClass(that.classes.UNITSHOW, c)
        )
      }
    })
    setObjData('units', apiDate, input)
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
      removeEvent('mousemove', document.body)
      removeEvent('mouseup', document.body)
      const $this = query(`#${id}`, this.$wrap)
      let value = $this.value
      const key = $this.getAttribute('name')
      // const unit = $this.asUnits('getUnit')
      const unit = getObjData('units', $this).getUnit()
      const val = {}
      if (!is.number(parseInt(value))) {
        value = 0
      }

      if (unit === 'auto') {
        val[key] = {
          value: '',
          unit: 'auto'
        }
      } else {
        val[key] = {
          value,
          unit
        }
      }

      that.set(val, true)
      return false
    }

    bindEvent(
      {
        type: 'mousemove',
        handler: this.mousemove.bind(this)
      },
      document.body
    )
    bindEvent(
      {
        type: 'mouseup',
        handler: this.mouseup.bind(this)
      },
      document.body
    )
    return false
  }

  move(id, position) {
    const $this = query(`#${id}`, this.$wrap)
    const api = getObjData('units', $this)
    if (api.getUnit() === 'auto') {
      childQuery(
        {
          type: 'data',
          value: `value=${id}`
        },
        this.$wrap
      )[0].innerHTML =
        'auto'
      return
    }
    const key = $this.getAttribute('name')
    const inputValue = this.data[key].value
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
    childQuery(
      {
        type: 'data',
        value: `value=${id}`
      },
      this.$wrap
    )[0].innerHTML = `${value}${getObjData('units', $this).getUnit()}`
  }

  setView() {
    this.items.map((item, i) => {
      const input = query('input', item)
      const key = input.getAttribute('name')
      const view = query(`.${this.classes.VIEW}`, item)
      const info = getObjData('info', item)

      if (info && info.unit === 'auto') {
        view.innerHTML = 'auto'
        return
      }

      if (info && info.value.length < 1) {
        view.innerHTML = '-'
        return
      }

      if (info && info.value === 0) {
        view.innerHTML = 0
        return
      }

      view.innerHTML = `${this.data[key].value}${this.data[key].unit}`
    })
  }

  update() {
    if (this.value === null) {
      this.value = {}
    }

    const data = {}

    Each(this.value, (i, v) => {
      if (v !== '') {
        data[i] = v
      }
      if (v === 'auto') {
        data[i] = 'auto'
      }
    })

    this.element.value = this.options.process.call(this, data)

    this.trigger(EVENTS.CHANGE, data)
  }

  clear(update = true) {
    this.value = KEYS
    if (update !== false) {
      this.set(this.value)
    }
  }

  set(value, only) {
    if (!value || is.undefined(value)) {
      return
    }

    Each(value, (i, v) => {
      if (is.object(v)) {
        value[i] = `${v.value}${v.unit}`
      }
    })

    if (only) {
      Each(value, (i, v) => {
        this.value[i] = v
      })

      if (this.is('connect')) {
        let key
        let name
        let val

        Each(value, (i, v) => {
          name = i
          key = i.split('-')[0]
          val = value[i]
        })

        Each(this.value, (i, v) => {
          if (i.indexOf(key) > -1) {
            this.value[i] = value[name]
          }
        })
      }
    } else {
      Each(value, (i, v) => {
        if (value[i]) {
          this.value[i] = value[i]
        } else {
          this.value[i] = ''
        }
      })
    }

    Each(this.value, (i, v) => {
      const input = childQuery(
        {
          type: 'attr',
          value: `name=${i}`
        },
        this.$wrap
      )[0]

      const item = closest(`.${this.classes.ITEM}`, input)
      const api = getObjData('units', input)

      const info = this.parse(v)
      this.data[i] = info
      setObjData('info', info, item)

      api.set(info)
    })

    this.setView()

    this.update()
  }

  parse(value) {
    if (is.object(value)) {
      return value
    }
    const units = ['px', 'em', 'rem', '%']
    if (value === 'auto') {
      return {
        value: '',
        unit: 'auto'
      }
    }

    if (value === '') {
      return {
        value: '',
        unit: 'px'
      }
    }

    if (units.indexOf(value) > -1) {
      return {
        value: '',
        unit: value
      }
    }

    const val = parseFloat(value, 10)
    const unit = value.split(val)[1]
    return {
      value: val,
      unit
    }
  }

  get() {
    return this.value
  }

  val(value) {
    if (is.undefined(value)) {
      return this.options.process.call(this, this.get())
    }

    this.set(this.options.parse.call(this, value))
    return undefined
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
