import { query } from '@pluginjs/dom'
import ImagePicker from '@pluginjs/image-picker'

const element = query('#modal .example-modal')
ImagePicker.of(element, {
  select(resolve) {
    resolve({
      image: 'https://picsum.photos/200/300?image=1067',
      id: 123456
    })
  }
})
