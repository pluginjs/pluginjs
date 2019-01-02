import { queryAll } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const elements = queryAll('#loop .swipe')
elements.forEach(element => {
  Swipe.of(element, {
    loop: true,
    gutter: 20,
    arrows: {
      type: 'solid'
    },
    pagination: {
      type: 'square light'
    }
  })
})
