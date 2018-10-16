import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const data = []

for (let i = 0; i < 100; i++) {
  data.push({
    value: i,
    image: 'img/1.png',
    label: `Option ${i}`
  })
}

const element = query('#scrollbar .example')
ImageSelector.of(element, {
  source: data
})
