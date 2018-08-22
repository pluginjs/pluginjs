import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elements = queryAll('#text .example')

elements.forEach(element => Arrows.of(element, {}))
