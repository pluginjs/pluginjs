import { queryAll } from '@pluginjs/dom'
import Sticky from '@pluginjs/sticky'

const elements = queryAll('#default .sidebar')
elements.forEach(element => {
  Sticky.of(element, {
    spacing: 20,
    wrapSelector: '.wrap'
  })
})
