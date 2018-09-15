import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#custom-overlay .zoom')
Zoom.of(element)
