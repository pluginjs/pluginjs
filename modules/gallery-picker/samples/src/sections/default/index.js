import { query } from '@pluginjs/dom'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('#default .example-default')

GalleryPicker.of(element, {
  add(resolve) {
    resolve(['https://picsum.photos/200/300?image=929'])
  },
  change(resolve) {
    resolve('https://picsum.photos/200/300?image=927')
  }
})
