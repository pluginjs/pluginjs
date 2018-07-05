import { query } from '@pluginjs/dom'
import Thumbnails from '@pluginjs/thumbnails'

const element = query('#vertical .thumbnails')
Thumbnails.of(element, {})
