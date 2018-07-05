import { query } from '@pluginjs/dom'
import Thumbnails from '@pluginjs/thumbnails'

const element = query('#delegate .thumbnails')

Thumbnails.of(element, {
  delegate: '.pj-thumb-loaded'
})
