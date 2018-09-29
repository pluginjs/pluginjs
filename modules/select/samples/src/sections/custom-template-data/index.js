import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const data = [
  {
    value: 'book',
    label: 'Book',
    icon: 'book'
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
    icon: 'home'
  }
]

const element = query('#custom-template-data .example')
Select.of(element, {
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
