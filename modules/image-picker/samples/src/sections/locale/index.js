import { query } from '@pluginjs/dom'
import ImagePicker from '@pluginjs/image-picker'

const element1 = query('#locale .example-modal-locale')
ImagePicker.of(element1, {
  locale: 'zh',
  select(resolve) {
    resolve({ image: 'https://picsum.photos/200/300?image=1067' })
  }
})

const element2 = query('#locale .example-tooltip-locale')
ImagePicker.of(element2, {
  deleteMode: 'tooltip',
  locale: 'zh',
  select(resolve) {
    resolve({ image: 'https://picsum.photos/200/300?image=1067' })
  }
})
