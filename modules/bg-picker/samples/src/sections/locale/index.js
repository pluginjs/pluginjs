import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#locale .example-locale')
BgPicker.of(element, {
  locale: 'zh',
  onChangeImage: selectImage => {
    selectImage('https://picsum.photos/200/300?image=1068')
  },
  onSelectImage: selectImage => {
    selectImage('https://picsum.photos/200/300')
  }
})
