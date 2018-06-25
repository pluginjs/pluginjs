import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ImagePicker from '@pluginjs/image-picker'

const element = query('.example-locale', render(html, query('#locale')))
ImagePicker.of(element, {
  locale: 'zh',
  select() {
    this.set({
      image: '../../plugins/image-picker/images/nvnv.png'
    })
  }
})
