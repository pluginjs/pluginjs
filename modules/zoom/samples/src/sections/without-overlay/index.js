import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#without-overlay .zoom')
Zoom.of(element)
