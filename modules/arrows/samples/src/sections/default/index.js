import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#default .example-default')
elementAttr.forEach(e => Arrows.of(e, {}))
