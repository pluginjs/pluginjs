import { query } from '@pluginjs/dom'
import GalleryPicker from '@pluginjs/gallery-picker'

const element = query('#locale .example-locale')
GalleryPicker.of(element, {
  locale: 'zh',
  add(resolve) {
    resolve([{
      image: 'https://picsum.photos/200/300?image=980',
      id: 789
    }, {
      image: 'https://picsum.photos/200/300?image=980',
      id: 123
    }, {
      image: 'https://picsum.photos/200/300?image=980',
      id: 654
    }])
  },
  change(resolve) {
    resolve({
      image: 'https://picsum.photos/200/300?image=943',
      id: 654
    })
  }
})
