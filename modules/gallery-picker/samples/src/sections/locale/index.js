import { query } from '@pluginjs/dom'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('#locale .example-locale')
GalleryPicker.of(element, {
  locale: 'zh',
  add() {
    return ['../../plugins/gallery-picker/images/dog.jpg']
  },
  change() {
    return '../../plugins/gallery-picker/images/sun.jpg'
  }
})
