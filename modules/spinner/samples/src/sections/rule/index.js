import { query } from '@pluginjs/dom'
import Spinner from '@pluginjs/spinner'

const element = query('#rule .example-rule')
// day month hour minute second

Spinner.of(element, { rule: 'month' })
