import { queryAll } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const elements = queryAll('#disabled .example')
elements.forEach(element => {
  ImageSelector.of(element, {
    source: {
      1: 'Option 1',
      2: 'Option 2',
      3: 'Option 3',
      4: 'Option 4',
      5: 'Option 5'
    }
  })
})
