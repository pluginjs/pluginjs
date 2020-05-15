import { query } from '@pluginjs/dom'
import AudioPicker from '@pluginjs/audio-picker'

const element = query('#disabled .example')
AudioPicker.of(element, {
  locale: 'zh',
  select(resolve) {
    resolve('example-music.mp3')
  },
  disabled: true
})
