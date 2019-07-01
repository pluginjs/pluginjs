import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#disabled   .example-disabled')
BgPicker.of(element, {
  disabled: true,
  selectPicture(resolve) {
    resolve({
      image: 'https://picsum.photos/200/300?image=1068',
      id: 123456
    })
  },
  changePicture(resolve) {
    resolve({
      image: 'https://picsum.photos/200/300',
      id: 321645
    })
  }
})
