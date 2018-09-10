import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

let position = 1
const element = query('#postions .example-zoom')
const api = Zoom.of(element, {
  position,
  mode: 'window',
  window: {
    height: '270',
    width: '270',
    overlay: true,
    overlayColor: '#000',
    overlayOpacity: '0.7',
    borderColor: '#fff',
    lensBorderColor: '#fff'
  }
})

document.querySelector('.changePosition').addEventListener('click', () => {
  position = (position % 16) + 1
  api.options.window.position = position
})
