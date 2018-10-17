import { queryAll } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const elements = queryAll('#disabled .example')
elements.forEach(element => {
  ImageSelector.of(element, {})
})
