import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#level .zoom')
Zoom.of(element, {
  level: 2
})
