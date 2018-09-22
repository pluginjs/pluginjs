import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const data = [
  {
    value: 'book',
    label: 'Book',
    icon: 'book-solid'
  },
  {
    value: 'calendar',
    label: 'Calendar',
    icon: 'calendar'
  },
  {
    value: 'image',
    label: 'Image',
    icon: 'image'
  },
  {
    value: 'home',
    label: 'Home',
    icon: 'home-solid'
  }
]

const element = query('#custom-template-data .example')
MultiSelect.of(element, {
  source: data,
  optionLabel(option) {
    return `<i class="pj-icon pj-icon-${option.icon}"></i> ${option.label}`
  },
  templates: {
    option() {
      return '<div class="{classes.OPTION}" data-value="{option.value}"><i class="pj-icon pj-icon-{option.icon}"></i> {option.label}</div>'
    }
  }
})
