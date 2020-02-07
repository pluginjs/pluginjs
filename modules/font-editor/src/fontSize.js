import template from '@pluginjs/template'
import { parseHTML, query } from '@pluginjs/dom'
import UnitsRange from '@pluginjs/units-range'
// import { addClass, removeClass } from '@pluginjs/classes'

export default class FontSize {
  constructor(instance) {
    this.instance = instance
    this.defaultValue = instance.options.fontSize.value

    this.initialize()
  }

  initialize() {
    this.initRange()
  }

  initRange() {
    const that = this
    const units = {}
    const value = this.value
    // create $fontSize
    const html = template.compile(this.instance.options.fontSize.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'fontSize'
      ),
      fontSize: this.instance.translate('fontSize')
    })
    this.$wrap = parseHTML(html)

    this.element = query(`.${this.instance.classes.FONTSIZERANGE}`, this.$wrap)

    // create units
    this.instance.options.fontSize.units.forEach(v => {
      if (v === 'inherit') {
        units[v] = false
      } else {
        units[v] = {
          min: parseInt(this.instance.options.fontSize.min, 10),
          max: parseInt(this.instance.options.fontSize.max, 10),
          step: parseFloat(this.instance.options.fontSize.step, 10)
        }
      }
    })

    // init range plugin
    this.UNITSRANGE = UnitsRange.of(this.element, {
      theme: 'default',
      tip: false,
      value,
      units,
      onChange(val) {
        that.update(val)
      },
      onChangeUnit(unit) {
        that.unit = unit
      }
    })
  }

  parse(val) {
    let inlineUnit
    let inlineVal

    if (val === 'inherit') {
      this.value = 0
      this.unit = 'inherit'
      return
    }

    if (val) {
      inlineVal = val.split(/[a-zA-Z]/g)[0]
      inlineUnit = val.split(/\d/g)
      inlineUnit = inlineUnit[inlineUnit.length - 1]
    }
    this.value = inlineVal || this.instance.options.fontSize.value
    this.unit = inlineUnit || this.instance.options.fontSize.unit

    return
  }

  clear() {
    this.set(this.defaultValue)
  }

  update(val) {
    this.instance.value.fontSize = val
  }
  set(value) {
    this.UNITSRANGE.val(value)
    this.update(value)
  }
}
