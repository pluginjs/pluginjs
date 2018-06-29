import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import LinkPicker from '@pluginjs/link-picker'

const element = query('.link-picker-locale', render(html, query('#locale')))

LinkPicker.of(element, {
  locale: 'zh'
})
