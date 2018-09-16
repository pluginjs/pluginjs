import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#custom-template .example')
Select.of(element, {
  optionLabel(option) {
    return `<i class="pj-icon pj-icon-${option.icon}"></i> ${option.label}`
  },
  templates: {
    option() {
      return '<div class="{classes.OPTION}" data-value="{option.value}"><i class="pj-icon pj-icon-{option.icon}"></i> {option.label}</div>'
    }
  }
})
