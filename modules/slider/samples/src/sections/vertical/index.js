import { query } from '@pluginjs/dom'
import Slider from '@pluginjs/slider'

const data = [
  {
    type: 'inline',
    html:
      '<div style="background-image: url(https://picsum.photos/1600/1200?image=99); background-size: cover; width: 100%; height: 100%; text-align: center;"><h1>Hello World!</h1></div>'
  },
  {
    type: 'map',
    src:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110268.93191923265!2d-74.01465745747427!3d40.69413031028365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+%C3%89tat+de+New+York%2C+%C3%89tats-Unis!5e0!3m2!1sfr!2sfr!4v1488734776445'
  },
  {
    type: 'iframe',
    src: 'https://picsum.photos/'
  },
  {
    type: 'video',
    videoType: 'youtube',
    src: 'https://picsum.photos/1600/1200?image=0',
    id: 'YE7VzlLtp-4'
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

const element = query('#vertical .slider')
Slider.of(element, {
  vertical: true,
  data
})
