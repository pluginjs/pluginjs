import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#round .example')

Magnify.of(element, {
  mode: 'round'
})
