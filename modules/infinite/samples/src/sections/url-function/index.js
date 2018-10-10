import { query } from '@pluginjs/dom'
import Infinite from '@pluginjs/infinite'

const element = query('#url-function .infinite')
Infinite.of(element, {
  item: 'p',
  url(count) {
    if (count <= 2) {
      return `https://gist.githubusercontent.com/thecreation/c77bf5af1822cc0bf9ac605a85d87e2d/raw/${count}.html`
    }
    return null
  }
})
