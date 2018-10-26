import Select from '@pluginjs/select'
import { insertAfter, query } from '@pluginjs/dom'
class Unit {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.instance.$select = this.instance.createEl('unit', {
      classes: this.instance.classes
    })
    insertAfter(this.instance.$select, this.instance.$lock)
    this.instance.$unit = query(
      `.${this.instance.classes.SELECTUNIT}`,
      this.instance.$wrap
    )
    this.SELECT = Select.of(this.instance.$unit, {
      value: this.instance.options.source[0].value,
      source: this.instance.options.source,
      keyboard: true,
      onChange: () => {
        if (this.instance.is('disabled')) {
          return
        }
        this.instance.update(false)
      }
    })
  }

  set(value) {
    if (!value) {
      this.SELECT.select('px')
      this.instance.$unit.value = 'px'
    } else {
      this.SELECT.select(value)
      this.instance.$unit.value = value
    }
  }
}

export default Unit
