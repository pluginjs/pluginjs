import template from '@pluginjs/template'
import { parseHTML, query } from '@pluginjs/dom'
import UnitsRange from '@pluginjs/units-range'
// import { addClass, removeClass } from '@pluginjs/classes'

export default class LineHeight {
  constructor(instance) {
    this.instance = instance
    this.defaultValue = instance.options.lineHeight.value

    this.initialize()
  }

  initialize() {
    // this.parse(this.instance.value.lineHeight)
    this.initUnitsRange()
  }

  initUnitsRange() {
    const that = this
    const units = {}
    const value = this.value
    // create $lineHeight
    const html = template.compile(this.instance.options.lineHeight.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'lineHeight'
      ),
      lineHeight: this.instance.translate('lineHeight')
    })
    this.$wrap = parseHTML(html)

    this.element = query(
      `.${this.instance.classes.LINEHEIGHTRANGE}`,
      this.$wrap
    )

    // create units
    this.instance.options.lineHeight.units.forEach(v => {
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
      // replaceFirst: 'inherit',
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
    this.value = inlineVal || this.instance.options.lineHeight.value
    this.unit = inlineUnit || this.instance.options.lineHeight.unit

    return
  }

  clear() {
    this.set(this.defaultValue)
  }

  update(val) {
    this.instance.value.lineHeight = val
  }
  set(value) {
    this.UNITSRANGE.val(value)
    this.update(value)
  }
}
