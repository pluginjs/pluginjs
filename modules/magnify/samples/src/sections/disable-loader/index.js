import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#disable-loader .example')
Magnify.of(element, {
  loader: false
})
