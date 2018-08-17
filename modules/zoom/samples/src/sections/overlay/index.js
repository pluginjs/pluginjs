import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#overlay .zoom')
Zoom.of(element, {
  mode: 'window',
  window: {
    height: '200',
    width: '200',
    lensSize: 100,
    position: 2,
    offetX: 20,
    lensBorderColor: '#fff',
    overlay: true,
    overlayColor: '#000',
    overlayOpacity: '0.7'
  }
})
