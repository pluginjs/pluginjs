import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query('.dropdown-keyboard', render(html, query('#keyboard')))
Dropdown.of(element, {})
