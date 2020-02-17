import { query } from '@pluginjs/dom'
import ImagePicker from '@pluginjs/image-picker'

const element = query('#tooltip .example-tooltip')
ImagePicker.of(element, {
  deleteMode: 'tooltip',
  select(resolve) {
    resolve({
      image: 'https://picsum.photos/200/300?image=1067',
      id: 123456
    })
  }
})
