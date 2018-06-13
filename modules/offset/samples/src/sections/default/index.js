import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Offset from '@pluginjs/offset'

const element = query('.example-default', render(html, query('#default')))

Offset.of(element, {})
