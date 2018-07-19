import { query } from '@pluginjs/dom'
import Slider from '@pluginjs/slider'

const data = [
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=0'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=1'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=2'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=3'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=4'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=5'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=6'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=7'
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1600/1200?image=8'
  }
]

const element = query('#default .slider')
Slider.of(element, {
  data
})
