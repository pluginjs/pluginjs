import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#level .zoom')
Zoom.of(element, {
  level: 0.7,
  window: {
    overlay: true,
    offetX: 20,
    height: '270',
    width: '270',
    overlayColor: '#000',
    overlayOpacity: '0.7',
    borderColor: '#fff',
    lensBorderColor: '#fff'
  }
})
