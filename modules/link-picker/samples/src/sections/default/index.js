import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import LinkPicker from '@pluginjs/link-picker'

const element = query('.link-picker-default', render(html, query('#default')))

LinkPicker.of(element, {})
