import { query } from '@pluginjs/dom'
import Checkbox from '@pluginjs/checkbox'

const element = query('#css-icon input[type="checkbox"]')
Checkbox.of(element, {
  classes: {
    icon: 'icon-check-mini'
  }
})
