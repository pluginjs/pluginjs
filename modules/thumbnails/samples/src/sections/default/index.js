import { query } from '@pluginjs/dom'
import Thumbnails from '@pluginjs/thumbnails'

const element = query('#default .thumbnails')
Thumbnails.of(element, {})
