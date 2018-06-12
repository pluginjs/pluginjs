import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import FontEditor from '@pluginjs/font-editor'

const element = query('.example-default', render(html, query('#default')))
FontEditor.of(element, {})
