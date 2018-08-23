import { queryAll } from '@pluginjs/dom'
import Dots from '@pluginjs/dots'

const elements = queryAll('#stroke .example')
elements.forEach(element => Dots.of(element, {}))
