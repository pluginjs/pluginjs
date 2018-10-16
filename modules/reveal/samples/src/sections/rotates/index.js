import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#rotates .reveal')
elements.forEach(el =>
  Reveal.of(el, {
    duration: 600,
    anchor: '.box'
  })
)
