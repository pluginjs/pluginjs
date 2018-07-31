import template from '@pluginjs/template'
import Dropdown from '@pluginjs/dropdown'
import { query, parseHTML, insertBefore } from '@pluginjs/dom'
import { contentWidth } from '@pluginjs/styled'

export default class FontWeight {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.fontWeight.values
    this.defaultValue = instance.options.fontWeight.value

    this.emptyize()
  }

  emptyize() {
    const html = template.compile(this.instance.options.fontWeight.template())({
      classes: this.instance.classes,
      weight: this.instance.translate('weight')
    })

    this.$FontWeight = parseHTML(html)
    insertBefore(this.$FontWeight, this.instance.$expandControl)

    this.$content = query(
      `.${this.instance.classes.FONTWEIGHTCONTENT}`,
      this.instance.$expandPanel
    )
    this.$dropdown = query(
      `.${this.instance.classes.FONTWEIGHTDROPDOWN}`,
      this.instance.$expandPanel
    )
    this.$dropWeight = query('.pj-dropdown-trigger', this.$dropdown)

    this.initDropdown()
  }

  initDropdown() {
    const that = this
    const data = []
    Object.entries(this.values).forEach(([i, v]) => {
      data[i] = { label: v }
    })

    const value = this.instance.value.fontWeight

    this.dropdownInstance = Dropdown.of(this.$dropWeight, {
      imitateSelect: true,
      select: value,
      exclusive: false,
      width: contentWidth(this.$dropdown),
      // itemValueAttr: 'fontWeight',
      data,
      onChange(value) {
        if (that.instance.is('disabled')) {
          return
        }

        that.instance.value.fontWeight = value.innerHTML
        // that.instance.update();
        // that.instance.$fillFontName.css({
        //   'font-weight': value.innerHTML
        // });
      }
    })
  }

  set(value) {
    if (!value) {
      this.dropdownInstance.set('inherit')
      this.instance.value.fontWeight = 'inherit'
    } else {
      this.dropdownInstance.set(value)
      this.instance.value.fontWeight = value
    }
  }

  clear() {
    this.set(this.defaultValue)
  }
}
