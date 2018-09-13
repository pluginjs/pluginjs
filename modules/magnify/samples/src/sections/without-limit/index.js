import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#without-limit .example')
Magnify.of(element, {
  limit: false
})
