import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const element = query('#optgroup .example')

ImageSelector.of(element, {})
