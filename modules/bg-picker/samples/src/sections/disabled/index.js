import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#disabled   .example-disabled')
BgPicker.of(element, {
  disabled: true,
  onChangeImage: selectImage => {
    selectImage('https://picsum.photos/200/300?image=1068')
  },
  onSelectImage: selectImage => {
    selectImage('https://picsum.photos/200/300')
  }
})
