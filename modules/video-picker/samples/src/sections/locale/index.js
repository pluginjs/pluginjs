import { query } from '@pluginjs/dom'
import VideoPicker from '@pluginjs/video-picker'

const element = query('#locale .example-locale')
VideoPicker.of(element, {
  locale: 'zh',
  onSelectLocalVideo: resolve => {
    resolve(
      'https://ak5.picdn.net/shutterstock/videos/3377915/preview/stock-footage-beijing-central-business-district-skyline-sunset-time-lapse.webm'
    )
  }
})
