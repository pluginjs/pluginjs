import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elements = queryAll('#default .example')

elements.forEach(element => Arrows.of(element, {}))
