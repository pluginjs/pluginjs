import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const element = query('#add-with-toolbar .masonry')
const button = query('#add-with-toolbar .add')
const api = Masonry.of(element, {
  itemSelector: '.masonry-item',
  maxColumn: 4,
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
  const h1 = random(100, 400)
  const h2 = random(100, 400)
  const h3 = random(100, 400)
  const data = [
    {
      class: 'masonry-item',
      html: `<img width="400" height="${h1}" src="https://picsum.photos/400/${h1}?image=${random(
        1,
        300
      )}" alt=""><p>Irure anim officia tempor est proident. Cillum dolore velit nisi ullamco deserunt minim culpa minim. Nisi ad occaecat.</p>`,
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
      class: 'masonry-item',
      html: `<img width="400" height="${h2}" src="https://picsum.photos/400/${h2}?image=${random(
        1,
        300
      )}" alt=""><p>Irure anim officia tempor est proident. Cillum dolore velit nisi ullamco deserunt minim culpa minim.</p>`,
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
      class: 'masonry-item',
      html: `<img width="400" height="${h3}" src="https://picsum.photos/400/${h3}?image=${random(
        1,
        300
      )}" alt=""><p>Irure anim officia tempor est proident. Cillum dolore velit nisi ullamco deserunt minim culpa minim. Nisi ad occaecat deserunt minim culpa minim.</p>`,
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
