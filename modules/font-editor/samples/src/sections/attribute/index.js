import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import FontEditor from '@pluginjs/font-editor'

const element = query('.example-attribute', render(html, query('#attribute')))
FontEditor.of(element, {})
