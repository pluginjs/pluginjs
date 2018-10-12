import { query } from '@pluginjs/dom'
import Strength from '@pluginjs/strength'

const element = query('#hideScore .strength')

Strength.of(element, {
  locale: 'zh',
  scoreClasses: {
    empty: 'fff'
  },

  emptyStatus: false,
  toggle: false
})
