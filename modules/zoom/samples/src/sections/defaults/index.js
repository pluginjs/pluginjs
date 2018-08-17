import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#defaults .zoom')
Zoom.of(element, {
  window: {
    offetX: 20,
    overlay: true,
    height: '270',
    width: '270',
    overlayColor: '#000',
    overlayOpacity: '0.7',
    borderColor: '#fff',
    lensBorderColor: '#fff'
  }
})
