import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#defaults .zoom')
Zoom.of(element)
