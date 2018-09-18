import { query } from '@pluginjs/dom'
import Strength from '@pluginjs/strength'

const element = query('#image .password-input-image')

Strength.of(element, {
  showToggle: query('#image .password-addon'),
  showScore: query('#image .password-score')
})
