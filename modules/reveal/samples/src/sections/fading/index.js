import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#fading .reveal')
elements.forEach(el =>
  Reveal.of(el, {
    duration: '1000'
  })
)
