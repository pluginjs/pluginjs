import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#nested .grids')
const button = query('#nested .add')
const api = Grids.of(element, {
  itemSelector: '.grids-item',
  gutter: 20,
  model: 'nested'
})

function random(lower = 1, upper = 100) {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

button.addEventListener('click', () => {
  const data = [
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(
        1,
        300
      )}/450/920" alt="">`,
      options: {
        col: 1,
        row: 2
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        col: 1,
        row: 1
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        col: 1,
        row: 1
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(
        1,
        300
      )}/920/450" alt="">`,
      options: {
        col: 2,
        row: 1
      }
    }
  ]

  api.add(data)
})
