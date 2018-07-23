import { query } from '@pluginjs/dom'
import Thumbnails from '@pluginjs/thumbnails'

const data = [
  {
    src: 'https://picsum.photos/100?image=10'
  },
  {
    src: 'https://picsum.photos/100?image=11'
  },
  {
    type: 'video',
    src: 'https://picsum.photos/100?image=12'
  },
  {
    src: 'https://picsum.photos/100?image=13'
  },
  {
    src: 'https://picsum.photos/100?image=14'
  },
  {
    src: 'https://picsum.photos/100?image=15'
  },
  {
    src: 'https://picsum.photos/100?image=16'
  },
  {
    src: 'https://picsum.photos/100?image=17'
  },
  {
    src: 'https://picsum.photos/100?image=18'
  },
  {
    src: 'https://picsum.photos/100?image=19'
  },
  {
    type: 'video',
    src: 'https://picsum.photos/100?image=30'
  },
  {
    src: 'https://picsum.photos/100?image=31'
  },
  {
    src: 'https://picsum.photos/100?image=32'
  },
  {
    src: 'https://picsum.photos/100?image=33'
  },
  {
    src: 'https://picsum.photos/100?image=34'
  },
  {
    src: 'https://picsum.photos/100?image=35'
  },
  {
    src: 'https://picsum.photos/100?image=36'
  },
  {
    src: 'https://picsum.photos/100?image=37'
  },
  {
    src: 'https://picsum.photos/100?image=38'
  },
  {
    src: 'https://picsum.photos/100?image=39'
  }
]

const element = query('#center .thumbnails')

Thumbnails.of(element, {
  data
})
