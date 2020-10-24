import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#breakpoints .reveal')
elements.forEach(el => {
  Reveal.of(el, {
    once: false
  })
})
