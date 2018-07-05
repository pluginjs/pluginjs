import { query } from '@pluginjs/dom'
import Spinner from '@pluginjs/spinner'

const element = query('#initvalue .example-input')

Spinner.of(element, {})
