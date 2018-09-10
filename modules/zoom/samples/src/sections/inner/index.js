import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#inner .example-zoom')
Zoom.of(element, {})
