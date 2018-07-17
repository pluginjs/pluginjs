import template from '@pluginjs/template'
import { parseHTML, parent, insertBefore, query } from '@pluginjs/dom'
import Range from '@pluginjs/range'
import { addClass, removeClass } from '@pluginjs/classes'

export default class FontSize {
  constructor(instance) {
    this.instance = instance
    this.defaultValue = instance.options.fontSize.value

    this.initialize()
  }

  initialize() {
    this.parse(this.instance.value.fontSize)

    this.initRange()

    // if (!this.instance.value.fontSize) {
    //   this.fontSizeValue = this.instance.options.fontSize.value === 'inherit' ? this.instance.options.fontSize.min : this.instance.options.fontSize.value;
    // } else if (this.instance.value.fontSize === 'inherit') {
    //   this.fontSizeValue = this.instance.options.fontSize.min;
    //   // this.fontSizeUnit = this.instance.options.fontSize.unit;
    // } else {
    //   this.fontSizeValue = this.instance.getUnitNumber(
    //     this.instance.value.fontSize
    //   ).number;
    //   // this.fontSizeUnit = this.instance.getUnitNumber(
    //   //   this.instance.value.fontSize
    //   // ).unit;
    // }

    // this.fontSizeUnit = this.instance.options.fontSize.unit;
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
    this.$range = Range.of(this.$fontSize, {
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

    this.$range.set({
      value: this.value,
      unit: this.unit
    })
    this.update()
    if (this.unit === 'inherit') {
      this.update(true)
    }
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

  update(inherit) {
    if (inherit) {
      addClass(this.instance.classes.INHERIT, parent(this.$fontSize))
      this.instance.value.fontSize = 'inherit'
    } else {
      removeClass(this.instance.classes.INHERIT, parent(this.$fontSize))
      this.instance.value.fontSize = `${this.$range.get().value}${
        this.$range.get().unit
      }`
    }
  }
  set(value) {
    if (!value || value === 'inherit') {
      this.$range.set(0, 'inherit')
      this.update(true)
    } else {
      this.$range.val(value)
      this.update()
    }
  }
}
