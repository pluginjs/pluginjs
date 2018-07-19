import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#inner .zoom')
Zoom.of(element, {
  type: 'inner'
})
