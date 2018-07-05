import { query } from '@pluginjs/dom'
import Spinner from '@pluginjs/spinner'

const element = query('#right .example-right')

Spinner.of(element, { layout: 'right' })
