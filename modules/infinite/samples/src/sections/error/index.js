import { query } from '@pluginjs/dom'
import Infinite from '@pluginjs/infinite'

const element = query('#error .infinite')
Infinite.of(element, {
  load(count, resolve, reject) {
    setTimeout(() => {
      reject()
    }, 1000)
  },
  onError() {
    console.info('error')
  },
  checkEnd(count) {
    return count === 2
  }
})
