import template from '@pluginjs/template'
import Range from '@pluginjs/range'
import { query, insertBefore, parseHTML, parent } from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'

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

    // create lineHeight
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
    this.$range = Range.of(this.$lineHeight, {
      theme: 'default',
      tip: false,
      // replaceFirst: 'inherit',
      value,
      unit,
      defaultUnit: this.unit,
      onChange() {
        that.update()
      },
      onChangeUnit(unit) {
        if (unit === 'inherit') {
          that.update(true)
        } else {
          that.update()
        }

        that.unit = unit
      }
    })

    // this.$range.set({
    //   input: this.value,
    //   unit: this.unit
    // })
    // this.update()

    // if (this.unit === 'inherit') {
    //   this.update(true)
    // }
  }

  parse(val) {
    let inlineUnit
    let inlineVal

    if (val === 'inherit') {
      this.value = 0
      this.unit = 'inherit'
      return null
    }
    if (this.instance.value.lineHeight) {
      inlineVal = val.split(/[a-zA-Z]/g)[0]
      inlineUnit = val.split(/\d/g)
      inlineUnit = inlineUnit[inlineUnit.length - 1]
    }
    this.value = inlineVal || this.instance.options.lineHeight.value
    this.unit = inlineUnit || this.instance.options.lineHeight.unit

    return null
  }

  clear() {
    this.set(this.defaultValue)
  }

  update(inherit) {
    if (inherit) {
      addClass(this.instance.classes.INHERIT, parent(this.$lineHeight))
      this.instance.value.lineHeight = 'inherit'
    } else {
      removeClass(this.instance.classes.INHERIT, parent(this.$lineHeight))
      this.instance.value.lineHeight = `${this.$range.get().value}${
        this.$range.get().unit
      }`
    }
  }

  set(value) {
    this.parse(value)

    if (!value || value === 'inherit') {
      this.update(true)
    } else {
      this.update()
    }
  }
}
