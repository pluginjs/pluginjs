import { queryAll } from '@pluginjs/dom'
import Dots from '@pluginjs/dots'

const elements = queryAll('#default .example')
elements.forEach(element => Dots.of(element, {}))
