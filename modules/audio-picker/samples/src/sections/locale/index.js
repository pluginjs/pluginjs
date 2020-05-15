import { query } from '@pluginjs/dom'
import AudioPicker from '@pluginjs/audio-picker'

const element = query('#locale .example')
AudioPicker.of(element, {
  locale: 'zh',
  select(resolve) {
    resolve({
      audio: 'example-music.mp3',
      id: 12345
    })
  }
})
