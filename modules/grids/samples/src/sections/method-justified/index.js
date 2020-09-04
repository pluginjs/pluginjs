import { query, append } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#method-justified .grids')
const instance = Grids.of(element, {
  itemSelector: '.grids-item',
  imgSelector: '.grids-image',
  gutter: 20,
  model: 'justified'
})

const random = (lower = 1, upper = 100) => {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

const size = [300, 350, 400, 450, 500, 550, 600, 650, 700]

const getElement = () => {
  const el = document.createElement('div')
  const img = document.createElement('div')
  el.className = 'grids-item'
  img.className = 'grids-image'
  const width = size[random(0, 8)]
  const height = size[random(0, 8)]
  img.dataset.src = `https://picsum.photos/id/${random(
    100,
    600
  )}/${width}/${height}`
  img.dataset.width = width
  img.dataset.height = height
  append(img, el)
  return el
}

const getElements = () => {
  const els = []
  for (let i = 0; i < 8; i++) {
    els.push(getElement())
  }

  return els
}

query('#method-justified .addItem').addEventListener('click', () => {
  const $item = getElement()

  append($item, element)

  instance.add($item)
})

query('#method-justified .addItems').addEventListener('click', () => {
  const $items = getElements()

  $items.forEach($item => {
    append($item, element)
  })

  instance.add($items)
})

query('#method-justified .reverse').addEventListener('click', () => {
  instance.reverse()
})
