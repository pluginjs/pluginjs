import { query } from '@pluginjs/dom'
import Toggle from '@pluginjs/toggle'
import Initializer from '@pluginjs/initializer'

const element = query('#element .example-element')

Initializer.of(element);
