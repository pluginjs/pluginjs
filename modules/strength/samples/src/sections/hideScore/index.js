import { query } from '@pluginjs/dom'
import Strength from '@pluginjs/strength'

const element = query('#hideScore .password-input')

Strength.of(element, {
  locale: 'zh',
  scoreClasses: {
    empty: 'fff'
  },

  emptyStatus: false,
  showToggle: false,
  showScore: false
})
