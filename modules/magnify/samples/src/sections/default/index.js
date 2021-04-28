import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#default .example')
const img = query('img', element)
let api = Magnify.of(element)

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}

query('.api').addEventListener('click', event => {
  const el = event.target

  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector
  }

  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = Magnify.of(element)
      break
    case 'swap': {
      const i = getRandomInt(1, 200)
      img.setAttribute('src', `https://picsum.photos/400/300?image=${i}`)
      img.setAttribute(
        'data-origin',
        `https://picsum.photos/1600/1200?image=${i}`
      )
      break
    }
    case 'window':
      api.changeMode('window')
      break
    case 'round':
      api.changeMode('round')
      break
    case 'inside':
      api.changeMode('inside')
      break
    case 'zoomUp':
      api.zoomUp(0.3)
      break
    case 'zoomDown':
      api.zoomDown(0.3)
      break
    case 'zoomTo':
      api.zoomTo(el.dataset.value)
      break
    case 'disable':
      api.disable()
      break
    case 'enable':
      api.enable()
      break
    case 'destroy':
      api.destroy()
      break
    default:
      break
  }
})
