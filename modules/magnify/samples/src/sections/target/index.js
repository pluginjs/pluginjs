import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#target .example')
Magnify.of(element, {
  mode: 'outside',
  target: '#preview'
})
