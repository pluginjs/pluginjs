import { query } from '@pluginjs/dom'
import Gallery from '@pluginjs/lightbox'

const element = query('#default .lightbox')
Gallery.of(element, {})
