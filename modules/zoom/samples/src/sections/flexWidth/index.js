import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element1 = query('#flexWidth .example-zoom1')
Zoom.of(element1, {
  animation: true,
  window: {
    width: '270',
    height: '270',
    offetX: 20,
    position: 2,
    overlay: true,
    borderColor: '#fff',
    lensBorderColor: '#fff',
    overlayColor: '#000',
    overlayOpacity: '0.7'
  }
})

const element2 = query('#flexWidth .example-zoom2')
Zoom.of(element2, {
  mode: 'inner'
})

const element3 = query('#flexWidth .example-zoom3')
Zoom.of(element3, {
  mode: 'lens',
  lens: {
    borderSize: 1,
    borderColor: '#fff',
    size: 90,
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
