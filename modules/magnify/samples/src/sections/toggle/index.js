import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#toggle .example')
Magnify.of(element, {
  trigger: 'toggle'
})
