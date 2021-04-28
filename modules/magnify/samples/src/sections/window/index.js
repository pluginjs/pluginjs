import { queryAll } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const elements = queryAll('#window .example')

elements.forEach(el =>
  Magnify.of(el, {
    mode: 'window'
  })
)
