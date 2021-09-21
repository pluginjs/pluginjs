import { query } from '@pluginjs/dom'
import Slider from '@pluginjs/slider'

const data = [
  {
    type: 'inline',
    html:
      '<div style="display: flex; justify-content: center; align-items: center; background-image: url(https://picsum.photos/1600/1200?image=99); background-size: cover; width: 100%; height: 100%;"><h1>INLINE!</h1></div>'
  },
  {
    type: 'map',
    src:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110268.93191923265!2d-74.01465745747427!3d40.69413031028365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+%C3%89tat+de+New+York%2C+%C3%89tats-Unis!5e0!3m2!1sfr!2sfr!4v1488734776445'
  }
  // ,
  // {
  //   type: 'iframe',
  //   src: 'https://picsum.photos/'
  // }
  // ,
  // {
  //   type: 'video',
  //   videoType: 'youtube',
  //   src: 'https://picsum.photos/id/0/1600/1200',
  //   id: 'YE7VzlLtp-4'
  // },
  // {
  //   type: 'image',
  //   src: 'https://picsum.photos/id/1/1600/1200'
  // },
  // {
  //   type: 'image',
  //   src: 'https://picsum.photos/id/2/1600/1200'
  // },
  // {
  //   type: 'image',
  //   src: 'https://picsum.photos/id/3/1600/1200'
  // },
  // {
  //   type: 'image',
  //   src: 'https://picsum.photos/id/4/1600/1200'
  // },
  // {
  //   type: 'image',
  //   src: 'https://picsum.photos/id/5/1600/1200'
  // },
  // {
  //   type: 'image',
  //   src: 'https://picsum.photos/id/6/1600/1200'
  // },
  // {
  //   type: 'image',
  //   src: 'https://picsum.photos/id/8/1600/1200'
  // },
  // {
  //   type: 'image',
  //   src: 'https://picsum.photos/id/9/1600/1200'
  // }
]

const element = query('#default .slider')
Slider.of(element, {
  data
})
