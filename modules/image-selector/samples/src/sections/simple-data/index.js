import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const element = query('#simple-data .example')
ImageSelector.of(element, {
  source: {
    1: 'https://picsum.photos/48/40?image=1',
    2: 'https://picsum.photos/48/40?image=20',
    3: 'https://picsum.photos/48/40?image=30',
    4: 'https://picsum.photos/48/40?image=40',
    5: 'https://picsum.photos/48/40?image=50'
  }
})
