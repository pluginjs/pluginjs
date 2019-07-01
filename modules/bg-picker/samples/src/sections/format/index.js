import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#format .example-format')
BgPicker.of(element, {
  selectPicture(resolve) {
    resolve({
      image: 'https://picsum.photos/200/300',
      id: 123456
    })
  },
  changePicture(resolve) {
    resolve({
      image: 'https://picsum.photos/200/300?image=1068',
      id: 321645
    })
  }
})
