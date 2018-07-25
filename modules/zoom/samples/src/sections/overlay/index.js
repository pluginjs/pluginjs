import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#overlay .zoom')
Zoom.of(element, {
  mode: 'window',
  window: {
    position: 2,
    overlay: true,
    overlayColor: '#333',
    overlayOpacity: '0.4'
  }
})
