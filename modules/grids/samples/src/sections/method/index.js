import { query, append } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#method .grids')
const instance = Grids.of(element, {
  itemSelector: '.grids-item',
  imgSelector: '.grids-image',
  gutter: 20
})

const random = (lower = 1, upper = 100) => {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

const getElement = () => {
  const el = document.createElement('div')
  const img = document.createElement('div')
  el.className = 'grids-item'
  img.className = 'grids-image'
  img.dataset.src = `https://picsum.photos/id/${random(100, 600)}/900`
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

query('#method .addItem').addEventListener('click', () => {
  const $item = getElement()

  append($item, element)

  instance.add($item)
})

query('#method .addItems').addEventListener('click', () => {
  const $items = getElements()

  $items.forEach($item => {
    append($item, element)
  })

  instance.add($items)
})

query('#method .reverse').addEventListener('click', () => {
  instance.reverse()
})
