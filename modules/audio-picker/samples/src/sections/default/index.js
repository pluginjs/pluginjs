import { query } from '@pluginjs/dom'
import AudioPicker from '@pluginjs/audio-picker'

const element = query('#default .example')
AudioPicker.of(element, {
  select(resolve) {
    resolve({
      audio: 'example-music.mp3',
      id: 123456
    })
  }
})
