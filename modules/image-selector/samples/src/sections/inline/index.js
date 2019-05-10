import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const element = query('#inline .example')
ImageSelector.of(element, {
  inline: true,
  source: [
    {
      value: 1,
      image: 'https://picsum.photos/48/40?image=1',
      label: 'Option 1'
    },
    {
      value: 2,
      image: 'https://picsum.photos/48/40?image=20',
      label: 'Option 2'
    },
    {
      value: 3,
      image: 'https://picsum.photos/48/40?image=30',
      label: 'Option 3'
    },
    {
      value: 4,
      image: 'https://picsum.photos/48/40?image=40',
      label: 'Option 4'
    },
    {
      value: 5,
      image: 'https://picsum.photos/48/40?image=50',
      label: 'Option 5'
    }
  ]
})
