import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#error .example')

Magnify.of(element, {
  error: 'The image load failed'
})
