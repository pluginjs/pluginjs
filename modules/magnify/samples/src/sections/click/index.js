import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#click .example')
Magnify.of(element, {
  trigger: 'click'
})
