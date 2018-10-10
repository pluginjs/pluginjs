import { query } from '@pluginjs/dom'
import Infinite from '@pluginjs/infinite'

const element = query('#horizontal .infinite')
Infinite.of(element, {
  item: '.card',
  horizontal: true,
  load(count, resolve) {
    setTimeout(() => {
      resolve(
        '<div class="card"></div><div class="card"></div><div class="card"></div>'
      )
    }, 1000)
  },
  checkEnd(count) {
    return count === 2
  }
})
