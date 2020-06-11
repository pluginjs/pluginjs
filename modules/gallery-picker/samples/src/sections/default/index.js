import { query } from '@pluginjs/dom'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('#default .example-default')

GalleryPicker.of(element, {
  add(resolve) {
    resolve([
      {
        image: 'https://picsum.photos/200/300?image=929',
        id: 789
      }])
  },
  change(resolve) {
    resolve({
      image: 'https://picsum.photos/200/300?image=943',
      id: 654
    })
  }
})
