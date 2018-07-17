import { query } from '@pluginjs/dom'
import Paginator from '@pluginjs/paginator'

const element = query('#less .paginator-less')
Paginator.of(element, {
  totalItems: 5,
  itemsPerPage: 1,
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
    return url
  }
})
