import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#toggle-on-enter .zoom')
Zoom.of(element)
