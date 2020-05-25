import { query, append } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const $element = query('#add .masonry')

const instance = Masonry.of($element, {
  itemSelector: '.masonry-item',
  colWidth: 100
})

const arr = [100, 200, 300]

const getElement = () => {
  const el = document.createElement('div')
  const w = arr[parseInt(Math.random() * 3, 10)]
  const h = arr[parseInt(Math.random() * 3, 10)]

  el.className = `masonry-item width-${w} height-${h}`
  return el
}

const getElements = () => {
  const els = []
  for (let i = 0; i < 5; i++) {
    els.push(getElement())
  }

  return els
}

query('#add .addItem').addEventListener('click', () => {
  const $item = getElement()

  append($item, $element)

  instance.add($item)
})

query('#add .addItems').addEventListener('click', () => {
  const $items = getElements()

  $items.forEach($item => {
    append($item, $element)
  })

  instance.add($items)
})
