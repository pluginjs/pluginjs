import { query } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const element = query('#scale .zoom')
Zoom.of(element)
