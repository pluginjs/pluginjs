import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#lens .zoom')
Zoom.of(element, {
  mode: 'inner'
})
