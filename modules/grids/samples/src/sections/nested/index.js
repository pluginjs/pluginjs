import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#nested .grids')
const button = query('#nested .add')
const api = Grids.of(element, {
  itemSelector: '.grids-item',
  gutter: 20,
  model: 'nested',
  hoverPrimary: true
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
        col: random(1, 3),
        row: random(1, 3)
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        col: random(1, 3),
        row: random(1, 3)
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        col: random(1, 3),
        row: random(1, 3)
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        col: random(1, 3),
        row: random(1, 3)
      }
    }
  ]

  api.add(data)
})
