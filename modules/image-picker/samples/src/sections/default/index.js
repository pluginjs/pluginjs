import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ImagePicker from '@pluginjs/image-picker'

const element = query('.example-default', render(html, query('#default')))
ImagePicker.of(element, {
  select() {
    this.set({
      image: '../../plugins/image-picker/images/nvnv.png'
    })
  }
})
