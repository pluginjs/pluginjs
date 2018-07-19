import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

let position = 1
const element = query('#postions .zoom')
const api = Zoom.of(element, {
  position,
  type: 'window',
  window: {
    overlay: true,
    overlayColor: '#333',
    overlayOpacity: '0.4'
  }
})

document.querySelector('.changePosition').addEventListener('click', () => {
  position = (position % 16) + 1
  api.options.position = position
  console.log('position: ', position)
})
