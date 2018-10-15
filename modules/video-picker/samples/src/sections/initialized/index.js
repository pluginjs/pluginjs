import { query } from '@pluginjs/dom'
import VideoPicker from '@pluginjs/video-picker'

const element = query('#initialized .example-input')
VideoPicker.of(element, {
  onSelectLocalVideo: resolve => {
    resolve(
      'https://ak5.picdn.net/shutterstock/videos/3377915/preview/stock-footage-beijing-central-business-district-skyline-sunset-time-lapse.webm'
    )
  }
})
