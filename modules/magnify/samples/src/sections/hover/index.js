import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#hover .example')
Magnify.of(element, {
  trigger: 'hover'
})
