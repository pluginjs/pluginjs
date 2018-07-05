import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const element = query('#build .example-build-by-element')
ImageSelector.of(element, {})
