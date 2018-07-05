import { query } from '@pluginjs/dom'
import Spinner from '@pluginjs/spinner'

const element = query('#disabled .example-disabled')

Spinner.of(element, { disabled: true })
