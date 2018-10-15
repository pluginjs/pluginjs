import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#order .pj-reveal')
elements.forEach(el => {
  Reveal.of(el, {
    animation: 'fadeDown'
  })
})
