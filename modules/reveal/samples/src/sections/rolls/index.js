import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#rolls .reveal')
elements.forEach(el =>
  Reveal.of(el, {
    duration: 600,
    anchor: '.box'
  })
)
