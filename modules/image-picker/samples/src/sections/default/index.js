import { query } from '@pluginjs/dom'
import ImagePicker from '@pluginjs/image-picker'

const element = query('#default .example-default')
ImagePicker.of(element, {
  select(resolve) {
    resolve('https://picsum.photos/200/300?image=1067')
  }
})
