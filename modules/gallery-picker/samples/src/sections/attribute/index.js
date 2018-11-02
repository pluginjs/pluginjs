import { query } from '@pluginjs/dom'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('#attribute .example-attribute')
GalleryPicker.of(element, {
  add(resolve) {
    resolve([
      'https://picsum.photos/200/300?image=980',
      'https://picsum.photos/200/300?image=961',
      'https://picsum.photos/200/300?image=943'
    ])
  },
  change(resolve) {
    resolve('https://picsum.photos/200/300?image=938')
  }
})
