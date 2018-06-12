import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('.example-attribute', render(html, query('#attribute')))
GalleryPicker.of(element, {
  add() {
    return [
      '../../plugins/gallery-picker/images/sun.jpg',
      '../../plugins/gallery-picker/images/minv.jpg',
      '../../plugins/gallery-picker/images/mh370.jpg'
    ]
  },
  change() {
    return '../../plugins/gallery-picker/images/sun.jpg'
  }
})
