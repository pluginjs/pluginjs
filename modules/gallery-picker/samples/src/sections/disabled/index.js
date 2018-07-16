import { query } from '@pluginjs/dom'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('#disabled .example-locale')
GalleryPicker.of(element, {
  locale: 'zh',
  add() {
    return ['https://picsum.photos/200/300?image=921']
  },
  change() {
    return 'https://picsum.photos/200/300?image=916'
  },
  disabled: true
})
