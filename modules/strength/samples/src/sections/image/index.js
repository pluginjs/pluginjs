import { query } from '@pluginjs/dom'
import Strength from '@pluginjs/strength'

const element = query('#image .strength')

Strength.of(element, {
  toggle: query('#image .strength-addon'),
  score: query('#image .strength-score'),
  container: query('#image .strength-container')
})
