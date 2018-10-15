import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#default .example-default')
BgPicker.of(element, {
  onSelectImage: resolve => {
    resolve('https://picsum.photos/200/300')
  }
})
