import template from '@pluginjs/template'
import { parseHTML, query } from '@pluginjs/dom'
import UnitsRange from '@pluginjs/units-range'

export default class LetterSpacing {
  constructor(instance) {
    this.instance = instance
    this.defaultValue = instance.options.letterSpacing.value
    this.initialize()
  }

  initialize() {
    this.initRange()
  }

  initRange() {
    const that = this
    const units = {}
    const value = this.value
    // create $letterSpacing
    const html = template.compile(this.instance.options.letterSpacing.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'letterSpacing'
      ),
      letterSpacing: this.instance.translate('letterSpacing')
    })
    this.$wrap = parseHTML(html)

    this.element = query(
      `.${this.instance.classes.LETTERSPACINGRANGE}`, 
      this.$wrap
    )

    // create units
    this.instance.options.letterSpacing.units.forEach(v => {
      if (v === 'inherit') {
        units[v] = false
      } else {
        units[v] = {
          min: parseInt(this.instance.options.letterSpacing.min, 10),
          max: parseInt(this.instance.options.letterSpacing.max, 10),
          step: parseFloat(this.instance.options.letterSpacing.step, 10)
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

    this.value = inlineVal || this.instance.options.letterSpacing.value
    this.unit = inlineUnit || this.instance.options.letterSpacing.unit

    return
  }

  clear() {
    this.set(this.defaultValue)
  }

  update(val) {
    this.instance.value.letterSpacing = val
  }
  
  set(value) {
    this.UNITSRANGE.val(value)
    this.update(value)
  }
}
