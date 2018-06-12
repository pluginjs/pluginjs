import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('.example-locale', render(html, query('#locale')))
GalleryPicker.of(element, {
  locale: 'zh',
  add() {
    return ['../../plugins/gallery-picker/images/dog.jpg']
  },
  change() {
    return '../../plugins/gallery-picker/images/sun.jpg'
  }
})
