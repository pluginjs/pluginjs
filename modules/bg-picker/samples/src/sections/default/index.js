import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#default .example-default')
BgPicker.of(element, {
  onChangeImage: selectImage => {
    selectImage({
      image: 'https://picsum.photos/200/300?image=1068',
      id: 123456
    })
  },
  onSelectImage: selectImage => {
    selectImage({
      image: 'https://picsum.photos/200/300',
      id: 321645
    })
  }
})
