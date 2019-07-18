import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#tools .grids')
const button = query('#tools .add')
const api = Grids.of(element, {
  itemSelector: '.grids-item',
  maxColumn: 5,
  gutter: 20,
  toolbar: {
    filters: true,
    sort: true,
    reverse: true
  }
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
        tags: 'tag1,tag4',
        sort: {
          data: `2018-0${random(1, 9)}-${random(10, 30)}`,
          index: `${random(1, 100)}`,
          title: `y${random(1, 2000)}`,
          num: `${random(1, 100)}`
        }
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        tags: 'tag2,tag5',
        sort: {
          data: `2018-0${random(1, 9)}-${random(10, 30)}`,
          index: `${random(1, 100)}`,
          title: `u${random(1, 2000)}`,
          num: `${random(1, 100)}`
        }
      }
    },
    {
      class: 'grids-item',
      html: `<img src="https://picsum.photos/id/${random(1, 300)}/900" alt="">`,
      options: {
        tags: 'tag3, tag6',
        sort: {
          data: `2018-0${random(1, 9)}-${random(10, 30)}`,
          index: `${random(1, 100)}`,
          title: `e${random(1, 2000)}`,
          num: `${random(1, 100)}`
        }
      }
    }
  ]

  api.add(data)
})
