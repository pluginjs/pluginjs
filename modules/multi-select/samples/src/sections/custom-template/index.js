import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const element = query('#custom-template .example')
MultiSelect.of(element, {
  optionLabel(option) {
    return `<i class="pj-icon pj-icon-${option.icon}"></i> ${option.label}`
  },
  templates: {
    option() {
      return '<div class="{classes.OPTION}" data-value="{option.value}"><i class="pj-icon pj-icon-{option.icon}"></i> {option.label}</div>'
    }
  }
})
