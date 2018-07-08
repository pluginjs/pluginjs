import { query } from '@pluginjs/dom'
import Thumbnails from '@pluginjs/thumbnails'

const element = query('#verticalCenter .thumbnails')
Thumbnails.of(element, {})
