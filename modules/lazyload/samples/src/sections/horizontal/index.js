import { queryAll } from '@pluginjs/dom'
import Lazyload from '@pluginjs/lazyload'

const elements = queryAll('#horizontal [lazyload]')
elements.forEach(el =>
  Lazyload.of(el, {
    onEnter() {
      console.log('element onEnter')
      this.element.classList.add('element-entered')
    }
  })
)
