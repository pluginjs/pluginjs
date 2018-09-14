import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#disable-zoomable .example')
Magnify.of(element, {
  zoomable: false
})
