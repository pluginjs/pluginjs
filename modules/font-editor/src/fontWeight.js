import template from '@pluginjs/template'
import Dropdown from '@pluginjs/dropdown'
import { query, parseHTML, insertBefore } from '@pluginjs/dom'
import { contentWidth } from '@pluginjs/styled'

export default class FontWeight {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.fontWeight.values
    this.defaultValue = instance.options.fontWeight.value

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.fontWeight.template())({
      namespace: this.instance.classes.NAMESPACE,
      weight: this.instance.translate('weight')
    })

    this.$FontWeight = parseHTML(html)
    insertBefore(this.$FontWeight, this.instance.$expandControl)

    this.$content = query(
      `.${this.instance.classes.NAMESPACE}-fontWeight-content`,
      this.instance.$expandPanel
    )
    this.$dropdown = query(
      `.${this.instance.classes.NAMESPACE}-fontWeight-dropdown`,
      this.instance.$expandPanel
    )

    this.initDropdown()
  }

  initDropdown() {
    const that = this
    const data = []
    Object.entries(this.values).forEach(([i, v]) => {
      data[i] = { label: v }
    })

    const value = this.instance.value.fontWeight

    this.dropdownInstance = Dropdown.of(this.$dropdown, {
      imitateSelect: true,
      select: value,
      width: contentWidth(this.$dropdown),
      // itemValueAttr: 'fontWeight',
      data,
      onChange(value) {
        if (that.instance.is('disabled')) {
          return
        }

        that.instance.value.fontWeight = value.innerHTML
        // that.instance.update();
        // that.instance.$infoFontName.css({
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
