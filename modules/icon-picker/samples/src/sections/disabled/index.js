import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'

const data = {
  remark: {
    title: 'Remark',
    count: 768,
    prefix: 'fa-',
    base: 'fa',
    classifiable: true,
    icons: {
      'caret-right': 'Caret right',
      star: 'Star',
      heart: 'Heart',
      'cloud-upload': 'Cloud upload',
      'phone-square': 'Phone square',
      bookmark: 'Bookmark',
      cog: 'Cog',
      wrench: 'Wrench',
      'volume-down': 'Volume down',
      'caret-down': 'Caret down',
      'caret-up': 'Caret up',
      'caret-left': 'Caret left'
    },
    categories: {
      commerce: ['star', 'heart', 'cloud-upload', 'phone-square', 'bookmark'],
      text: [
        'cog',
        'wrench',
        'volume-down',
        'caret-down',
        'caret-up',
        'caret-left',
        'caret-right'
      ]
    }
  },
  creation: {
    title: 'Creation',
    count: 768,
    prefix: 'fa-',
    base: 'fa',
    classifiable: false,
    icons: ['user', 'search', 'rocket', 'times', 'refresh', 'adn', 'cog']
  },
  'creation copy': {
    title: 'Creation Copy',
    count: 768,
    prefix: 'fa-',
    base: 'fa',
    classifiable: false,
    icons: ['user', 'search', 'rocket', 'times', 'refresh', 'adn', 'cog']
  }
}

IconPicker.setData(data)

const element = query('#disabled .example-locale')
IconPicker.of(element, {
  locale: 'zh',
  disabled: true
})
