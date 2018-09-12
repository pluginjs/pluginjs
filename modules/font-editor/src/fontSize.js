import template from '@pluginjs/template'
import { parseHTML, insertBefore, query } from '@pluginjs/dom'
import UnitsRange from '@pluginjs/units-range'
// import { addClass, removeClass } from '@pluginjs/classes'

export default class FontSize {
  constructor(instance) {
    this.instance = instance
    this.defaultValue = instance.options.fontSize.value

    this.emptyize()
  }

  emptyize() {
    this.parse(this.instance.value.fontSize)
    this.initRange()
  }

  initRange() {
    const that = this
    const unit = {}
    const value = this.value
    // create $fontSize
    const html = template.compile(this.instance.options.fontSize.template())({
      classes: this.instance.classes,
      fontSize: this.instance.translate('fontSize')
    })
    insertBefore(parseHTML(html), this.instance.$expandControl)

    this.$fontSize = query(
      `.${this.instance.classes.FONTSIZERANGE}`,
      this.instance.$expandPanel
    )

    // create units
    this.instance.options.fontSize.units.forEach(v => {
      unit[v] = {
        min: parseInt(this.instance.options.fontSize.min, 10),
        max: parseInt(this.instance.options.fontSize.max, 10),
        step: parseFloat(this.instance.options.fontSize.step, 10)
      }
    })

    // init range plugin
    this.$range = UnitsRange.of(this.$fontSize, {
      theme: 'default',
      tip: false,
      // replaceFirst: 'inherit',
      value,
      unit,
      defaultUnit: this.unit,
      // defaultUnit: 'inherit',
      onChange(val) {
        console.log(val)
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
    this.$range.val(value)
    this.update(value)
  }
}
