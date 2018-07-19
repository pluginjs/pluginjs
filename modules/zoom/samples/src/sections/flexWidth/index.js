import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#flexWidth .zoom_1')
Zoom.of(element, {
  animation: true,
  window: {
    position: 2,
    overlay: true,
    overlayColor: '#333',
    overlayOpacity: '0.4'
  }
})

const element2 = query('#flexWidth .zoom_2')
Zoom.of(element2, {
  type: 'inner'
})

const element3 = query('#flexWidth .zoom_3')
Zoom.of(element3, {
  type: 'lens',
  lens: {
    borderSize: 5,
    borderColor: '#fff',
    sizi: 200,
    flexWidth: true
  }
})

let flex = true
document.querySelector('.changeWidth').addEventListener('click', () => {
  const width = flex ? '200px' : '300px'
  document.querySelectorAll('.example').forEach(element => {
    element.style.width = width
  })
  flex = !flex
})
