import { query } from '@pluginjs/dom'
import ImagePicker from '@pluginjs/image-picker'

const element = query('#locale .example-locale')
ImagePicker.of(element, {
  locale: 'zh',
  select() {
    this.set({
      image: '../../plugins/image-picker/images/nvnv.png'
    })
  }
})
