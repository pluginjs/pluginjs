import { query } from '@pluginjs/dom'
import Strength from '@pluginjs/strength'

const element = query('#default .password-input')

Strength.of(element, {
  locale: 'zh'
})
