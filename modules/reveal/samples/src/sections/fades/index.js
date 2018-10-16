import { queryAll } from '@pluginjs/dom'
import Reveal from '@pluginjs/reveal'

const elements = queryAll('#fades .reveal')
elements.forEach(el => Reveal.of(el, {}))
