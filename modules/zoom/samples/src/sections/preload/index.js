import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#preload .zoom')
Zoom.of(element)
