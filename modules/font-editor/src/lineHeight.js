import template from '@pluginjs/template'
import { parseHTML, insertBefore, query } from '@pluginjs/dom'
import UnitsRange from '@pluginjs/units-range'
// import { addClass, removeClass } from '@pluginjs/classes'

export default class LineHeight {
  constructor(instance) {
    this.instance = instance
    this.defaultValue = instance.options.lineHeight.value

    this.emptyize()
  }

  emptyize() {
    this.parse(this.instance.value.lineHeight)
    this.initRange()
  }

  initRange() {
    const that = this
    const unit = {}
    const value = this.value
    // create $lineHeight
    const html = template.compile(this.instance.options.lineHeight.template())({
      classes: this.instance.classes,
      lineHeight: this.instance.translate('lineHeight')
    })
    insertBefore(parseHTML(html), this.instance.$expandControl)

    this.$lineHeight = query(
      `.${this.instance.classes.LINEHEIGHTRANGE}`,
      this.instance.$expandPanel
    )

    // create units
    this.instance.options.lineHeight.units.forEach(v => {
      unit[v] = {
        min: parseInt(this.instance.options.lineHeight.min, 10),
        max: parseInt(this.instance.options.lineHeight.max, 10),
        step: parseFloat(this.instance.options.lineHeight.step, 10)
      }
    })

    // init range plugin
    this.$range = UnitsRange.of(this.$lineHeight, {
      theme: 'default',
      tip: false,
      // replaceFirst: 'inherit',
      value,
      unit,
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
    this.$range.val(value)
    this.update(value)
  }
}
