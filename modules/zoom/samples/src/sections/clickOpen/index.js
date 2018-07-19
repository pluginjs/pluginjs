import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#clickOpen .zoom')
Zoom.of(element, {
  type: 'window',
  window: {
    clickOpen: true,
    position: 2,
    lensColor: '#333',
    lensOpacity: '0.4',
    lensBorderSize: 0
  }
})
