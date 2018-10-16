import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const element = query('#input .example')
ImageSelector.of(element, {
  source: [
    {
      value: 1,
      image: 'img/1.png',
      label: 'Option 1'
    },
    {
      value: 2,
      image: 'img/2.png',
      label: 'Option 2'
    },
    {
      value: 3,
      image: 'img/3.png',
      label: 'Option 3'
    },
    {
      value: 4,
      image: 'img/4.png',
      label: 'Option 4'
    },
    {
      value: 5,
      image: 'img/5.png',
      label: 'Option 5'
    }
  ]
})
