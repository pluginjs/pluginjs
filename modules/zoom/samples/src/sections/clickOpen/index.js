import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#clickOpen .zoom')
Zoom.of(element, {
  mode: 'window',
  window: {
    width: '270',
    height: '270',
    clickOpen: true,
    offetX: 20,
    position: 2,
    borderColor: '#fff',
    lensColor: '#000',
    lensOpacity: '0.5',
    lensBorderColor: '#fff'
  }
})
