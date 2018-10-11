import { query } from '@pluginjs/dom'
import Infinite from '@pluginjs/infinite'

const element = query('#url-function .infinite')
Infinite.of(element, {
  item: 'p',
  url(count) {
    if (count <= 2) {
      return `${count}.html`
    }
    return null
  }
})
