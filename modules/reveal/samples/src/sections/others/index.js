import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#others .reveal')
elements.forEach(el => Reveal.of(el, {}))
