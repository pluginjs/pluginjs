import { query } from '@pluginjs/dom'
import Checkbox from '@pluginjs/checkbox'

const element = query('#css-inline input[type="checkbox"]')
Checkbox.of(element, {
  classes: {
    icon: 'icon-check-mini'
  }
})
