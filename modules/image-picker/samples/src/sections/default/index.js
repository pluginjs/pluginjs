import { query } from '@pluginjs/dom'
import ImagePicker from '@pluginjs/image-picker'

const element = query('#default .example-default')
ImagePicker.of(element, {
  select() {
    this.set({
      image: '../../plugins/image-picker/images/nvnv.png'
    })
  }
})
