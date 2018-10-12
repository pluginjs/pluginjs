import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#default .reveal')
elements.forEach(el =>
  Reveal.of(el, {
    animation: 'bounceInDown',
    duration: '1000'
  })
)

const eles = queryAll('#default .revea')
eles.forEach(el =>
  Reveal.of(el, {
    animation: 'slideInDown'
  })
)
