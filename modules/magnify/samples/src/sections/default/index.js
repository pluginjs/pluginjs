import { query } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const element = query('#default .example')
let api = Magnify.of(element, {})

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}

query('.api').addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = Magnify.of(element)
      break
    case 'swap': {
      const i = getRandomInt(1, 20)
      api.swap(
        {
          src: `https://picsum.photos/400/300?image=${i}`
        },
        {
          src: `https://picsum.photos/800/600?image=${i}`,
          srcset: `https://picsum.photos/1600/1200?image=${i} 2x`
        }
      )
      break
    }
    case 'disable':
      api.disable()
      break
    case 'enable':
      api.enable()
      break
    case 'destroy':
      api.destroy()
      break
    default: {
      console.info(el.dataset.api)
    }
  }
})
