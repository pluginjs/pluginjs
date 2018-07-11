import { attr, query } from '@pluginjs/dom'
import { Flip } from 'number-flip'
import Initializer from '@pluginjs/initializer'

Initializer.register(
  'flip',
  (element, options) => {
    new Flip({
      ...options,
      node: element,
      from: attr('data-from', element),
      to: attr('data-to', element)
    })
  },
  {
    duration: 2,
    delay: 1
  }
)

const element = query('#custom .example-custom')

Initializer.of(element)
