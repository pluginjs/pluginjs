import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#inside .example')

Magnify.of(element, {
  mode: 'inside'
})
