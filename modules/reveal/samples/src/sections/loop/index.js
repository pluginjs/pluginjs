import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#loop .reveal')
elements.forEach(el =>
  Reveal.of(el, {
    animation: 'rotate',
    duration: 1000
  })
)
