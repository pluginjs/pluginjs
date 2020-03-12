import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#justified .grids')
const button = query('#justified .add')
const api = Grids.of(element, {
  itemSelector: '.grids-item',
  gutter: 20,
  model: 'justified'
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
      )}/864/486" alt="">`,
      options: {
        aspectRatio: '16:9'
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(
        1,
        300
      )}/900/675" alt="">`,
      options: {
        aspectRatio: '4:3'
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(
        1,
        300
      )}/900/600" alt="">`,
      options: {
        aspectRatio: '3:2'
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(
        1,
        300
      )}/900/1350" alt="">`,
      options: {
        aspectRatio: '2:3'
      }
    }
  ]

  api.add(data)
})
