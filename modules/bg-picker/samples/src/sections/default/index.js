import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import BgPicker from '@pluginjs/bg-picker'

const element = query('.example-default', render(html, query('#default')))
BgPicker.of(element, {})
