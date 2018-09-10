import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#overlay .example-zoom')
Zoom.of(element, {
  mode: 'window',
  window: {
    height: '270',
    width: '270',
    lensSize: 100,
    position: 2,
    offetX: 20,
    lensBorderColor: '#fff',
    overlay: true,
    overlayColor: '#000',
    overlayOpacity: '0.7'
  }
})
