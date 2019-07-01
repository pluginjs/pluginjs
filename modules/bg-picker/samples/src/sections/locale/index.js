import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#locale .example-locale')
BgPicker.of(element, {
  locale: 'zh',
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
