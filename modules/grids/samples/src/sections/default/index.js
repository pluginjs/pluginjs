import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#default .grids')
const button = query('#default .add')
const api = Grids.of(element, {
  itemSelector: '.grids-item',
  maxColumn: 5,
  gutter: 20
})

function random(lower = 1, upper = 100) {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

button.addEventListener('click', () => {
  const data = [
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`
    }
  ]

  api.add(data)
})
