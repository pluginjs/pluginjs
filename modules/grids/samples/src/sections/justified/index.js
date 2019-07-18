import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#justified .grids')
const button = query('#justified .add')
const api = Grids.of(element, {
  itemSelector: '.grids-item',
  gutter: 20,
  minHeight: 260,
  model: 'justified'
})

function random(lower = 1, upper = 100) {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

button.addEventListener('click', () => {
  const data = [
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        aspectRatio: `${random(1, 6)}:${random(1, 6)}`
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        aspectRatio: `${random(1, 6)}:${random(1, 6)}`
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        aspectRatio: `${random(1, 6)}:${random(1, 6)}`
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        aspectRatio: `${random(1, 6)}:${random(1, 6)}`
      }
    }
  ]

  api.add(data)
})
