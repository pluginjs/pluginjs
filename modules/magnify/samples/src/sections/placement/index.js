import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#placement .example')
Magnify.of(element, {
  mode: 'outside'
})
