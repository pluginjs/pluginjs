import { queryAll } from '@pluginjs/dom'
import Toggle from '@pluginjs/toggle' /* eslint-disable-line no-unused-vars */
import Initializer from '@pluginjs/initializer'

const elements = queryAll('#elements .example-elements')

Initializer.of(elements)
