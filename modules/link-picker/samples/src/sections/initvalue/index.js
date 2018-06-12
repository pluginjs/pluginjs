import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import LinkPicker from '@pluginjs/link-picker'

const element = query('.example-input', render(html, query('#initinput')))

LinkPicker.of(element, {})
