import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const element = query('#add .masonry')
const button = query('#add .add')
const api = Masonry.of(element, {
  /** options **/
  itemSelector: '.masonry-item',
  maxColumn: 5,
  gutter: 20
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
      class: 'masonry-item bg-2',
      html: `<img width="400" height="${h1}" src="https://picsum.photos/400/${h1}?image=${random(
        1,
        300
      )}" alt=""><p>Cillum dolore velit nisi ullamco deserunt minim culpa minim. Nisi ad occaecat.</p>`
    },
    {
      class: 'masonry-item bg-4',
      html: `<img width="400" height="${h2}" src="https://picsum.photos/400/${h2}?image=${random(
        1,
        300
      )}" alt=""><p>Irure anim officia tempor est proident non voluptate est pariatur. Cillum dolore velit nisi ullamco deserunt minim culpa minim. Nisi ad occaecat.</p>`
    },
    {
      class: 'masonry-item bg-1',
      html: `<img width="400" height="${h3}" src="https://picsum.photos/400/${h3}?image=${random(
        1,
        300
      )}" alt=""><p>Irure anim officia tempor est proident non voluptate est pariatur. Cillum dolore velit nisi ullamco deserunt minim culpa minim. Nisi ad occaecat occaecat amet sit ut esse veniam.</p>`
    }
  ]
  api.add(data)
})
