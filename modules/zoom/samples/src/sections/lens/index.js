import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#lens .example-zoom')
Zoom.of(element, {})
