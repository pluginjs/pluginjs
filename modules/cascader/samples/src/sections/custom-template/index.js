import { query } from '@pluginjs/dom'
import Cascader from '@pluginjs/cascader'

const getChildren = index => {
  return [
    'Foo',
    'Bar',
    'Baz',
    'Qux',
    'Quux',
    'Quuz',
    'Corge',
    'Grault',
    'Garply',
    'Waldo',
    'Fred',
    'Plugh'
  ].map(item => {
    return {
      value: `${item.toLowerCase()}-${index}`,
      label: `${item} ${index}`
    }
  })
}

const element = query('#custom-template .example')
Cascader.of(element, {
  source: [
    {
      value: 'book',
      icon: 'book-solid',
      label: 'Book',
      children: getChildren('1')
    },
    {
      value: 'calendar',
      icon: 'calendar-solid',
      label: 'Calendar',
      children: getChildren('2')
    },
    {
      value: 'image',
      icon: 'image-solid',
      label: 'Image',
      children: getChildren('3')
    },
    {
      value: 'home',
      icon: 'home-solid',
      label: 'Home',
      children: getChildren('4')
    }
  ],
  optionLabel(option) {
    return `<i class="pj-icon pj-icon-${option.icon}"></i> ${option.label}`
  },
  templates: {
    option() {
      return '<div class="{classes.OPTION}" data-value="{option.value}"><i class="pj-icon pj-icon-{option.icon}"></i> {option.label}</div>'
    }
  }
})
