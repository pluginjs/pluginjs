import { query } from '@pluginjs/dom'
import VideoPicker from '@pluginjs/video-picker'

const element = query('#disabled .example-locale')
VideoPicker.of(element, {
  locale: 'zh',
  disabled: true,
  selectLocalVideo(resolve) {
    resolve(
      'https://ak5.picdn.net/shutterstock/videos/3377915/preview/stock-footage-beijing-central-business-district-skyline-sunset-time-lapse.webm'
    )
  },
  addPoster(resolve) {
    resolve('https://picsum.photos/200/300?image=1015')
  },
  changePoster(resolve) {
    resolve('https://picsum.photos/200/300?image=990')
  }
})
