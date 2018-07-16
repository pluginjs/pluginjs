import { query } from '@pluginjs/dom'
import ImagePicker from '@pluginjs/image-picker'

const element = query('#disabled .example-locale')
ImagePicker.of(element, {
  locale: 'zh',
  select() {
    this.set({
      image: 'https://picsum.photos/200/300?image=1041'
    })
  },
  disabled: true
})
