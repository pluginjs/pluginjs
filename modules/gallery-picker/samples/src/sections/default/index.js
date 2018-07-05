import { query } from '@pluginjs/dom'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('#default .example-default')
GalleryPicker.of(element, {
  add() {
    return ['../../plugins/gallery-picker/images/dog.jpg']
  },
  change() {
    return '../../plugins/gallery-picker/images/sun.jpg'
  }
})
