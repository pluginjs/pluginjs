import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const element = query('#loader .masonry')
const instance = Masonry.of(element, {
  itemSelector: '.masonry-item',
  colWidth: 'base'
})

query('#loader .reverse').addEventListener('click', () => {
  instance.reverse()
})
