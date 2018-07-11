import { query } from '@pluginjs/dom'
import Toggle from '@pluginjs/toggle' /* eslint-disable-line no-unused-vars */
import Initializer from '@pluginjs/initializer'

const element = query('#element .example-element')

Initializer.of(element)
