import { query } from '@pluginjs/dom'
import Spinner from '@pluginjs/spinner'

const element = query('#both .example-layout-both')

Spinner.of(element, { layout: 'both' })
