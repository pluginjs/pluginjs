import { query } from '@pluginjs/dom'
import Strength from '@pluginjs/strength'

const element = query(' #disabled .password-disabled')

Strength.of(element, {
  locale: 'zh',
  disabled: true
})
