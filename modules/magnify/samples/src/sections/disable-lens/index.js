import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#disable-lens .example')
Magnify.of(element, {
  lens: false
})
