import { queryAll } from '@pluginjs/dom'
import BeforeAfter from '@pluginjs/before-after'

const elements = queryAll('#default .example')

elements.forEach(element => BeforeAfter.of(element, {}))
