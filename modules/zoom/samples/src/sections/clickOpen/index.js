import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#clickOpen .zoom')
Zoom.of(element, {
  mode: 'window',
  window: {
    clickOpen: true,
    offetX: 20,
    position: 2,
    borderColor: '#fff',
    lensColor: '#000',
    lensOpacity: '0.5',
    lensBorderSize: 0
  }
})
