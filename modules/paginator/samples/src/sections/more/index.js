import { query } from '@pluginjs/dom'
import Paginator from '@pluginjs/paginator'

const element = query('#more .paginator-more')
Paginator.of(element, {
  totalItems: 1000,
  itemsPerPage: 10,
  currentPage: 3,
  list: {
    visibleSize: {
      0: 3,
      960: 5,
      1280: 7
    }
  },
  layout: 'prev, list, next',
  onChange(page) {
    const url = `?page=${page}`
    console.log(`update content with ${url}`)
  }
})
