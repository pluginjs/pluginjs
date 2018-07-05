import { query } from '@pluginjs/dom'
import Spinner from '@pluginjs/spinner'

const element = query('#mousewheel .example-mousewheel')

Spinner.of(element, { mousewheel: true })
