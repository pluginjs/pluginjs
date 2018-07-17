import { query } from '@pluginjs/dom'
import Slider from '@pluginjs/slider'

const data = [
  {
    type: 'image',
    src: 'https://picsum.photos/800/600'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/800/500'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/800/400'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/700/600'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/700/500'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/700/400'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/600/600'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/600/500'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/600/400'
  }
]

const element = query('#default .slider')
Slider.of(element, {
  data
})
